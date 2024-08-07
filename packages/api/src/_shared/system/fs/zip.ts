import JSZip             from 'jszip'
import archiver          from 'archiver'
import type { Validate } from '../../validate'
import { validate }      from '../../validate'
import { FsPath }        from './path'

export const zipFilesSchema = validate.record( validate.custom<JSZip.JSZipObject>( data => data instanceof JSZip, {
	message : 'Must be an instance of JSZip.JSZipObject',
} ) )

export type ZipFiles = Validate.infer<typeof zipFilesSchema>

type ZipFilesConversionType = FsZip['const']['zipFilesConversionType'][keyof FsZip['const']['zipFilesConversionType']]

export class FsZip extends FsPath{

	schema = {
		zipFiles : zipFilesSchema,
	}

	async getZipObject( file: File | Blob | ArrayBuffer | Buffer ){

		const isFile = 'type' in file // equivalent to: files instanceof File
		if( isFile ){

			const arrayBuffer = await file.arrayBuffer()
		
			return JSZip.loadAsync( arrayBuffer )
		
		}
		return JSZip.loadAsync( file )
	
	}

	async unzipFileFromBase64( base64: string, outputDir: string ): Promise<void> {

		if ( !this.fsNode ) throw new Error( 'This method is designed to be run in a Node.js environment.' )

		const { mkdir, writeFile } = this.fsNode
		const zip                  = await JSZip.loadAsync( Buffer.from( base64, 'base64' ) )

		for ( const [
			fileName, zipEntry,
		] of Object.entries( zip.files ) ) {

			if ( !zipEntry.name.endsWith( '.DS_Store' ) ) {

				const content    = await zipEntry.async( 'nodebuffer' )
				const outputPath = await this.path.join( outputDir, fileName )
	
				if ( zipEntry.dir ) {

					await mkdir( outputPath, {
						recursive : true, 
					} )
					
				} else {

					await mkdir( await this.path.getDirName( outputPath ), {
						recursive : true, 
					} )
					await writeFile( outputPath, content )
					
				}
				
			}
			
		}
	
	}

	async convertZipFiles<T extends ZipFilesConversionType> ( 
		zipFiles: ZipFiles, 
		type: T, 
	): Promise<T extends 'base64' ? string : Uint8Array>{

		const zip = new JSZip()
    
		for ( const [
			fileName, fileObject,
		] of Object.entries( zipFiles ) ) {

			const fileContent = await this.convertZipFileToArrayBuffer( fileObject )
			zip.file( fileName, fileContent )
		
		}
	
		const result = await zip.generateAsync<typeof type>( {
			type, 
		} )
	
		return result as T extends 'base64' ? string : Uint8Array
	
	}
	async convertBase64toZipObject ( base64String: string ): Promise<ZipFiles> {

		const zip = new JSZip()
		
		// Load the Base64 encoded zip string
		const loadedZip = await zip.loadAsync( base64String, {
			base64 : true, 
		} )
	
		const zipFiles: ZipFiles = {}
	
		// Iterate over the files in the zip and store them in the object
		for ( const [
			fileName, fileObject,
		] of Object.entries( loadedZip.files ) ) {

			zipFiles[fileName] = fileObject
		
		}
	
		return zipFiles
	
	}
	async convertZipFilesToUint8Array ( zipFiles: ZipFiles ): Promise<Uint8Array> {

		console.log( {
			id : 'convertZipFilesToUint8Array',
			zipFiles,
		} )
		const zip = new JSZip()

		// Agregar cada archivo del objeto zipFiles al zip
		for ( const key in zipFiles ) {
	
			const fileContent = await this.convertZipFileToArrayBuffer( zipFiles[key] )
			// const fileContent = zipFiles[key]
			zip.file( key, fileContent )
	
		}

		// Generar el contenido del zip como Uint8Array
		const zipContent = await zip.generateAsync( {
			type : 'uint8array', 
		} )

		return zipContent
		
	}

	async convertZipFileToArrayBuffer( value: JSZip.JSZipObject ){

		return await value.async( 'arraybuffer' ) 
	
	} 

	async convertZipFileToType( 
		value: JSZip.JSZipObject, 
		type: 'text' | 'base64' = 'text', 
	){

		return await value.async( type ) 
	
	}

	async createZipFromDirectory( sourceDir: string, outPath: string ) {

		if ( !this.fsNode || !this.fsNode?.createWriteStream ) throw new Error( 'This method is designed to be run in a Node.js environment.' )

		return new Promise<void>( ( resolve, reject ) => {

			const output = this.fsNode?.createWriteStream( outPath )
			if( !output ) return reject( 'This method is designed to be run in a Node.js environment.' )
			
			const archive = archiver( 'zip', {
				zlib : {
					level : 9, 
				}, 
			} )

			output.on( 'close', () => resolve() )
			output.on( 'end', () => {} )
			archive.on( 'warning', err => {

				if ( err.code !== 'ENOENT' ) reject( err )

			} )

			archive.on( 'error', err => reject( err ) )

			archive.pipe( output )
			archive.directory( sourceDir, false )
			archive.finalize()

		} )

	}

}
