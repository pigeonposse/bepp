import type { System }        from '$lib/core/system/main'
import type { Window as Win } from '$lib/core/window/main'
import type { Store }         from '$lib/core/store/main'
import { ApiError }           from './error'
import type { t }             from '$lib/core/i18n/main'
import type { Log }           from '$lib/core/log/main'
import type { Http }          from '$lib/core/http/main'
import type * as Data         from '$lib/data/main'

export type ApiArgs = ApiInterface 
export type ApiInterface = {
	system: System
	log: Log
	window: Win
	store: Store
	http: Http
	data: typeof Data
	t: typeof t
}

export class ApiSuper<IDS extends Uppercase<string>> implements ApiInterface{

	system
	window
	store
	http
	log
	t
	data
	// errors
	error
	Error
	
	readonly urlDefaultPort = Number( MAIN_PKG.extra.defaultApiPort )

	url = {
		protocol : 'http',
		domain   : 'localhost',
		port     : this.urlDefaultPort,
	}
	proxyUrl = false

	constructor( args: ApiArgs ){

		this.system = args.system
		this.log    = args.log
		this.store  = args.store
		this.http   = args.http
		this.window = args.window
		this.data   = args.data
		this.t      = args.t
		// this.errors = this.store.writable<IDS[]>( [] )
		this.error = this.store.writable<IDS | undefined>( undefined )
		this.Error = ApiError<IDS>
	
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	addError( value: IDS, e?:unknown ){

		// console.log( { 
		// 	id    : value,
		// 	error : e,
		// } )
		this.error.set( value )
	
	}

	getProxyUrl(){

		const url = new URL( `${window.location.origin}/api` )
		if ( url ) return url
	
	}

	getUrl(){

		const url = `${this.url.protocol}://${this.url.domain}:${this.url.port}`
		
		if( this.proxyUrl ) return this.getProxyUrl() || url

		return url
	
	}

	getUrlPath( { paths, queries, customUrl }: {
		paths?: string[], 
		queries?: { [key: string]: string },
		customUrl?: string
	} ): string | undefined {

		const url = new URL( customUrl || this.getUrl() )
	
		if ( !url ) return undefined

		if( paths )
			paths.forEach( path => {

				url.pathname += url.pathname.endsWith( '/' ) ? path : `/${path}`
		
			} )
		
		if ( queries ) 
			Object.keys( queries ).forEach( key => {

				url.searchParams.append( key, queries[key] )
			
			} )

		return url.toString()
	
	}

}
