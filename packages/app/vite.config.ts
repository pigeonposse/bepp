/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/config/
 */
// @ts-ignore
import legacy           from '@vitejs/plugin-legacy'
import { sveltekit }    from '@sveltejs/kit/vite'
import { internalIpV4 } from 'internal-ip'
import mainPkg          from '../../package.json'
import pkg              from './package.json'
import {
	defineConfig, 
	type UserConfig, 
} from 'vite'

// @ts-expect-error process is a nodejs global
const mobile      = !!/android|ios/.exec( process.env.TAURI_ENV_PLATFORM )
const isContainer = process.env.CONTAINER_ENV === 'true'
const devPort     = Number( mainPkg.extra.defaultAppPort )
const host        = await internalIpV4()

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
				target       : `http://localhost:${mainPkg.extra.defaultApiPort}`,
				rewrite      : path => path.replace( /^\/api/, '' ),
				changeOrigin : true,
				secure       : false,
			},
		},
	} : {} ),
}

export default defineConfig( {
	plugins : [
		sveltekit( ),
		legacy( {
			// to be compatible with legacy browsers
			targets : [
				'defaults', 
				'not IE 11',
			],
			// generate legacy browser's chunks
			renderLegacyChunks : false,
			/**
			 * Auto detect.
			 */
			modernPolyfills    : true,
			/**
			 * Or add manually, for examples.
			 */
			// for legacy browsers only
			// polyfills: ['es/global-this', 'es/array/includes'],
			// for modern browsers only
			// modernPolyfills: ['es/global-this'],
		} ),
	],
	server  : server,
	preview : server,
	esbuild : {
		// configure this value when the browser version of the development environment is lower
		// minimum support es2015
		// https://esbuild.github.io/api/#target
		target : 'es2015',
	},
	build : {
		chunkSizeWarningLimit : 1000, 
		rollupOptions         : {
			output : {
				manualChunks( id ) {

					if ( id.includes( 'node_modules' ) ) {

						if ( id.includes( 'node_modules/@fortawesome/free-solid-svg-icons' ) )return 'vendor-fortawesome-free-solid-svg-icons'
						if ( id.includes( 'node_modules/@fortawesome/free-brands-svg-icons' ) )return 'vendor-fortawesome-free-brands-svg-icons'
						if ( id.includes( 'node_modules/svelte-fa' ) ) return 'vendor-svelte-fa'
						if ( id.includes( 'node_modules/sveltekit-i18n' ) ) return 'vendor-sveltekit-i18n'
						if ( id.includes( 'node_modules/svelte-confetti' ) ) return 'vendor-svelte-confetti'
						if ( id.includes( 'node_modules/flowbite' ) ) return 'vendor-flowbite'
						if ( id.includes( 'node_modules/flowbite-svelte' ) ) return 'vendor-flowbite-svelte'
						if ( id.includes( 'node_modules/mousetrap' ) ) return 'vendor-mousetrap'
						return 'vendor'

					}

				},
			},
		},
	},
	define : {
		PKG      : pkg,
		MAIN_PKG : mainPkg,
	},
} )
