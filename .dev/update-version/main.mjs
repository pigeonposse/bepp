
/**
 * Update versions.
 *
 * @description Update versions.
 */ 

import { updateAppsVersion }  from './apps.mjs'
import { updateCargoVersion } from './cargo.mjs'

try {

	const run = async () => {

		await updateAppsVersion()
		await updateCargoVersion()
	
	}

	run()

}catch( e ){

	console.error( 'Error in update version: ' + e )

}
