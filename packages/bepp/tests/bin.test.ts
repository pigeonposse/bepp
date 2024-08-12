import { test }                  from '@bepp/config/tests'
import {
	getPlatform, paths, joinPath,
} from '@bepp/config/core'
import { ChildProcess } from './process'

const plat          = await getPlatform()
const binFile       = joinPath( paths.beppDir, 'bin', 'main.js' )
const confFile      = joinPath( paths.beppDir, 'tests', 'bepp.macos.config.json' )
const confLinuxFile = joinPath( paths.beppDir, 'tests','bepp.linux.config.json' )
const bin           = `node ${binFile}`
const noBuild       = await ChildProcess.execBool( `${bin} build -c noexist.json` )
const isMacos       = plat === 'macos'
const build         = ( !isMacos ) ?
	await ChildProcess.execBool( `${bin} build -c ${confLinuxFile}` ) :
	await ChildProcess.execBool( `${bin} build -c ${confFile} --verbose` )	

console.log( {
	isMacos,
	noBuild,
	build,
} )
			
test( async ( { section } ) => {
	
	section( {
		title : 'test [BIN]',
		fn    : async ( { addTest } ) => {

			addTest( {
				title : 'Expect help output',
				fn    : async ( { expect } ) => {

					ChildProcess.execute( {
						cmd     : bin + ' -h', 
						onError : () => {},
						onLog   : d => {

							expect( d ).toBeTypeOf( 'string' )
						
						},
					} )
				
				},
			} )
	
			addTest( {
				title : 'Error because no exists custom file',
				fn    : async ( { expect } ) => ( expect( noBuild ).toBe( false ) ),
			} )

			addTest( {
				title : 'Execute build in existent config file',
				fn    : async ( { expect } ) => ( expect( build ).toBe( true ) ),
			} )
		
		},
	} )

} )

