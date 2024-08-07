import { createRoute } from '@hono/zod-openapi'
import { AppSuper }    from './app'

type RouteParams<Path extends string> = {
	path: Path
	msg?: {
		error400?: string
	}
}
		
/**
 * Add route.
 *
 * @description Add Route.
 * @example https://github.com/BimaAdi/Integrate-hono-with-openapi/blob/main/src/index.ts
 * @example 
 * const route = class Route({
 *   path: 'id'
 * })
 * route.add(
 * 	// configuration
 * )
 * route.create(
 * 	// configuration
 * )
 * console.log(
 * 	route.path, 
 * 	route.validation
 * )
 */
export class Route<Env extends object, Path extends string> extends AppSuper<Env>{

	readonly path 
	add: typeof this.app.openapi
	
	constructor( params: RouteParams<Path> ){

		super()
		if( params.msg?.error400 ) this.error400Msg = params.msg?.error400 
		this.path = params.path
		this.add  = this.app.openapi
	
	}

	create = createRoute

}
