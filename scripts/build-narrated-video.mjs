#!/usr/bin/env node
/**
 * Build chaptered E2E QA videos with synced natural voice narration.
 * Usage: node scripts/build-narrated-video.mjs
 */
import { spawn } from 'child_process';
import { mkdir, readFile, writeFile, readdir, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpegPath from 'ffmpeg-static';
import ffprobePath from 'ffprobe-static';
import { CHAPTERS } from './qa-chapters.mjs';

const VOICE = 'Samantha';
const VOICE_RATE = 178;

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.join( __dirname, '..' );
const OUT = path.join( ROOT, 'e2e-qa' );
const VIDEO_DIR = path.join( OUT, 'assets', 'video' );
const CHAPTER_DIR = path.join( VIDEO_DIR, 'chapters' );
const WORK = path.join( VIDEO_DIR, '_work' );

const FFMPEG = ffmpegPath;
const FFPROBE = ffprobePath.path;

function run( cmd, args ) {
	return new Promise( ( resolve, reject ) => {
		const child = spawn( cmd, args, { stdio: [ 'ignore', 'pipe', 'pipe' ] } );
		let stderr = '';
		child.stderr.on( 'data', ( d ) => { stderr += d; } );
		child.on( 'close', ( code ) => {
			if ( 0 === code ) {
				resolve( stderr );
			} else {
				reject( new Error( `${ cmd } failed (${ code }): ${ stderr.slice( -800 ) }` ) );
			}
		} );
		child.on( 'error', reject );
	} );
}

async function probeDuration( file ) {
	const out = await run( FFPROBE, [
		'-v', 'error',
		'-show_entries', 'format=duration',
		'-of', 'default=noprint_wrappers=1:nokey=1',
		file,
	] );
	return parseFloat( out.trim() ) || 0;
}

function buildAtempoFilter( ratio ) {
	// ratio = targetDuration / sourceDuration (speed up audio if > 1).
	const filters = [];
	let remaining = ratio;
	while ( remaining > 2.0 ) {
		filters.push( 'atempo=2.0' );
		remaining /= 2.0;
	}
	while ( remaining < 0.5 ) {
		filters.push( 'atempo=0.5' );
		remaining /= 0.5;
	}
	if ( Math.abs( remaining - 1.0 ) > 0.01 ) {
		filters.push( `atempo=${ remaining.toFixed( 4 ) }` );
	}
	return filters.length ? filters.join( ',' ) : 'volume=1';
}

async function synthesizeSpeech( text, outputMp3 ) {
	const aiff = outputMp3.replace( /\.mp3$/, '.aiff' );
	await run( 'say', [ '-v', VOICE, '-r', String( VOICE_RATE ), text, '-o', aiff ] );
	await run( FFMPEG, [ '-y', '-i', aiff, '-c:a', 'libmp3lame', '-q:a', '2', outputMp3 ] );
	await unlink( aiff ).catch( () => {} );
}

async function fitAudio( inputMp3, targetSec, outputMp3 ) {
	const audioDur = await probeDuration( inputMp3 );
	if ( audioDur <= 0 || targetSec <= 0 ) {
		await run( FFMPEG, [ '-y', '-i', inputMp3, '-c', 'copy', outputMp3 ] );
		return;
	}
	const ratio = audioDur / targetSec;
	const filter = buildAtempoFilter( ratio );
	await run( FFMPEG, [
		'-y', '-i', inputMp3,
		'-af', filter,
		'-t', String( targetSec ),
		'-c:a', 'libmp3lame', '-q:a', '2',
		outputMp3,
	] );
}

async function extractClip( input, startSec, endSec, output ) {
	const duration = Math.max( 0.5, endSec - startSec );
	await run( FFMPEG, [
		'-y',
		'-ss', String( startSec ),
		'-i', input,
		'-t', String( duration ),
		'-an',
		'-c:v', 'libvpx-vp9', '-b:v', '1M',
		'-pix_fmt', 'yuv420p',
		output,
	] );
}

async function muxChapter( video, audio, output ) {
	await run( FFMPEG, [
		'-y',
		'-i', video,
		'-i', audio,
		'-c:v', 'libvpx-vp9', '-b:v', '1M',
		'-c:a', 'libopus', '-b:a', '128k',
		'-map', '0:v:0', '-map', '1:a:0',
		'-shortest',
		'-pix_fmt', 'yuv420p',
		output,
	] );
}

async function concatVideos( files, output ) {
	const listFile = path.join( WORK, 'concat.txt' );
	const list = files.map( ( f ) => `file '${ f.replace( /'/g, "'\\''" ) }'` ).join( '\n' );
	await writeFile( listFile, list, 'utf8' );
	await run( FFMPEG, [
		'-y', '-f', 'concat', '-safe', '0', '-i', listFile,
		'-c:v', 'libvpx-vp9', '-b:v', '1M',
		'-c:a', 'libopus', '-b:a', '128k',
		'-pix_fmt', 'yuv420p',
		output,
	] );
}

async function main() {
	if ( ! FFMPEG || ! FFPROBE ) {
		console.error( 'ffmpeg/ffprobe not available.' );
		process.exit( 1 );
	}

	const resultsPath = path.join( OUT, 'results.json' );
	const raw = JSON.parse( await readFile( resultsPath, 'utf8' ) );
	const timeline = raw.videoChapters || [];
	const sourceVideo = path.join( VIDEO_DIR, 'e2e-qa-recording.webm' );

	if ( ! timeline.length ) {
		console.error( 'No videoChapters in results.json — run npm run qa first.' );
		process.exit( 1 );
	}

	await mkdir( CHAPTER_DIR, { recursive: true } );
	await mkdir( WORK, { recursive: true } );

	console.log( '\nBuilding narrated chapter videos…\n' );

	const builtChapters = [];
	const concatList = [];

	for ( let i = 0; i < timeline.length; i++ ) {
		const ch = timeline[ i ];
		const meta = CHAPTERS.find( ( c ) => c.id === ch.id ) || {};
		const idx = String( i + 1 ).padStart( 2, '0' );
		const slug = ch.id;
		const displayTitle = meta.displayTitle || ch.displayTitle || slug;
		const narration = meta.narration || `This section tests ${ displayTitle }.`;

		const startSec = ch.startMs / 1000;
		const endSec = ( ch.endMs || ch.startMs + 5000 ) / 1000;

		const clipPath = path.join( WORK, `${ idx }-clip.webm` );
		const rawAudio = path.join( WORK, `${ idx }-voice-raw.mp3` );
		const fitAudioPath = path.join( WORK, `${ idx }-voice.mp3` );
		const outPath = path.join( CHAPTER_DIR, `${ idx }-${ slug }.webm` );

		console.log( `  [${ idx }] ${ displayTitle } (${ ( endSec - startSec ).toFixed( 1 ) }s)` );

		await extractClip( sourceVideo, startSec, endSec, clipPath );
		const clipDur = await probeDuration( clipPath );

		await synthesizeSpeech( narration, rawAudio );
		await fitAudio( rawAudio, clipDur, fitAudioPath );
		await muxChapter( clipPath, fitAudioPath, outPath );

		builtChapters.push( {
			index: i + 1,
			id: slug,
			displayTitle,
			subtitle: meta.subtitle || '',
			narration,
			video: `assets/video/chapters/${ idx }-${ slug }.webm`,
			durationSec: clipDur,
		} );
		concatList.push( outPath );
	}

	const fullOut = path.join( VIDEO_DIR, 'e2e-qa-recording-narrated.webm' );
	await concatVideos( concatList, fullOut );

	// Regenerate HTML report with chapter player.
	await new Promise( ( resolve, reject ) => {
		const child = spawn( process.execPath, [ path.join( __dirname, 'regenerate-qa-html.mjs' ) ], { stdio: 'inherit' } );
		child.on( 'close', ( code ) => ( 0 === code ? resolve() : reject( new Error( 'regenerate-qa-html failed' ) ) ) );
		child.on( 'error', reject );
	} );

	raw.videoChaptersBuilt = builtChapters;
	raw.video = 'assets/video/e2e-qa-recording-narrated.webm';
	raw.videoRaw = 'assets/video/e2e-qa-recording.webm';
	raw.videoNarrated = raw.video;
	await writeFile( resultsPath, JSON.stringify( raw, null, 2 ), 'utf8' );

	// Cleanup work files.
	const workFiles = await readdir( WORK );
	for ( const f of workFiles ) {
		await unlink( path.join( WORK, f ) ).catch( () => {} );
	}

	console.log( `\nDone. ${ builtChapters.length } chapters + full narrated video.` );
	console.log( `Full: ${ fullOut }` );
}

main().catch( ( err ) => {
	console.error( err );
	process.exit( 1 );
} );
