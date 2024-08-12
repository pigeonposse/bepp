
import {
	paths, joinPath, readFile, writeFile,
} from '../core/main.mjs'

export const updatePigeonposseVersion = async newVersion => {

	const file         = await joinPath( paths.workspaceDir, '.pigeonposse.yml' )
	let fileContent    = await readFile( file )
	const versionRegex = /^(\s*version\s*:\s*")(.*)(")/m
	
	if ( versionRegex.test( fileContent ) ) {

		// Replace the old version with the new version
		fileContent = fileContent.replace( versionRegex, `$1${newVersion}$3` )
	
	} else {

		// Append the version line if it doesn't exist
		fileContent = fileContent.replace(
			/(web:\s*-\s*id\s*:\s*".*?")(.*)(status\s*:\s*".*?")/s,
			`$1\n    version: "${newVersion}"\n    $3`,
		)

	}

	await writeFile( file, fileContent )

	console.log( `Version updated to ${newVersion} in .pigeonposse.yml` )

}
