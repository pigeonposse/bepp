import { test }         from '@bepp/config/tests'
import { ChildProcess } from './process'

test( async ( { section, utils } ) => {

	const plat          = await utils.getPlatform()
	const binFile       = utils.joinPath( utils.paths.beppDir, 'bin', 'main.js' )
	const confFile      = utils.joinPath( utils.paths.beppDir, 'tests', 'bepp.config.json' )
	const confLinuxFile = utils.joinPath( utils.paths.beppDir, 'tests','bepp.linux.config.json' )
	const bin           = `node ${binFile}`

	section( {
		title : 'test [BIN]',
		fn    : async ( { addTest } ) => {

			await addTest( {
				title : 'Expect help output',
				fn    : async ( { expect } ) => {

					await ChildProcess.execute( {
						cmd     : bin + ' -h', 
						onError : () => {},
						onLog   : d => {

							expect( d ).toBeTypeOf( 'string' )
						
						},
					} )
				
				},
			} )

			const noBuild = await ChildProcess.execBool( `${bin} build -c noexist.json` )

			await addTest( {
				title : 'Error because no exists custom file',
				fn    : async ( { expect } ) => ( expect( noBuild ).toBe( false ) ),
			} )

			if( plat !== 'macos' ){

				const buildLinux = await ChildProcess.execBool( `${bin} build -c ${confLinuxFile}` )	
				await addTest( {
					title : 'Execute build in linux existent config file',
					fn    : async ( { expect } ) => ( expect( buildLinux ).toBe( false ) ),
				} )
			
			}else {

				const build = await ChildProcess.execBool( `${bin} build -c ${confFile} --verbose` )	
				await addTest( {
					title : '[Macos] Execute build in existent config file',
					fn    : async ( { expect } ) => ( expect( build ).toBe( false ) ),
				} )
			
			}
		
		},
	} )

} )
