import {
	describe, expect, it, 
} from '../_shared/tests'
import { init } from './main'

describe( 'Init', () => {

	it( 'Error bacause input is not string', () => {

		// @ts-ignore
		expect( async () => {

			await init( {
				// @ts-ignore
				input : 2,
			} )
		
		} ).rejects.toThrowError()

	} )

} )
