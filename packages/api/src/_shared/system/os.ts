
import { SystemSuper } from './super'

/**
 * SYSTEM CLASS.
 */

export class Os extends SystemSuper{

	async getPlatform(): Promise< typeof this.const.platform[keyof typeof this.const.platform]> {

		if ( this.isWindow ) {

			const userAgent = window.navigator.userAgent.toLowerCase()
			if ( userAgent.includes( 'linux' ) ) return this.const.platform.LINUX
			if ( userAgent.includes( 'mac' ) ) return this.const.platform.MACOS
			if ( userAgent.includes( 'iphone' ) || userAgent.includes( 'ipad' ) ) return this.const.platform.IOS
			if ( userAgent.includes( 'freebsd' ) ) return this.const.platform.FREEBSD
			if ( userAgent.includes( 'dragonfly' ) ) return this.const.platform.DRAGONFLY
			if ( userAgent.includes( 'netbsd' ) ) return this.const.platform.NETBSD
			if ( userAgent.includes( 'openbsd' ) ) return this.const.platform.OPENBSD
			if ( userAgent.includes( 'sunos' ) ) return this.const.platform.SOLARIS // sunos is often used for Solaris
			if ( userAgent.includes( 'android' ) ) return this.const.platform.ANDROID
			if ( userAgent.includes( 'win' ) ) return this.const.platform.WINDOWS
			return this.const.platform.UNKNOWN
		
		}else if ( this.isNode ) {

			const { platform } = await import( 'node:os' )

			switch ( platform() ) {

				case 'linux' :
					return this.const.platform.LINUX
				case 'darwin' :
					return this.const.platform.MACOS
				case 'win32' :
					return this.const.platform.WINDOWS
				case 'android' :
					return this.const.platform.ANDROID
				case 'freebsd' :
					return this.const.platform.FREEBSD
				case 'openbsd' :
					return this.const.platform.OPENBSD
				case 'sunos' :
					return this.const.platform.SOLARIS
				default :
					return this.const.platform.UNKNOWN
			
			}
		
		} 

		return this.const.platform.UNKNOWN
	
	}

	async isMacos(): Promise<boolean> {

		const platform = await this.getPlatform()
		return platform === this.const.platform.MACOS
	
	}

}
