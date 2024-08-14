/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */
import {
	fileURLToPath, URL, 
} from 'url'

import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'
import { name }         from '../../package.json'
// @ts-ignore
import dmgScript  from './assets/create-dmg.txt'
import { target } from '@bepp/config/consts'

export default defineConfig( {
	esbuild : { 
		platform : 'node',
		target,
	},
	assetsInclude : [
		'**/*.png',
	],
	build : {
		ssr : true,
		target,
		lib : {
			entry : [
				'src/cli.ts',
				'src/main.ts',
				'src/lib.ts',   
			], 
			name, 
			fileName : format => `${name}.${format}.js`,
			formats  : [
				'es', 
			],
		},
	},
	resolve : {
		alias : [
			{
				find        : '@assets', 
				replacement : fileURLToPath( new URL( './assets', import.meta.url ) ),  
			},
		],
	},
	define : {
		DMG_SCRIPT_CONTENT : JSON.stringify( dmgScript ),
	},
	plugins : [ 
		dts( {
			rollupTypes : true,
		} ),
	],
} )
