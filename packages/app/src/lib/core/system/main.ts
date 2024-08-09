import { Autostart } from './autostart'
import { Dialog }    from './dialog'
import { Fs }        from './fs'
import { Log }       from './log'
import { Shell }     from './shell'

/**
 * SYSTEM CLASS.
 */
export const platforms = {
	LINUX     : 'linux',
	MACOS     : 'macos',
	IOS       : 'ios',
	FREEBSD   : 'freebsd',
	DRAGONFLY : 'dragonfly',
	NETBSD    : 'netbsd',
	OPENBSD   : 'openbsd',
	SOLARIS   : 'solaris',
	ANDROID   : 'android',
	WINDOWS   : 'windows',
	UNKNOWN   : 'unknown',
} as const

type Platform = typeof platforms[keyof typeof platforms]

export class System {

	autostartApp = new Autostart()
	platform = platforms
	dialog = new Dialog()
	fs = new Fs()
	shell = new Shell()
	log = new Log()

	async getPlatform(): Promise<Platform> {

		const app = await window.__TAURI__?.os

		if ( app && typeof app.platform === 'function' ) {

			return await app.platform()
		
		} else {

			// Parse the userAgent to determine the platform if __TAURI__.app is not available
			const userAgent = window.navigator.userAgent.toLowerCase()
			if ( userAgent.includes( 'linux' ) ) return this.platform.LINUX
			if ( userAgent.includes( 'mac' ) ) return this.platform.MACOS
			if ( userAgent.includes( 'iphone' ) || userAgent.includes( 'ipad' ) ) return this.platform.IOS
			if ( userAgent.includes( 'freebsd' ) ) return this.platform.FREEBSD
			if ( userAgent.includes( 'dragonfly' ) ) return this.platform.DRAGONFLY
			if ( userAgent.includes( 'netbsd' ) ) return this.platform.NETBSD
			if ( userAgent.includes( 'openbsd' ) ) return this.platform.OPENBSD
			if ( userAgent.includes( 'sunos' ) ) return this.platform.SOLARIS // sunos is often used for Solaris
			if ( userAgent.includes( 'android' ) ) return this.platform.ANDROID
			if ( userAgent.includes( 'win' ) ) return this.platform.WINDOWS
			return this.platform.UNKNOWN
		
		}
	
	}

	async isMacos(): Promise<boolean> {

		const platform = await this.getPlatform()
		return platform === this.platform.MACOS
	
	}

}
