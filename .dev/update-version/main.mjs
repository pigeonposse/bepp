
/**
 * Update versions.
 *
 * @description Update versions.
 */ 

import { paths }                    from '../core/const.mjs'
import { readJSON }                 from '../core/fs.mjs'
import { updateActionVersion }      from './action.mjs'
import { updateAppsVersion }        from './apps.mjs'
import { updateCargoVersion }       from './cargo.mjs'
import { updateDockerfileVersion }  from './docker.mjs'
import { updatePigeonposseVersion } from './pigeonposse.mjs'

try {

	const run = async () => {

		const packageJsonPath = paths.appPkg
		const packageJson     = await readJSON( packageJsonPath )
		const newVersion      = packageJson.version
		await updateAppsVersion( newVersion )
		await updateCargoVersion( newVersion )
		await updatePigeonposseVersion( newVersion )
		await updateActionVersion( newVersion )
		await updateDockerfileVersion( newVersion )
	
	}

	run()

}catch( e ){

	console.error( 'Error in update version: ' + e )

}
