import { test } from '@bepp/config/tests'
import { init } from './main'

test( async ( { section } ) => ( section( {
	title : 'Init',
	fn    : async ( { addBooleanTest } ) => {

		addBooleanTest( {
			title    : 'Error because input is not string or undefined',
			expected : false,
			fn       : async ( ) => {

				try {

					await init( {
						// @ts-ignore
						input : 2,
						y     : true,
					} ) 
					return true
				
				}catch( e ){

					// console.error( {
					// 	error : 'init error', e,
					// } )
					return false
				
				}
			
			},
		} )
	
	},
} ) ) )
