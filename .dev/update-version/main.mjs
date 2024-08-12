
/**
 * Update versions.
 *
 * @description Update versions.
 */ 

import { paths }              from '../core/const.mjs'
import { readJSON }           from '../core/fs.mjs'
import { updateAppsVersion }  from './apps.mjs'
import { updateCargoVersion } from './cargo.mjs'

try {

	const run = async () => {

		const packageJsonPath = paths.appPkg
		const packageJson     = await readJSON( packageJsonPath )
		const newVersion      = packageJson.version
		await updateAppsVersion( newVersion )
		await updateCargoVersion( newVersion )
	
	}

	run()

}catch( e ){

	console.error( 'Error in update version: ' + e )

}
