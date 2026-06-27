#!/usr/bin/env node
/**
 * Regenerate e2e-qa/index.html from results.json (after narrated video build).
 */
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

await new Promise( ( resolve, reject ) => {
	const child = spawn( process.execPath, [ path.join( __dirname, 'run-e2e-qa.mjs' ), '--html-only' ], { stdio: 'inherit' } );
	child.on( 'close', ( code ) => ( 0 === code ? resolve() : reject( new Error( 'html regen failed' ) ) ) );
	child.on( 'error', reject );
} );
