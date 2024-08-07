/**
 * Playwright config.
 *
 * @description Playwright config.
 * @see https://playwright.dev/docs/api/class-test
 */
import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer : {
		command : 'vite dev -- --port=13121',
		port    : 13121,
	},
	testDir   : 'tests',
	testMatch : /(.+\.)?(test|spec)\.[jt]s/,
}

export default config
