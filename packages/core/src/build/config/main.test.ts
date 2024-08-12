import {test} from '@bepp/config/tests'
import { buildConfig } from './main'
import type { BuildConfig } from './types'

test( async ( { section, utils } ) => {

	section( {
		title : 'Build [Config file]',
		fn    : async ( { addTest } ) => {

			await addTest( {
				title : 'Error because input is not string | undefined',
				fn    : async ( { expect } ) => {

					expect( async () => await buildConfig( {
						// @ts-ignore
						config : 2,
					} )).rejects.toThrowError()
				
				},
			} )
			await addTest( {
				title : 'Success with Example config path',
				fn    : async ( { expect } ) => {
					const jsonPath = utils.joinPath(utils.paths.coreDir, 'src','build','config','example.config.json' )
					expect( async () => await buildConfig( {
						// verbose:true,
						config: jsonPath 
					} )).not.toThrowError()
				
				},
			} )
			await addTest( {
				title    : 'Success with Example config data',
				fn       : async ({ expect }) => {
					const data: BuildConfig = {
						shared: {
							compress: "zip",
							id: "from-data",
							input: {
								chromium: utils.joinPath(utils.paths.extsDir, 'chromium' )
							},
							output: utils.paths.extsOutputDir
						},
						build: [
							{
								type: "chrome"
							}
						]
					}

					expect( async () => await buildConfig( {
						verbose:true,
						config: data 
					} )).not.toThrowError()

				
				},
			} )
		},
	} )

} )
