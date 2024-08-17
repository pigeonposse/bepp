
/**
 * Update versions.
 *
 * @description Update versions.
 */ 

import { paths }                    from '../core/const.mjs'
import { readJSON }                 from '../core/fs.mjs'
import { execProcess }              from '../core/process.mjs'
import { updateActionVersion }      from './action.mjs'
import { updateAppsVersion }        from './apps.mjs'
import { updateCargoVersion }       from './cargo.mjs'
import { updateDockerfilesVersion } from './docker.mjs'
import { updatePigeonposseVersion } from './pigeonposse.mjs'

await execProcess( {
	name : 'UPDATE VERSION FILES',
	on   : async ( ) => {

		const packageJsonPath = paths.appPkg
		const packageJson     = await readJSON( packageJsonPath )
		const newVersion      = packageJson.version
		await updateAppsVersion( newVersion )
		await updateCargoVersion( newVersion )
		await updatePigeonposseVersion( newVersion )
		await updateActionVersion( newVersion )
		await updateDockerfilesVersion( newVersion )
	
	},
} )
