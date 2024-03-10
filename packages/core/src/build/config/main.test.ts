import {
	describe, expect, it, 
} from '../../_shared/tests'
import { buildConfig } from './main'

describe( 'Build [Config file]', () => {

	it( 'Error bacause input is not string | undefined', () => {

		// @ts-ignore
		expect( async () => {

	
			await buildConfig( {
				// @ts-ignore
				file : 2,
			} )
		
		} ).rejects.toThrowError()

	} )

} )
