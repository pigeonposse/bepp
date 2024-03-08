/**
 * GH ACTION FILE.
 *
 * @description File for set gh action.
 */

import * as core       from '@actions/core'
import { buildConfig } from '@bepp/core'

const getInputs = () => {

	return {
		file : core.getInput( 'file', {
			required : false,
		} ),
	}

}

const run = async () => {

	try {
		
		const inputs = getInputs()
		
		core.info( 'Building extensions from config file' )
		core.info( 'Config Data: ' + inputs )

		await buildConfig( {
			...inputs, 
			verbose : true,
			time    : true,
			exit    : true,
		} )
	
	} catch ( error ) {

		if ( error instanceof Error ) core.setFailed( error.message )
	
	}

}

run()
