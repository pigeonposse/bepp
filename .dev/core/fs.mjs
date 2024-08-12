// @ts-nocheck
import {
	rm,
	stat, 
	unlink, 
} from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import fs                from 'node:fs'
import path              from 'node:path'

// eslint-disable-next-line jsdoc/require-description, jsdoc/require-param
/**
 * @deprecated
 */
export const renameAndCopyFiles = async ( oldFileName, tempFileName, newFileName ) => {

	try {

		await fs.promises.rename( oldFileName, tempFileName )
		await fs.promises.copyFile( tempFileName, newFileName )
	
	} catch ( error ) {

		console.error( error )
	
	}

}
export const copyFile = async ( { input, output } ) => {

	try {

		await fs.promises.copyFile( input, output )
		// await fs.promises.rename( output, name )

	} catch ( error ) {

		console.error( error )
	
	}

}
export const writeFile = async ( path, data ) => {

	const dir = getDirName( path )
        
	await fs.promises.mkdir( dir, {
		recursive : true, 
	} )

	await fs.promises.writeFile( path, data, 'utf8' )

}

export const getExtName = path.extname
export const getDirName = path.dirname
export const getBaseName = path.basename

/**
 * Gets the file names in a directory and filters them by extension.
 *
 * @param   {object}            props            - Function props.
 * @param   {string}            props.path       - Path to the directory.
 * @param   {string[]}          props.extensions - Array of extensions to filter by, e.g., ['.md', '.txt'].
 * @returns {Promise<string[]>}                  - A promise that resolves with an array of file names without extensions.
 */
export async function getFilteredFileNames( { path, extensions = [] } ) {

	const files = await fs.promises.readdir( path )
	
	const filteredFileNames = files.filter( file => {

		const ext = getExtName( file )
		return extensions.includes( ext )
			
	} ).map( file => getBaseName( file, getExtName( file ) ) )

	return filteredFileNames

}

export const readFile = async path => {

	return await fs.promises.readFile( path, 'utf8' )

}
export const createSymlink = async ( sourceDir, targetDir ) =>{

	try {

		await fs.promises.access( targetDir )
	
	} catch ( error ) {

		if ( error.code === 'ENOENT' ) {

			// El directorio destino no existe, lo creamos
			await fs.promises.mkdir( targetDir, {
				recursive : true, 
			} )
		
		} else {

			throw `❌🔗 ${error}`
		
		}
	
	}

	const sourceStat = await fs.promises.lstat( sourceDir )
	// const targetStat = await fs.promises.lstat( targetDir )
	const isWin = process.platform === 'win32'

	if ( sourceStat.isDirectory() ) {

		if ( isWin ) {

			// En Windows, debemos crear un enlace de tipo 'junction'
			await fs.promises.symlink( sourceDir, path.join( targetDir, path.basename( sourceDir ) ), 'junction' )
		
		} else {

			// En Linux y macOS, podemos crear enlaces simbólicos directos a directorios
			await fs.promises.symlink( sourceDir, path.join( targetDir, path.basename( sourceDir ) ), 'dir' )
		
		}
	
	} else if ( sourceStat.isFile() ) {

		// Si la fuente es un archivo, creamos un enlace simbólico a ese archivo
		await fs.promises.symlink( sourceDir, path.join( targetDir, path.basename( sourceDir ) ) )
	
	}

	console.log( `🔗 symlink: "${sourceDir}" to "${targetDir}".` )

}

export const copyDir = async ( src, dest ) => {

	try {

		// Read the source directory
		const entries = await fs.promises.readdir( src, {
			withFileTypes : true, 
		} )

		// Create the destination directory if it doesn't exist
		await fs.promises.mkdir( dest, {
			recursive : true, 
		} )

		// Loop through the entries in the source directory
		for ( const entry of entries ) {

			const srcPath  = path.join( src, entry.name )
			const destPath = path.join( dest, entry.name )

			if ( entry.isDirectory() ) {

				// Recursively copy the subdirectory
				await copyDir( srcPath, destPath )
			
			} else {

				// Copy the file
				await fs.promises.copyFile( srcPath, destPath )
			
			}
		
		}

		console.log( `📁 Directory copied from ${src} to ${dest}` )
	
	} catch ( error ) {

		throw `📁 Error copying directory: ${error.message}`
	
	}

}

export const existPath = async pathToCheck => {

	try {

		const stats = await fs.promises.stat( pathToCheck )
		if( stats ) return true
		return false
	
	} catch ( error ) {

		if ( error.code === 'ENOENT' ) {

			return false
		
		} else {

			throw error
		
		}
	
	}

}
export const removePathIfExist = async path => {

	try {

		// Check if the path exists
		const stats = await stat( path )
		
		if ( stats.isDirectory() ) {

			// If it's a directory, delete it recursively
			await rm( path, {
				recursive : true, 
				force     : true,
			} )
			console.log( `Directory ${path} successfully deleted.` )
		
		} else if( stats.isFile() ){

			// If it's a file, delete it
			await unlink( path )
			console.log( `File ${path} successfully deleted.` )
		
		}
	
	} catch ( error ) {

		if ( error.code === 'ENOENT' ) {

			console.log( `The directory or file ${path} does not exist.` )
			return
		
		} else {

			console.error( `Error deleting ${path}:`, error )
		
		}
	
	}

}
export const createDir = async dirPath => {

	try {

		await fs.promises.mkdir( dirPath, {
			recursive : true, 
		} )
		console.log( `Directory created: ${dirPath}` )
	
	} catch ( error ) {

		if ( error.code === 'EEXIST' ) {

			console.log( `The directory already exists: ${dirPath}` )
		
		} else {

			console.error( 'Error creating the directory:', error )
		
		}
	
	}

}
export const readJSON =  async projectPath => JSON.parse( fs.readFileSync( projectPath ) )
export const pkgFunct = fileName => {

	const json = projectPath => JSON.parse( fs.readFileSync( projectPath ) )

	let projectPath = path.join(
		path.dirname( fileURLToPath( import.meta.url ) ),
		'..', '..', 
	)

	// when is used in the compilated files of 'dist' folder
	if ( projectPath.includes( 'dist' ) || projectPath.includes( 'build' ) ) projectPath = path.join( projectPath, '..' )

	const pkgPath = path.join( projectPath, fileName + '.json' )
	const pkgData = json( pkgPath )

	return {
		path : pkgPath,
		dir  : projectPath,
		data : pkgData,
	}

}

export const pkg = pkgFunct( 'package' )

export const writeSync = ( projectPath, txt ) => {

	const filePath = path.join( pkg.dir, projectPath )

	console.log()

	console.group( `🐢 writeFileSync: ${filePath}` )
		
	fs.writeFileSync( filePath, txt )

	console.log( '✅ File overwritten!' )

	console.groupEnd()

}
export const joinPath = path.join
export const joinUrl = ( ...parts ) => {

	// Eliminar barras inclinadas adicionales al principio y al final de cada parte
	parts = parts.map( part => part.replace( /^\/+|\/+$/g, '' ) )
	// Unir las partes con una barra inclinada entre ellas
	return parts.join( '/' )

}

export const addTextBetweenAMark = async ( projectPath, startMarker, endMarker, textToAdd ) => {

	try {

		const filePath    = path.join( pkg.dir, projectPath )
		const fileContent = await fs.promises.readFile( filePath, 'utf-8' )
		const startIndex  = fileContent.indexOf( startMarker )
		const endIndex    = fileContent.indexOf( endMarker )

		// Check if both start and end markers exist
		if ( startIndex !== -1 && endIndex !== -1 ) {

			// Start and end markers found, adding text between them
			console.log( 'Markers found, adding text...' )
			const newTextContent = `${fileContent.substring( 0, startIndex + startMarker.length )}\n${textToAdd}\n${fileContent.substring( endIndex )}`
            
			console.log()
			console.group( `🐢 Writing: ${filePath}` )
			// Write the modified content back to the file
			await fs.promises.writeFile( filePath, newTextContent )
			console.log( '✅ File overwritten!' )
			console.groupEnd()
		
		} else {

			// Start or end markers not found
			console.log( 'Markers not found in the file.' )
		
		}
	
	} catch ( error ) {

		// Error handling
		console.error( 'Error:', error )
	
	}

}
