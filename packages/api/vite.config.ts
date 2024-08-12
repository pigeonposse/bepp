/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */
import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'
import { name }         from '../../package.json'
import { port }         from './src/app'
import devServer        from '@hono/vite-dev-server'

export default defineConfig( {
	esbuild : { 
		platform : 'node',
		target   : 'node20',
	},
	server : {
		host : '0.0.0.0', // important for docker image
		port,
	},
	preview : {
		port,
	},
	build : {
		ssr    : true,
		target : 'node20',
		lib    : {
			entry : [
				'src/app.ts',
				'src/deno.ts',
				'src/node.ts',
				'src/types.ts',
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
		devServer( {
			entry : 'src/app.ts', // The file path of your application.
		} ),
	],
} )
