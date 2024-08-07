import type { ApiSuper }    from '../../_shared/main'
import { System }           from '../../_shared/system/main'
import { buildAllBrowsers } from '@bepp/core'
import {
	ConvertError, errorID, 
} from './error'
import * as schema                          from './schema'
import type { ExtensionBrowserId }          from '../_shared/manifest/types'
import { ExtensionManifest }                from '../_shared/manifest/main'
import type {
	ExtsConvertParams, ExtsConvertResponse, 
} from './types'
import { paths } from './_shared/const'

type browserConfig = Parameters<typeof buildAllBrowsers>[0]
export class Convert implements ApiSuper {

	const
	schema 
	errorID
	Error = ConvertError

	#outputPathName = paths.outputFolderName
	#inputPathName = paths.extInputName
	#folderId = paths.apiTempFolderName
	#prefixFolder = paths.prefixFolder
	#filename: string | undefined

	man = new ExtensionManifest()

	constructor(){
		
		this.const   = {
			...this.man.const,
			...{},
		}
		this.schema  = {
			...this.man.schema,
			...schema,
		}
		this.errorID = {
			...this.man.errorID,
			...errorID,
		}
	
	}

	#system = new System()

	async #setExtensionInput( { data, outputPath }: ExtsConvertParams ){

		let outputDir: string

		if( outputPath ) outputDir = outputPath
		else {

			this.#filename = await this.#system.getRandomUUID()
			outputDir      = await this.#system.path.join( 
				await this.#system.fs.getTempDir(),
				this.#folderId,
				this.#prefixFolder + this.#filename, 
			)
			await this.#system.fs.createDir( outputDir )
		
		}
			
		const exist = await this.#system.path.exists( outputDir )
		if( !exist ) throw new this.Error( this.errorID.outputPathNoExist )
		
		const extensionDir = await this.#system.path.join( 
			outputDir, 
			this.#inputPathName,
		)

		if( !extensionDir ) throw new this.Error( this.errorID.inputFileNoExist )

		await this.#system.fs.unzipFileFromBase64( data.files, extensionDir )
		
		const path = 'path' in data.data && typeof data.data.path === 'string' ? 
			await this.#system.path.join( extensionDir, data.data.path ) : 
			extensionDir
		
		const conversionDir  = await this.#system.path.join( outputDir, this.#outputPathName )
		const existConverted = await this.#system.path.exists( conversionDir )
		if( !existConverted ) await this.#system.fs.createDir( conversionDir )
		
		return {
			outputDir,
			conversionDir,
			extensionDir : path,
		}
	
	}
	
	async #getConfig( args : ExtsConvertParams, inputFile: string, outputPath: string ): Promise<browserConfig>{

		const browsersAllowed = args.data.browsersAllowed

		// @ts-ignore
		const browserConfigs: browserConfig = {}
		for ( const browsersAllowedKey in browsersAllowed ) {

			const bValue = browsersAllowed[browsersAllowedKey as ExtensionBrowserId]
			if( bValue ) {

				browserConfigs[browsersAllowedKey as ExtensionBrowserId] = {
					input   : inputFile,
					id      : args.data.title,
					output  : outputPath,
					time    : true,
					verbose : false,
				}
			
			}
		
		}

		return browserConfigs
		
	}

	async #build( config: browserConfig ){

		return new Promise( ( resolve, reject ) => {

			try {
				
				buildAllBrowsers( config )
					.then( response => resolve( response ) )
					.catch( error => reject( error ) )
			
			} catch ( error ) {

				reject( error )
			
			}
		
		} )
	
	}
	
	async execute( args : ExtsConvertParams ): Promise<ExtsConvertResponse>{

		try {

			if( !args.data ) throw new this.Error( this.errorID.invalidExtData )

			const { extensionDir,conversionDir, outputDir } = await this.#setExtensionInput( args )

			const config = await this.#getConfig( args, extensionDir, conversionDir )
			await this.#build( config )

			const res: ExtsConvertResponse = {
				outputDir,
				extensionDir,
				conversionDir,
			}
			
			const isZip = args.zip || !args.outputPath
			if( isZip ){

				res.filename            = this.#filename
				res.serverPath          = '/exts/convert/get/' + this.#filename
				const conversionZipPath = await this.#system.path.join( outputDir, this.#outputPathName + '.zip' )
				await this.#system.fs.createZipFromDirectory( conversionDir, conversionZipPath )
			
			}

			if( args.remove ){

				await this.#system.fs.rm( extensionDir )
				res.extensionDir = undefined
				
				if( isZip ) {

					await this.#system.fs.rm( conversionDir )
					res.conversionDir = undefined
				
				}
			
			}	

			return res
		
		}catch( e ){

			if( this.Error.isInstanceOf( e ) ) throw e
			throw new this.Error( this.errorID.failedExecution, e )
		
		}
	
	}

}
