#!/usr/bin/env node
/**
 * Smoke test for docs site — run while `npm run dev` is active.
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3456';
const SECTIONS = [
	'introduction',
	'installation',
	'quick-start',
	'core-concepts',
	'dashboard',
	'codes',
	'generate-codes',
	'code-groups',
	'usage-logs',
	'user-lookup',
	'category-access',
	'settings',
	'product-access-roles',
	'frontend-preview',
	'frontend-flows',
	'database',
	'architecture',
	'troubleshooting',
	'changelog',
];

let failed = 0;

function pass(msg) {
	console.log('PASS:', msg);
}

function fail(msg) {
	console.error('FAIL:', msg);
	failed++;
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto(BASE);
const title = await page.title();
if (!title.includes('TradeSafe')) fail('Home title');
else pass('Home loads');

for (const id of SECTIONS) {
	await page.goto(`${ BASE }/#${ id }`);
	await page.waitForSelector('h1');
	const h1 = await page.locator('h1').first().textContent();
	if (!h1 || h1.length < 2) fail(`Section ${ id } missing h1`);
	else pass(`Section #${ id } — ${ h1.trim() }`);
}

// Search dropdown.
await page.goto(BASE);
await page.fill('#docs-search-input', 'generate codes');
await page.waitForSelector('.docs-search__item');
const count = await page.locator('.docs-search__item').count();
if (count < 1) fail('Search returned no suggestions');
else pass(`Search suggestions: ${ count }`);

await page.locator('.docs-search__item').first().click();
await page.waitForTimeout(300);
const hash = new URL(page.url()).hash;
if (!hash) fail('Search click did not navigate');
else pass(`Search navigation → ${ hash }`);

// Images on pages with figures.
const imgPages = ['quick-start', 'dashboard', 'codes', 'settings'];
for (const id of imgPages) {
	await page.goto(`${ BASE }/#${ id }`);
	const img = page.locator('.doc-figure img').first();
	if (await img.count()) {
		await img.scrollIntoViewIfNeeded();
		await img.evaluate((el) =>
			el.complete
				? Promise.resolve()
				: new Promise((resolve) => {
						el.onload = resolve;
						el.onerror = resolve;
					})
		);
		await page.waitForTimeout(500);
		const ok = await img.evaluate((el) => el.complete && el.naturalWidth > 0);
		if (!ok) fail(`Image failed on ${ id }`);
		else pass(`Image loads on ${ id }`);
	}
}

await browser.close();
console.log(failed ? `\n${ failed } failure(s)` : '\nAll tests passed.');
process.exit(failed ? 1 : 0);
