/**
 * FYLESYSTEM.
 *
 * @description File for set fylesystem functions.
 */
import {
	join, resolve, 
}                                                     from 'node:path'
import { homedir }                                          from 'node:os'
import {
	stat, readFile, writeFile, access, constants, mkdir, rm,
}             from 'node:fs/promises'
import type {
	CompressFunct, CompressTypes,
}     from './types'
import {
	compressTypes, compressionExtsTypes, 
} from './types'
import yaml        from 'js-yaml'
import toml        from 'toml'
import compressing from 'compressing'

export class Fs {
    
	join = join
	getAbsolutePath = resolve
    
	validateHomeDir( path: string ){

		let resolvedPath: string = path
		if ( path.startsWith( '~/' ) ) {

			resolvedPath = path.replace( /^~(?=$|\/|\\)/, homedir() )
		
		}
		return this.getAbsolutePath( resolvedPath )
	
	}
	async createImageFromBase64( base64String: string, outputPath: string ) {

		// Extract the content type and base64 data
		// eslint-disable-next-line no-useless-escape
		const matches = base64String.match( /^data:([A-Za-z-+\/]+);base64,(.+)$/ )
		// const contentType = matches[1]
		if ( !matches ) throw Error( 'Invalid base image' )
		const base64Data = matches[2]
	
		// Convert base64 to buffer
		const buffer = Buffer.from( base64Data, 'base64' )
	
		// Write the buffer to a file
		await this.writeFile( outputPath, buffer )

	}
	async isDirectory( path: string ){

		path        = this.validateHomeDir( path )
		const stats = await stat( path )
		return stats.isDirectory()
	
	}

	async existsFile( path: string ) {

		try {

			path = this.validateHomeDir( path )
			await access( path )
			const stats = await stat( path )
			return stats.isFile()
		
		} catch ( error ) {

			// @ts-ignore
			if ( error.code === 'ENOENT' ) {

				return false // File does not exist
			
			} else {

				throw error // Other error occurred
			
			}
		
		}
	
	}

	async existsDir( path: string ) {

		try {

			path = this.validateHomeDir( path )
			await access( path, constants.F_OK )
			const stats = await stat( path )
			return stats.isDirectory() // Retorna true si es un directorio
		
		} catch ( error ) {

			// @ts-ignore
			if ( error.code === 'ENOENT' ) {

				return false // El directorio no existe
			
			} else {

				throw error // Ocurrió otro error
			
			}
		
		}
	
	}

	async existsPath( path: string ) {

		path         = this.validateHomeDir( path )
		const isFile = await this.existsFile( path )
		if ( isFile ) return true
		const isDir = await this.existsDir( path )
		return isDir
	
	}
    
	async writeFile( path: string, content: string | Buffer ) {

		path = this.validateHomeDir( path )
		await writeFile( path, content )
    
	}

	async createDir( path: string ) {

		try {

			path = this.validateHomeDir( path )
			await mkdir( path, {
				recursive : true, 
			} )
		
		} catch ( error ) {

			throw Error( `Error al crear el directorio: ${error}` )
		
		}
	
	}

	async getDataFromJSONFile( path: string ){

		try {

			path                    = this.validateHomeDir( path )
			const fileContentBuffer = await readFile( path )
			const fileContent       = fileContentBuffer.toString( 'utf8' )
			return JSON.parse( fileContent )
		
		} catch ( error ) {

			// @ts-ignore
			throw new Error( `Error reading JSON file ${path}: ${ error.message }` )
		
		}
	
	}

	async getDataFromYAMLFile( path: string ){

		try {

			path                    = this.validateHomeDir( path )
			const fileContentBuffer = await readFile( path )
			const fileContent       = fileContentBuffer.toString( 'utf8' )
			return yaml.load( fileContent )
		
		} catch ( error ) {

			// @ts-ignore
			throw new Error( `Error reading YAML file ${path}: ${ error.message }` )
		
		}
	
	}

	async getDataFromTOMLFile( path: string ){

		try {

			path                    = this.validateHomeDir( path )
			const fileContentBuffer = await readFile( path )
			const fileContent       = fileContentBuffer.toString( 'utf8' )
			return toml.parse( fileContent )
		
		} catch ( error ) {

			// @ts-ignore
			throw new Error( `Error reading TOML file ${path}: ${ error.message }` )
		
		}
	
	}
    
	async getDataFromFile( path: string ) {

		try {

			const exists = await this.existsFile( path )
			if( !exists ) throw Error( 'File does not exists' )

			let data
            
			if ( path.endsWith( '.json' ) ) {

				data = await this.getDataFromJSONFile( path )
			
			} else if ( path.endsWith( '.yaml' ) || path.endsWith( '.yml' ) ) {

				data = await this.getDataFromYAMLFile( path )
			
			}else if ( path.endsWith( '.toml' ) ) {

				data = await this.getDataFromTOMLFile( path )
			
			} else {

				throw new Error( 'Unsupported file format. Expected JSON, YAML or TOML.' )
			
			}
			if ( typeof data !== 'object' || data === null ) {

				throw new Error( 'Data is not an object.' )
			
			}
			return data as object | unknown[]

		} catch ( error ) {

			// @ts-ignore
			throw new Error( `Error reading file ${path}: ${ error.message }` )
		
		}

	}

	getCompressOutputPath( out:string,name: string, f: CompressTypes ){

		return this.join( out, name + compressionExtsTypes[f] )
	
	}

	async removeDirIfExist( path: string ){

		path         = this.validateHomeDir( path )
		const exists = await this.existsDir( path )
		if( exists ) await this.removeDir( path )
	
	}

	async removeDir( path: string ){

		try {

			path = this.validateHomeDir( path )
			await rm( path, {
				recursive : true, 
				force     : true,
			} )
		
		} catch ( error ) {

			// @ts-ignore
			throw new Error( `Error removimg ${path}: ${ error.message }` )
		
		}
	
	}
	async compress( { inputPath, outputPath, outputName, format }: CompressFunct ) {

		try {

			const compressOutputPath = this.getCompressOutputPath( outputPath,outputName, format )
			let opts                 = {
				ignoreBase : true,relativePath : outputName, 
			}
			inputPath                = this.validateHomeDir( inputPath )
			const isDir              = await this.existsDir( inputPath )
			const compressFunct      = isDir ? 'compressDir' : 'compressFile'
			// @ts-ignore
			if( !isDir ) opts = undefined

			if ( format === compressTypes.tar ) {

				await compressing.tar[compressFunct]( inputPath, compressOutputPath, opts )
			
			} else if ( format === compressTypes.tgz ) {

				await compressing.tgz[compressFunct]( inputPath, compressOutputPath, opts )
			
			} else if ( format === compressTypes.gzip ) {

				await compressing.tgz[compressFunct]( inputPath, compressOutputPath, opts )
			
			} else if ( format === compressTypes.zip ) {

				await compressing.zip[compressFunct]( inputPath, compressOutputPath, opts )
			
			} else {

				throw 'Format no supported'
			
			}
		
		}catch ( error ) {

			// @ts-ignore
			throw new Error( `Error in compression ${inputPath}: ${ error.message }` )
		
		}
	
	}

}
