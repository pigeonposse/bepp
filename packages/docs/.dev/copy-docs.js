
/**
 * Copy Documentation File.
 *
 * @description This script is used to copy documentation files from one directory to another. 
 *  It can be configured to remove the destination folder before copying.
 */

import {
	copyDir, 
	joinPath, 
	paths, 
	removePathIfExist, 
} from '@bepp/config/core'

export const docsSrcPath = joinPath( paths.documentationDir )
export const docsDestTempPath = joinPath( paths.docsDir, './src/__temp__' )

try{

	const args       = process.argv.slice( 2 )
	const removeDest = args.includes( '--rm-dest' )
	
	if ( removeDest ) {

		await removePathIfExist( docsDestTempPath )
		console.log( '✨ Documentation temp Folder removed' )

	}else{

		await copyDir( docsSrcPath, docsDestTempPath )
	
		console.log( '✨ Documentation Folder copied' )
	
	}

}catch( e ){

	console.error( '❌ Error:', e )

}
