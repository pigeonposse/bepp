import {
	ApiSuper, type ApiInterface, 
} from './_shared/super'
import { Extension } from './exts/main'
import { WebFacts }  from './facts/main'

const ERROR = {
	START_SERVER : 'START_SERVER',
} as const
type ApiGeneralError = typeof ERROR[keyof typeof ERROR]

export type ApiError = 
	WebFacts['ERROR'][keyof WebFacts['ERROR']] |	
	Extension['ERROR'][keyof Extension['ERROR']] |
	ApiGeneralError

export class Api extends ApiSuper<ApiError>{

	facts
	extension
	ERROR
	onError
	apiGeneralError

	constructor( args: ApiInterface ){

		super( args )

		this.facts           = new WebFacts( args )
		this.extension       = new Extension( args )
		this.ERROR           = {
			...this.facts.ERROR,
			...this.extension.ERROR,
			...ERROR,
		}
		this.apiGeneralError = this.store.writable<ApiGeneralError | undefined>( undefined )
		this.onError         = this.store.derived( [
			this.apiGeneralError,
			this.facts.error,
			this.extension.error,
		], ( [
			$apiGeneralError,
			$factErr,
			$extErr,
		] ) => {

			// console.log( {
			// 	$apiGeneralError, $factErr, $extErr,
			// } )
			
			if( $factErr ){

				this.addError( $factErr )
				
				return true
			
			}
			else if( $extErr ) {

				this.addError( $extErr )
				return true
				
				// @ts-ignore
			
			}else if( $apiGeneralError ){

				this.addError( $apiGeneralError )
				return true
			
			}
			this.error.set( undefined )
			return true
		
		} )
	
	}
	#sleep( ms:number ) {

		return new Promise( resolve => setTimeout( resolve, ms ) )

	}

	async #validateServer(){

		try {

			const url = this.getUrlPath( {
				paths : [
					'health',
				],
			} )

			if( !url ) return false
			const res = await this.http.fetch( url ) 
			if( !res.ok ) return false
			const data = await res.json()
			// console.log( {
			// 	data, url,
			// } )
			return data.ok && data.bepp ? true : false
		
		}catch( _e ){

			return false
		
		}
	
	}

	async #validateProxy(){

		this.proxyUrl           = true 
		this.facts.proxyUrl     = true 
		this.extension.proxyUrl = true
		const isValid           = await this.#validateServer()
		if( isValid ) return true 
		this.proxyUrl           = false 
		this.facts.proxyUrl     = false 
		this.extension.proxyUrl = false
		return false 
	
	}

	async #existsServerOnRange(){

		const maxAttempts   = 10
		const portIncrement = 1
		let portNumber      = this.facts.urlDefaultPort

		const isProxyUrl = await this.#validateProxy()
		if( isProxyUrl ) return true 

		for ( let attempt = 1; attempt <= maxAttempts; attempt++ ) {

			this.url.port           = portNumber 
			this.facts.url.port     = portNumber 
			this.extension.url.port = portNumber
			
			const isValid = await this.#validateServer()
			if( isValid ) return true 
			portNumber += portIncrement
		
		}

		return false

	}

	async #invoke( { port }: {port: number} ){

		return await new Promise<boolean>( ( resolve, reject ) => {

			return this.system.shell.execute( {
				program : this.data.appBin.beppServer,
				args    : [
					`--port=${port}`,
				],
				on : async v => {

					this.log.trace( {
						id   : this.data.logID.serverData,
						data : v,
					} )

					if ( v.type === 'error' ) reject( false ) 
					if ( v.type === 'close' ) resolve( true )
				
				},
			} ).catch( e => {
				
				this.log.error( {
					id   : this.data.logID.serverError,
					data : e,
				} )
				reject( false ) 
			
			} )
		
		} )
	
	}

	async init(){

		try {
			
			const existServer = await this.#existsServerOnRange()
			const isTauri     = await this.window.isTauri()
			if( !existServer && isTauri ){

				const invokeServer = await this.#invoke( {
					port : this.facts.urlDefaultPort,
				} )
				this.log.trace( {
					id   : this.data.logID.serverInvoke,
					data : {
						port : this.facts.urlDefaultPort,
						res  : invokeServer,
					},
				} )

				await this.#sleep( 5000 )
				const existInvokeServer = await this.#existsServerOnRange()
				if( !existInvokeServer ) throw Error( 'Server invoke not found' )
			
			}else if( !existServer ) throw Error( 'Server not found' )
		
		}catch( _e ){

			// console.log( e )
			this.apiGeneralError.set( this.ERROR.START_SERVER )
			return false
	
		}
	
	}

}
