/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/config/
 */
import { sveltekit }               from '@sveltejs/kit/vite'
import {
	defineConfig, type UserConfig, 
} from 'vite'
import mainPkg          from '../../package.json'
import pkg              from './package.json'
import { internalIpV4 } from 'internal-ip'

const devPort = Number( pkg.extra.devPort )
// @ts-expect-error process is a nodejs global
const mobile      = !!/android|ios/.exec( process.env.TAURI_ENV_PLATFORM )
const isContainer = process.env.CONTAINER_ENV === 'true'

const host                         = await internalIpV4()
const server: UserConfig['server'] = {
	port       : devPort, // important for match with tauri.config.json
	strictPort : true,
	host       : '0.0.0.0', // important for docker image
	hmr        : mobile ? {
		protocol : 'ws',
		host,
		port     : devPort,
	} : undefined,
	...( isContainer ? {
		proxy : {
			'/api' : {
				target       : 'http://localhost:13129',
				rewrite      : path => path.replace( /^\/api/, '' ),
				changeOrigin : true,
				secure       : false,
			},
		},
	} : {} ),
}

export default defineConfig( {
	plugins : [
		sveltekit(),
	],
	server  : server,
	preview : server,
	// build   : {
	// 	chunkSizeWarningLimit : 1600, 
	// },
	define  : {
		PKG      : pkg,
		MAIN_PKG : mainPkg,
	},
} )
