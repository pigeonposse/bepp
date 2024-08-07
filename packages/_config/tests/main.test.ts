import { test } from './main'

test( async ( { section } ) => {

	section( {
		title : 'test example section',
		fn    : async ( { addTest, addBooleanTest } ) => {

			addTest( {
				title : 'test simple',
				fn    : async ( { expect } ) => {

					const returnTrue = () => true
					expect( returnTrue() ).toBe( true )
				
				},
			} )
			addBooleanTest( {
				title    : 'boolean test',
				expected : true,
				fn       : async () => {

					return true
				
				},
			} )
		
		},
	} )

} )
