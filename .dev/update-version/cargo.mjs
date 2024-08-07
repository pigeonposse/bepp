
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
	readJSON,
} from '../core/main.mjs'

export const updateCargoVersion = async () => {

	try {

		const pkgAppPath      = paths.appDir
		const packageJsonPath = paths.appPkg
		const packageJson     = await readJSON( packageJsonPath )
		const newVersion      = packageJson.version
		
		const cargoTomlPath  = joinPath( pkgAppPath, 'src-tauri', 'Cargo.toml' )
		let cargoTomlContent = await readFile( cargoTomlPath )

		const versionRegex = /^version\s*=\s*"(.*)"/m
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
