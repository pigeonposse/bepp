import { Route }      from '../../../_shared/route'
import { id }         from '../../_shared/types'
import { ConvertGet } from './main'

const route = new Route( {
	path : 'get',
	msg  : {
		error400 : 'Error getting conveted extensions',
	},
} )
const get   = new ConvertGet()

route.add( 
	{
		method      : 'get',
		path        : '/{id}',
		summary     : 'Get converted Zip extensions by passing ID',
		description : 'Get the converted Zip extensions by passing the corresponding ID created in the conversion process',
		request     : {
			params : get.schema.params,
		},
		responses : {
			200 : {
				content : {
					'application/zip' : {
						schema : get.schema.response,
					},
				},
				description : 'Successfull request',
			},
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	// @ts-ignore: Unreachable code error
	async c => {

		try {

			const data = c.req.valid( 'param' )

			const res = await get.execute( data )

			return new Response( res.buffer, {
				status  : 200,
				headers : {
					'Content-Type'        : 'application/zip',
					'Content-Disposition' : `attachment; filename=${res.filename}`,
				},
			} )
	
		} catch ( e ) {

			if( get.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)

route.add( 
	{
		method    : 'get',
		path      : '/',
		summary   : 'Get all converted extensions IDS',
		responses : {
			200 : route.response.responseJSONSuccess( get.schema.getIds.response ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	async c => {

		try {

			const res = await get.getIds( )

			return route.response.addSuccessResponse( c, res ) 
	
		} catch ( e ) {

			if( get.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)
export default route
