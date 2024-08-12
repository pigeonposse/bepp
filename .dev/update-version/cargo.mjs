
/**
 * Update cargo version.
 *
 * @description Update cargo version.
 */ 

import {
	joinPath, 
	paths, 
	writeFile,
	readFile,
} from '../core/main.mjs'

export const updateCargoVersion = async newVersion => {

	try {

		const pkgAppPath     = paths.appDir
		const cargoTomlPath  = joinPath( pkgAppPath, 'src-tauri', 'Cargo.toml' )
		let cargoTomlContent = await readFile( cargoTomlPath )
		const versionRegex   = /^version\s*=\s*"(.*)"/m
		
		if ( versionRegex.test( cargoTomlContent ) ) 
			cargoTomlContent = cargoTomlContent.replace( versionRegex, `version = "${newVersion}"` )
		else 
			cargoTomlContent += `\n[package]\nversion = "${newVersion}"\n`

		await writeFile( cargoTomlPath, cargoTomlContent )

		console.log( `Version updated to ${newVersion} in Cargo.toml` )
	
	} catch ( error ) {

		console.error( 'Error updating Cargo.toml version:', error )
	
	}

}
