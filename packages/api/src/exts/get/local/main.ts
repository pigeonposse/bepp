
import type { ApiSuper }          from '../../../_shared/main'
import { System }                 from '../../../_shared/system/main'
import type { ExtensionManifest } from '../../_shared/manifest/main'
import {
	GetLocalError, errorID, 
} from './error'
import type {
	ExtsGetLocalParams, ExtsGetLocalResponse, 
} from './types'
import * as schema from './schema'

export class GetLocal implements ApiSuper {

	const = {}
	schema = schema
	errorID = errorID
	Error = GetLocalError

	#system = new System()
	#man: ExtensionManifest

	constructor( { manifest }: {manifest: ExtensionManifest} ){

		this.#man = manifest
	
	}
	async get( data: ExtsGetLocalParams ): Promise<ExtsGetLocalResponse> {

		try {

			if ( !( data.fileName.endsWith( '.zip' ) && data.fileType === 'application/zip' ) ) throw new this.Error( this.errorID.LOCAL_NO_FILE_TYPE )
				
			const name     = data.fileName.replace( '.zip', '' )
			const buffer   = Buffer.from( data.fileBase64Data, 'base64' )
			const zipFiles = await this.#system.fs.getZipObject( buffer )

			return await this.#man.get( zipFiles.files, name )
		
		}catch( e ){

			if( this.Error.isInstanceOf( e ) ) throw e
			else throw new this.Error( this.errorID.LOCAL_IN_VALIDATION, e )
			
		}

	}

	// old get function
	// async get( files: ExtsGetLocalParams ): Promise<ExtsGetLocalResponse> {

	// 	try {

	// 		const isFile     = 'type' in files // equivalent to: files instanceof File
	// 		const isFileList = typeof window !== 'undefined' && files instanceof window.FileList && files.length === 0
	// 		const isValid    = isFile || isFileList

	// 		// console.log( 'validate', {
	// 		// 	files,
	// 		// 	isFile,
	// 		// 	isFileList,
	// 		// 	isValid,
	// 		// } )

	// 		if ( !isValid ) throw new this.Error( this.errorID.noFile )

	// 		const file = isFile ? files : files[0]

	// 		if ( !( file.name.endsWith( '.zip' ) && file.type === 'application/zip' ) ) throw new this.Error( this.errorID.noFileType )
				
	// 		const name     = file.name.replace( '.zip', '' )
	// 		const zipFiles = await this.#system.fs.getZipObject( file )

	// 		return await this.#man.get( zipFiles.files, name )
		
	// 	}catch( e ){

	// 		if( this.Error.isInstanceOf( e ) ) throw e
	// 		else throw new this.Error( this.errorID.inValidation, e )
			
	// 	}

	// }

}
