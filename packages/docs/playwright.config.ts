/**
 * Playwright config.
 *
 * @description Playwright config.
 * @see https://playwright.dev/docs/api/class-test
 */
import type { PlaywrightTestConfig } from '@playwright/test'
const port                         = 13124
const config: PlaywrightTestConfig = {
	webServer : {
		command : `pnpm run preview --port=${port}`,
		port,
	},
	testDir   : 'tests',
	testMatch : /(.+\.)?(test|spec)\.[jt]s/,
}

export default config
