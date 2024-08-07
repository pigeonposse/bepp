import {test} from '@bepp/config/tests'
import { buildConfig } from './main'
import type { BuildConfig } from './types'

test( async ( { section, utils } ) => {

	section( {
		title : 'Build [Config file]',
		fn    : async ( { addTest, addBooleanTest } ) => {

			await addTest( {
				title : 'Error bacause input is not string | undefined',
				fn    : async ( { expect } ) => {

					expect( async () => await buildConfig( {
						// @ts-ignore
						config : 2,
					} )).rejects.toThrowError()
				
				},
			} )
			await addBooleanTest( {
				title    : 'Success with Example config path',
				expected : true,
				fn       : async () => {

					try {

						const jsonPath = utils.joinPath(utils.paths.coreDir, 'src','build','config','example.config.json' )
						const extInput = utils.joinPath(utils.paths.extsDir, 'chromium' )
						const extsOutput = utils.paths.extsOutputDir
						const data: BuildConfig = {
							shared: {
								compress: "zip",
								id: "from-data",
								input: {
									chromium: extInput
								},
								output: extsOutput
							},
							build: [
								{
									type: "chrome"
								}
							]
						}
						// console.log({data, jsonPath})
						await buildConfig({ 
							// verbose:true,
							config: jsonPath 
						})
						// await buildConfig({
						// 	verbose:true,
						// 	config: data,
						// })
						return true
					} catch (e) {
						console.error({
							id: 'error',
							e
						})
						return false
					}
				
				},
			} )
		},
	} )

} )
