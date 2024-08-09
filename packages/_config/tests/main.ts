/**
 * Tests.
 *
 * @description File for set test functions.
 */
export { describe, it, expect } from 'vitest'
import type { ExpectStatic } from 'vitest'
import {
	describe, it, expect,
	vi,
} from 'vitest'
import * as utils from '../../../.dev/core/main.mjs'


export type TestSectionFunctsParams = {
	addTest: ( testOptions: { title: string; fn: ( args: { expect: ExpectStatic } ) => Promise<void> } ) => Promise<void>
	addBooleanTest: ( testOptions: { title: string; expected: boolean, fn: ( ) => Promise<boolean> } ) => Promise<void>
}
export type TestSectionParams = {
	title: string
	fn: ( args: TestSectionFunctsParams ) => Promise<void>
}
export type TestParams = {
	section: ( args: TestSectionParams ) => Promise<void>
	utils: typeof utils,
}
export const test = ( fn: ( args: TestParams ) => Promise<void> ) => {

	const section = async ( { title, fn }: TestSectionParams ) => {

		describe( title, () => {

			const addTest: TestSectionFunctsParams['addTest'] = async ( { title, fn } ) => {

				it( title, async () => {

					await fn( {
						expect, 
					} )
				
				} )
			
			}

			const addBooleanTest: TestSectionFunctsParams['addBooleanTest'] = async ( { title, fn, expected } ) => {

				it( title, async () => {

					const vifn = vi.fn( async () => {

						// eslint-disable-next-line no-async-promise-executor
						return new Promise( async ( resolve, reject ) => {

							try {

								const res = await fn()
								
								if( !res && expected ) reject( false )
								if( !res && !expected ) resolve( false )
								else resolve( true )
							
							}catch( _e ){

								reject( false )
							
							}
						
						} ) 

					} )
					const res = await vifn()
					expect( res ).toBe( expected )
				
				} )
			
			}

			fn( {
				addTest, 
				addBooleanTest, 
			} )
		
		} )
		
	}

	fn( {
		section,
		utils,
	} )

}

