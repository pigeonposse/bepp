import type {
	ExtsConvertParams,
	ExtsConvertResponse,
	ExtsConvertStremParsedResponse,
	ExtsGetParams, 
	ExtsGetResponse, 
	ExtsSearchParams, 
	ExtsSearchResponse, 
} from '@bepp/api'
import { ExtensionStore } from './store'

export class Extension extends ExtensionStore{

	recoveryExtension = this._setExtStore()
	extension = this._setExtStore()
	getting = this._setProcessStore()
	conversion = this._setProcessStore()

	browsers: ExtsGetResponse['browsersAllowed'] = {
		firefox      : false,
		safari       : false,
		opera        : false,
		'opera-gx'   : false,
		brave        : false,
		chrome       : false,
		'chrome-mv2' : false,
		edge         : false,
		'edge-mv2'   : false,
		yandex       : false,
		'yandex-mv2' : false,
	}

	/**
	 * Output path to add the extensions converted with BEPP.
	 */
	outputPath: string | undefined

	async search( { value }: ExtsSearchParams ): Promise<ExtsSearchResponse | undefined> {

		try{
	
			const url = this.getUrlPath( {
				paths : [
					'exts',
					'search',
				],
				queries : {
					value,
				},
			} )
			if( !url ) throw new this.Error( this.ERROR.SERVER_URL_FAIL )
			const res = await this.fetch( url ) 
			if( !res.ok ) throw new Error( this.ERROR.SERVER_FETCH_NOT_OK )
			const data = await res.json()
			return data
		
		}catch( e ){

			// @ts-ignore
			if( this.Error.isInstanceOf( e ) ) this.addError( e.message, e )
			else this.addError( this.ERROR.EXTS_SEARCH, e )
			return undefined
	
		}
	
	}
	async getFileData( files: FileList | File ){

		try{

			const setFileData = async ( file: File ) => {

				return new Promise<{
					fileName : string
					fileType : string
					fileBase64Data : string
				}>( ( resolve, reject ) => {

					const reader = new FileReader()

					reader.onloadend = () => {

						if( 
							!reader.result || 
							reader.result === null || 
							typeof reader.result !== 'string' 
						) return reject( new Error( 'Error reading file' ) )
					
						resolve( {
							fileName       : file.name,
							fileType       : file.type,
							fileBase64Data : reader.result.split( ',' )[1],
						} )
				
					}

					reader.onerror = () => reject( new Error( 'Error reading file' ) )

					reader.readAsDataURL( file )
			
				} )
		
			}
		
			const data = await setFileData( files instanceof FileList ? files[0] : files )
			return data
		
		}catch( e ){

			this.addError( this.ERROR.EXTS_GET_FILE_DATA, e )
			return
		
		}
	
	}
	
	async get( args: ExtsGetParams ){

		this.getting.change( {
			loading : true,
		} )

		try{

			if( this.extension ) {

				this.recoveryExtension.set( this.extension.get() )
				this.extension.set( undefined )
			
			}
			
			const url = this.getUrlPath( {
				paths : [
					'exts',
					'get',
				],
			} )
	
			if( !url ) throw new this.Error( this.ERROR.SERVER_URL_FAIL )
			
			const bodyData = {
				value : args.value,
				from  : args.from,
			}
			
			// console.log( {
			// 	bodyData,
			// 	url, 
			// 	isWindow : window ? true : false,
			// } )
			
			const res = await this.fetch( url, {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json',
				},
				body : JSON.stringify( bodyData ),
			} ) 

			if( !res.ok ) {

				const data = await res.json()
				// console.log( data )
				if( data ){

					this.getting.change( {
						error : {
							id    : data.id,
							error : data.error,
						},
					} )
				
				}
				// console.log( res )
				throw Error( this.ERROR.SERVER_FETCH_NOT_OK )
				// throw new this.Error( this.ERROR.SERVER_FETCH_NOT_OK )
				
			} else {

				const data = await res.json() as ExtsGetResponse

				this.extension.set( data )
				this.getting.change( {
					success : true,
				} )
			
			}
		
		}catch( e ){

			// @ts-ignore
			if( this.Error.isInstanceOf( e ) ) this.addError( e.message, e )
			else this.addError( this.ERROR.EXTS_GET, e )

			// console.log( this.recoveryExtension.get() )
			this.extension.set( this.recoveryExtension.get() )
			// console.log( this.extension.get() )
			this.getting.change( {
				success : false,
			} )
		
		}finally{

			this.getting.change( {
				loading : false,
			} )
		
		}
	
	}
	async #setOutputTauriPath( serverUrl: string ){

		const t          = this.store.get( this.t )
		const outputPath = await this.system.dialog.saveOn( {
			title                : t( 'home.convert.dialogSave' ),
			defaultPath          : 'bepp-conversion.zip',
			canCreateDirectories : true,
			filters              : [
				{
					name       : 'zips',
					extensions : [
						'zip',
					],
				},
			],
		} )

		if( !outputPath && outputPath == null ) return
		const response = await this.fetch( serverUrl )

		if ( !response.ok ) throw new this.Error( this.ERROR.SERVER_FETCH_NOT_OK )
		const arrayBuffer = await response.arrayBuffer()
		const uint8Array  = new Uint8Array( arrayBuffer )
		
		await this.system.fs.writeFile( {
			path : outputPath,
			data : uint8Array, 
			type : 'bin',
		} )
		const dir = await this.system.fs.getDir( outputPath )
		if( dir ) await this.system.shell.open( dir )
	
	}

	async openOutputPath(){

		// console.log( this.outputPath )
		if( !this.outputPath ) return
		if( this.window.isTauri() ) await this.#setOutputTauriPath( this.outputPath )
		else await this.system.shell.open( this.outputPath )
	
	}
	
	// TODO Fix abort function
	#abortConvert: AbortController | undefined = undefined
	
	async convert( ){

		// console.log( this.#abortConvert )
		this.conversion.reset()
		this.#abortConvert = new AbortController()
		const signal       = this.#abortConvert.signal

		try{

			this.conversion.change( {
				loading : true,
			} )

			// await this.#setOutputPath()
			
			const ext = this.extension.get()
			if( !ext ) throw new Error( 'Extension does not exist' )
			
			const browsersAllowed = this.extension.selectedBrowsers.get()
			const data            = !browsersAllowed ? ext : {
				...ext,
				browsersAllowed,
			}
			
			const args: ExtsConvertParams = {
				data,
				outputPath : undefined,
			}

			const url = this.getUrlPath( {
				paths : [
					'exts',
					'convert',
				],
			} )
			
			if( !url ) throw new this.Error( this.ERROR.SERVER_URL_FAIL )

			// force window fetch becuase tauri does not accept stream at the moment
			const res = await window.fetch( url, {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json',
				},
				body : JSON.stringify( args ),
				signal,
			} ) 
			
			if( !res.ok || !res.body ) throw new this.Error( this.ERROR.SERVER_FETCH_NOT_OK )
			const reader = res.body.pipeThrough( new TextDecoderStream() ).getReader()
				
			let reading = true
			while ( reading ) {
	
				const { value, done } = await reader.read()
				
				if ( done ) {
	
					reading          = false
					const lastString = this.conversion.log.getLast()
					let last
					
					try {

						last = JSON.parse( lastString ) as ExtsConvertStremParsedResponse as {
							success: boolean
							data: ExtsConvertResponse
						}
					
					}catch( e ){

						last = lastString
					
					}
					
					console.log( {
						last,
						value,
						log : this.conversion.log.get(),
					} )

					if( typeof last == 'object' && last.success && last.data.filename )
						this.outputPath = this.getUrlPath( {
							paths : [
								'exts',
								'convert',
								'get',
								last.data.filename,
							],
						} )
	
					this.conversion.change( {
						success : typeof last == 'object' && last.success ? last.success : false,
					} )

					return
				
				}else if( value ) this.conversion.log.add( value )
			
			}
		
		}catch( e ){

			if ( typeof e == 'object' && e !== null && 'name' in e && e.name === 'AbortError' ) {

				console.log( 'Conversion aborted' )
				this.abortConvert()	
			
			} else {

				this.conversion.change( {
					success : false,
				} )

				// @ts-ignore
				if( this.Error.isInstanceOf( e ) ) this.addError( e.message, e )
				else this.addError( this.ERROR.EXTS_CONVERT, e )

				this.abortConvert()		
			
			}			
		
		}finally{

			this.conversion.change( {
				loading : false,
			} )
		
		}
	
	}

	abortConvert() {

		if ( this.#abortConvert ) {

			this.#abortConvert.abort()
			this.#abortConvert = undefined
		
		}
	
	}

}
