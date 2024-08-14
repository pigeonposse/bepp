/**
 * Playwright config.
 *
 * @description Playwright config.
 * @see https://playwright.dev/docs/api/class-test
 */
import type { PlaywrightTestConfig } from '@playwright/test'

import mainPkg from '../../package.json'  with { type: 'json' }
// console.log( typeof mainPkg.extra.defaultAppPort, typeof Number( mainPkg.extra.defaultAppPort ) )
// const appPort = Number( mainPkg.extra.defaultAppPort )

const config: PlaywrightTestConfig = {
	webServer : {
		command : 'pnpm run preview:web',
		port    : Number( mainPkg.extra.defaultAppPort ),
	},
	testDir   : 'tests',
	testMatch : /(.+\.)?(test|spec)\.[jt]s/,
}

export default config
