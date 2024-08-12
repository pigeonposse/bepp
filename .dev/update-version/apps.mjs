
/**
 * Update pkg apps versions.
 *
 * @description Update pkg version.
 */ 

import {
	joinPath,
	object2string,
	paths,
	readJSON, 
	writeFile,
} from '../core/main.mjs'

export const updateAppsVersion = async newVersion =>{

	try {

		const jsonPath   = paths.workspacePkg
		const data       = await readJSON( jsonPath )
		const tariConfig = await readJSON( joinPath( paths.appDir, 'src-tauri', 'tauri.conf.json' ) )
		const regex      = new RegExp( `(${tariConfig.productName}[_-])[\\d.]+([_-])`, 'g' )

		for ( const key in data.extra.downloadUrl ) {

			const item = data.extra.downloadUrl[key]

			if ( item.type === 'desktop' && item['update-version'] ) {

				item.url = item.url.replace( regex, `$1${newVersion}$2` )
		
			}
	
		}

		await writeFile( jsonPath, object2string( data ) )
		console.log( `Version updated to ${newVersion} in 'extra.downloadUrl' from packages.json` )
	
	} catch ( error ) {

		console.error( 'Error updating Apps versions:', error )

	}

}
