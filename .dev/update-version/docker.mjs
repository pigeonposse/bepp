import {
	paths, joinPath, readFile, writeFile,
} from '../core/main.mjs'

export const updateDockerfileVersion = async newVersion => {

	const file      = await joinPath( paths.containerDir, 'Dockerfile' )
	let fileContent = await readFile( file )
	
	const prefix       = 'ENV BEPP_VERSION='
	const versionRegex = new RegExp( `^${prefix}(.*)$`, 'm' )

	fileContent = ( versionRegex.test( fileContent ) ) ?
		fileContent.replace( versionRegex, `${prefix}${newVersion}` ) :
		`${prefix}${newVersion}\n` + fileContent

	await writeFile( file, fileContent )

	console.log( `Dockerfile version updated to ${newVersion}` )

}
