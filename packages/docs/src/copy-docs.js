// @ts-nocheck
/**
 * Copy Documentation File.
 *
 * @description This script is used to copy documentation files from one directory to another. 
 *  It can be configured to remove the destination folder before copying.
 */

import {
	promises as fsPromises, constants, 
} from 'node:fs'
import path from 'node:path'

const args       = process.argv.slice( 2 )
const removeDest = args.includes( '--rm-dest' )

const copyFolder = async ( sourceDir, targetDir ) => {

	try {

		// Create the target directory if it doesn't exist
		await fsPromises.mkdir( targetDir, {
			recursive : true, 
		} )

		const files = await fsPromises.readdir( sourceDir )

		for ( const file of files ) {

			const sourceFilePath = path.join( sourceDir, file )
			const targetFilePath = path.join( targetDir, file )

			const stats = await fsPromises.stat( sourceFilePath )

			if ( stats.isFile() ) {

				// If it's a file, copy it
				await fsPromises.copyFile( sourceFilePath, targetFilePath )
			
			} else if ( stats.isDirectory() ) {

				// If it's a directory, recursively copy it
				await copyFolder( sourceFilePath, targetFilePath )
			
			}
		
		}
	
	} catch ( error ) {

		throw Error( error )
	
	}
  
}
const rmDest = async route => {

	// Check if docsDestPath exists and remove it if it does
	try {

		await fsPromises.access( route, constants.F_OK )
		await fsPromises.rm( route, {
			recursive : true, 
		} )
		
	} catch ( e ) {

		throw Error( e )
		
	}
      
}

try{

	const docsPackagePath  = process.env.PWD
	const docsSrcPath      = path.join( docsPackagePath, '../../docs' )
	const docsDestTempPath = path.join( docsPackagePath, './src/__temp__' )
	const docsDestPath     = path.join( docsDestTempPath, 'docs' )
	
	if ( removeDest ) {

		rmDest( docsDestTempPath )
		console.log( '✨ Folder removed' )

	}else{

		copyFolder( docsSrcPath, docsDestPath )
	
		console.log( '✨ Folder copied' )
	
	}

}catch( e ){

	console.error( '❌ Error:', e )

}
