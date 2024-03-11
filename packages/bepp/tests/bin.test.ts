import {
	describe, expect, it, 
} from 'vitest'
import { ChildProcess } from './process'
import { platform }     from 'node:os'

const macos = platform() === 'darwin'

const bin = 'node bin/main.js'
describe( 'Test BIN', async () => {

	it( 'Expect help output', async () => {

		await ChildProcess.execute( {
			cmd     : bin + ' -h', 
			onError : () => {},
			onLog   : d => {
				
				expect( d ).toBeTypeOf( 'string' )
			
			},
		} )

	} )

	const build   = await ChildProcess.execBool( bin + ' build --file tests/bepp.config.json' )	
	const noBuild = await ChildProcess.execBool( bin + ' build --file noexist.json' )

	it( 'Error because no exists custom file', async () => {

		expect( noBuild ).toBe( false )

	} )

	it( 'Execute build in existent config file', async () => {

		expect( build ).toBe( true ) 

	} )
	
	if( !macos ){

		const buildLinux = await ChildProcess.execBool( bin + ' build --file tests/bepp.linux.config.json' )	
		
		it( 'Execute build in linux existent config file', async () => {

			expect( buildLinux ).toBe( true ) 
	
		} )
	
	}

} )
