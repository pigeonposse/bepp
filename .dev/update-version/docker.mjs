import {
	paths, joinPath, readFile, writeFile,
} from '../core/main.mjs'

export const updateDockerfileVersion = async ( path, newVersion ) => {

	const filePaths = joinPath( 'src', path, 'Dockerfile' )
	const file      = joinPath( paths.containerDir, filePaths )
	let fileContent = await readFile( file )
	
	const prefix       = 'ENV BEPP_VERSION='
	const versionRegex = new RegExp( `^${prefix}(.*)$`, 'm' )

	fileContent = ( versionRegex.test( fileContent ) ) ?
		fileContent.replace( versionRegex, `${prefix}${newVersion}` ) :
		`${prefix}${newVersion}\n` + fileContent

	await writeFile( file, fileContent )

	console.log( `Dockerfile version updated to ${newVersion} in: ${filePaths}` )

}

export const updateDockerfilesVersion = async newVersion => {

	await updateDockerfileVersion( 'api', newVersion )
	await updateDockerfileVersion( 'app', newVersion )
	await updateDockerfileVersion( 'cli', newVersion )

}
