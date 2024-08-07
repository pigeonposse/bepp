
/**
 * Update pkg apps versions.
 *
 * @description Update pkg version.
 */ 

import {
	object2string,
	paths,
	readJSON, 
	writeFile,
} from '../core/main.mjs'

export const updateAppsVersion = async ( ) =>{

	try {

		const jsonAppPath    = paths.appPkg
		const jsonPath       = paths.workspacePkg
		const fileAppContent = await readJSON( jsonAppPath )
		const newVersion     = fileAppContent.version
		const data           = await readJSON( jsonPath )

		for ( const key in data.extra.downloadUrl ) {

			const item = data.extra.downloadUrl[key]

			if ( item.type === 'desktop' && item['update-version'] ) {

				item.url = item.url.replace( /(Super8[_-])[\d.]+([_-])/g, `$1${newVersion}$2` )
		
			}
	
		}

		await writeFile( jsonPath, object2string( data ) )
		console.log( `Version updated to ${newVersion} in 'extra.downloadUrl' from packages.json` )
	
	} catch ( error ) {

		console.error( 'Error updating Apps versions:', error )

	}

}
