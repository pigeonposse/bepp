/* eslint-disable @typescript-eslint/no-unused-vars */

import { prettyJSON }           from 'hono/pretty-json'
import { cors as corsFunction } from 'hono/cors'
// import { logger }               from 'hono/logger'

import {
	OpenAPIHono, z, 
} from '@hono/zod-openapi'
import { swaggerUI }    from '@hono/swagger-ui'
import { add404Error }  from './response'
import * as response    from './response'
import type { Route }   from './route'
import type { Context } from 'hono'

export type AppParameters = {
	version: string
	title: string
	description: string

	contact?: {
		url?: string,
		mail?: string
	}
	port?: number
	jsonResponse?: boolean
	cors?: Parameters<typeof corsFunction>[0]
	docs?: {
		path: string
	} 
	msg?: {
		error400?: string
	}
}

export class AppSuper<Env extends object> {

	validation = z
	protected error400Msg = 'Error in validation request'
	// pathID: {[key in string]: {id: string, child: AppSuper<Env>['pathID'] }} = {}
	
	protected app = new OpenAPIHono<Env>( {
		defaultHook : ( res, c ) => {

			if( !res.success ) {

				return response.add400Error( c, {
					id      : this.errorID.validation,
					message : this.error400Msg,
					error   : res.error.issues,
				} )
			
			}
			return res
		
		},
	} )
	
	errorID = {
		pageNotFound   : 'PAGE-NOT-FOUND',
		badRequest     : 'BAD-REQUEST',
		serverFetch    : 'SERVER-FETCH',
		validation     : 'VALIDATION',
		noDocsProvided : 'NO-DOCS-PROVIDED',
	} as const

	response = {
		...response,
		addSuccessResponse : response.addSuccessResponse,
		add500ErrorObject  : response.add500ErrorObject,
		add500Error        : ( c: Context, e: unknown ) =>{

			const data = {
				id    : this.errorID.serverFetch,
				error : e,
			}
			this.logger( JSON.stringify( response.add500ErrorObject( data ) ) )
			return response.add500Error( c, data )
		
		},
		add400ErrorObject : ( e: unknown ) =>{

			return response.add400ErrorObject( {
				id      : e && typeof e == 'object' && 'message' in e ? e.message as string : this.errorID.badRequest,
				message : this.error400Msg,
				error   : e,
			} )
		
		},
		add400Error : ( c: Context, e: unknown ) =>{

			this.logger( JSON.stringify( this.response.add400ErrorObject( e ) ) )
			return response.add400Error( c, this.response.add400ErrorObject( e ) )
			
		},
	}
	
	logger = ( data: string ) => {

		const isJsonString = ( str: string ) =>{

			try {

				JSON.parse( str )
				return true
			
			} catch ( e ) {

				return false
			
			}
		
		}
		const isJSON       = isJsonString( data )
		console.log( isJSON ? JSON.parse( data ) : data )
	
	}

	constructor(){

		// this.app.use( logger( this.logger ) )
		// this.app.use( logger( () => {} ) )
	
	}

	addRoute<R extends Route<Env, string>>( route: R ){

		// this.pathID[route.path] = {
		// 	id    : route.path,
		// 	child : route.pathID,
		// }
		this.app.route( route.path, route.app )
	
	}
	
	addComponent<T extends Parameters<typeof this.app.openAPIRegistry.registerComponent>[0]>( 
		type: T,
		name: string,
		component: Parameters<typeof this.app.openAPIRegistry.registerComponent<T>>[2], 
	){

		return this.app.openAPIRegistry.registerComponent<T>( type, name, component )
	
	}

	getPaths(){
	
		const uniquePaths = new Set(
			this.app.all().routes
				.filter( d => d.path && !d.path.endsWith( '*' ) )
				.map( d => d.path ),
		)
		
		return Array.from( uniquePaths )
	
	}
	// @ts-ignore
	// addComponent = <T extends Parameters<typeof this.app.openAPIRegistry.registerComponent>[0]>( ...v: Parameters<typeof this.app.openAPIRegistry.registerComponent> ) => this.app.openAPIRegistry.registerComponent<T>( ...v )

}

export class App<Env extends object> extends AppSuper<Env>{

	port = 80
	version = ''
	title = ''
	description = ''
	#jsonResponse = true
	#docsPath
	#openApiConfig
	fetch

	constructor( { 
		jsonResponse, 
		cors, 
		version, 
		title,
		description, 
		docs,
		port, 
		contact,
		msg,
	}: AppParameters ){

		super()

		if( jsonResponse ) this.#jsonResponse = jsonResponse
		if( port ) this.port = port
		if( version ) this.version = version
		if( title ) this.title = title
		if( description ) this.description = description
		if( this.#jsonResponse ) this.app.use( prettyJSON() )
		if( cors ) this.app.use( '*', corsFunction( cors ) )

		this.#docsPath = docs?.path

		if( this.#docsPath ) {

			const optsJson      = `${this.#docsPath}.json`
			this.#openApiConfig = {
				openapi : '3.0.0',
				info    : {
					version     : this.version,
					title       : this.title,
					description : this.description,
					contact,
				},
			}
			this.app.doc( optsJson, this.#openApiConfig )
		
			this.app.get( this.#docsPath , swaggerUI( {
				url : optsJson, 
			} ) )
		
		}

		this.app.notFound( c => {

			return add404Error( c, {
				id      : this.errorID.pageNotFound,
				message : 'Page not found.',
				help    : `Go to: ${this.getDocUrl( c )}`,
			} )
		
		} )
		
		if( msg?.error400 ) this.error400Msg = msg?.error400 

		this.fetch = this.app.fetch

	}

	getDocUrl( c: Context ){

		const url      = new URL( c.req.url )
		const protocol = url.protocol ? `${url.protocol}//` : ''
		const port     = url.port ? `:${url.port}` : ''
		return this.#docsPath ? `${protocol}${url.hostname}${port}${this.#docsPath }` : `[${this.errorID.noDocsProvided}]`
	
	}

	getOpenApiObject(): ReturnType<typeof this.app.getOpenAPIDocument>{

		// @ts-ignore
		return this.app.getOpenAPIDocument( this.#openApiConfig )
	
	}

}
