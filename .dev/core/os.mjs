// @ts-nocheck
import {
	arch, 
	platform, 
} from 'node:os'

/**
 * Determines the operating system.
 *
 * @returns {'windows' | 'macos' | 'linux' | 'unknown'} - The operating system. Possible values are 'linux', 'macos', or 'windows'.
 */
export const getPlatform = async () => {

	const p = platform()

	switch ( p ) {

		case 'win32' :
			return 'windows'
		case 'darwin' :
			return 'macos'
		case 'linux' :
			return 'linux'
		default :
			return 'unknown'
	
	}

}

/**
 * Returns the operating system CPU architecture.
 *
 * @returns {'arm64' | 'x64' | 'unknown'} - The operating system CPU architecture. 
 */
export function getArch() {

	const architecture = arch()
	
	switch ( architecture ) {

		case 'arm64' :
			return 'arm64'
		case 'arm' :
			return 'arm64'
		case 'x64' :
			return 'x64'
		default :
			return 'unknown'
	
	}

}
