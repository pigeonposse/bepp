/**
 * Test files.
 *
 * @description Test files.
 * @see https://playwright.dev/docs/api/class-test
 */

import {
	expect, test,
} from '@playwright/test'

test( 'Home is loaded', async ( { page } ) => {

	await page.goto( '/' )
	await page.waitForSelector( 'h1' )
	const h1Element = await page.$( 'h1' )
	expect( h1Element ).not.toBeNull()

} )
