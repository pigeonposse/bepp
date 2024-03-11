/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'
import { name }         from '../../package.json'
import { platform }     from 'node:os'

const macos = platform() === 'darwin'

export default defineConfig( {
	esbuild : { 
		platform : 'node',
		target   : 'node18',
	},
	build : {
		ssr    : true,
		target : 'node18',
		lib    : {
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
		rollupOptions : !macos ? {
			external : [
				'appdmg',
			],
		} : {},
	},
	plugins : [ 
		dts( {
			rollupTypes : true,
		} ),
	],
} )
