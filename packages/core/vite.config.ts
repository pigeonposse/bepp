/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'
import { name }         from '../../package.json'

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
	},
	plugins : [ 
		dts( {
			rollupTypes : true,
		} ),
	],
} )
