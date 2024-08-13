import type { System }        from '$lib/core/system/main'
import type { Window as Win } from '$lib/core/window/main'
import type { Store }         from '$lib/core/store/main'
import { ApiError }           from './error'
import type { t }             from '$lib/core/i18n/main'

export type ApiArgs = ApiInterface 
export type ApiInterface = {
	system: System
	window: Win
	store: Store
	t: typeof t
}

export class ApiSuper<IDS extends Uppercase<string>> implements ApiInterface{

	system
	window
	store
	t
	// errors
	error
	Error
	
	readonly urlDefaultPort = 13129

	url = {
		protocol : 'http',
		domain   : 'localhost',
		port     : this.urlDefaultPort,
	}
	proxyUrl = false

	constructor( args: ApiArgs ){

		this.system = args.system
		this.store  = args.store
		this.window = args.window
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

	async fetch ( 
		...args: Parameters<typeof window.__TAURI__.http.fetch > 
	){
	
		if ( window.__TAURI__?.http?.fetch ) return window.__TAURI__.http.fetch( ...args )
		return fetch( ...args )
	
	}

}
