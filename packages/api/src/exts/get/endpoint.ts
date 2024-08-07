
import { Route }        from '../../_shared/route'
import { id }           from '../_shared/types'
import { GetExtension } from './main'

const route   = new Route( {
	path : 'get',
	msg  : {
		error400 : 'Error retriving extension data.',
	},
} )
const extData = new GetExtension()
route.add( 
	{
		method      : 'post',
		path        : '/',
		summary     : 'Get extension Data from URL or from local File',
		description : 'Get extension Data from URL or from local File',
		request     : {
			body : {
				description : '...',
				content     : {
					'application/json' : {
						schema : extData.schema.params,
					},
					
				},
			},
		},
		responses : {
			200 : route.response.responseJSONSuccess( extData.schema.response ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	async c => {

		try {

			const data = c.req.valid( 'json' )
		
			const res = await extData.get( data )
	
			return route.response.addSuccessResponse( c, res ) 
	
		} catch ( e ) {

			if( extData.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)
export default route
