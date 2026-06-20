#!/usr/bin/env node
/**
 * Capture TradeSafe Access Manager admin screenshots for docs.
 * Usage: node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const OUT_DIR = path.join( __dirname, '..', 'assets', 'img' );
const BASE = 'http://zeroday-access-manager.local';
const ADMIN = `${ BASE }/wp-admin`;

const PAGES = [
	{ slug: 'dashboard', page: 'zeroday-access-manager', name: 'Access Manager Dashboard' },
	{ slug: 'codes', page: 'zeroday-codes', name: 'Codes' },
	{ slug: 'generate-codes', page: 'zeroday-generate-codes', name: 'Generate Codes' },
	{ slug: 'code-groups', page: 'zeroday-code-groups', name: 'Code Groups' },
	{ slug: 'usage-logs', page: 'zeroday-usage-logs', name: 'Usage Logs' },
	{ slug: 'user-lookup', page: 'zeroday-user-lookup', name: 'User Lookup' },
	{ slug: 'category-access', page: 'zeroday-category-access', name: 'Category Access' },
	{ slug: 'settings', page: 'zeroday-settings', name: 'Settings' },
	{ slug: 'frontend-preview', page: 'zeroday-frontend-preview', name: 'Frontend Preview' },
];

async function login( page ) {
	await page.goto( `${ BASE }/wp-login.php`, { waitUntil: 'networkidle' } );
	await page.fill( '#user_login', 'admin' );
	await page.fill( '#user_pass', '123' );
	await page.click( '#wp-submit' );
	await page.waitForURL( /wp-admin/, { timeout: 15000 } );
}

async function capture() {
	await mkdir( OUT_DIR, { recursive: true } );
	const browser = await chromium.launch( { headless: true } );
	const context = await browser.newContext( {
		viewport: { width: 1440, height: 900 },
		deviceScaleFactor: 2,
	} );
	const page = await context.newPage();

	await login( page );

	for ( const item of PAGES ) {
		const url = `${ ADMIN }/admin.php?page=${ item.page }`;
		console.log( `Capturing ${ item.slug }…` );
		await page.goto( url, { waitUntil: 'networkidle' } );
		await page.waitForTimeout( 1500 );
		await page.screenshot( {
			path: path.join( OUT_DIR, `${ item.slug }.png` ),
			fullPage: true,
		} );
	}

	// Settings — scroll to Product Access Roles.
	await page.goto( `${ ADMIN }/admin.php?page=zeroday-settings`, { waitUntil: 'networkidle' } );
	const rolesHeading = page.locator( 'text=Product Access Roles' ).first();
	if ( await rolesHeading.count() ) {
		await rolesHeading.scrollIntoViewIfNeeded();
		await page.waitForTimeout( 500 );
		await page.screenshot( {
			path: path.join( OUT_DIR, 'settings-access-roles.png' ),
			fullPage: false,
		} );
	}

	// Frontend My Account Access.
	await page.goto( `${ BASE }/my-account/access/`, { waitUntil: 'networkidle' } );
	await page.waitForTimeout( 1000 );
	await page.screenshot( {
		path: path.join( OUT_DIR, 'my-account-access.png' ),
		fullPage: true,
	} );

	await browser.close();
	console.log( 'Done. Screenshots saved to', OUT_DIR );
}

capture().catch( ( err ) => {
	console.error( err );
	process.exit( 1 );
} );
