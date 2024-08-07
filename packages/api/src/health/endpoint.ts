
import { Route } from '../_shared/route'

const id    = 'health'
const route = new Route( {
	path : id,
	msg  : {
		error400 : 'Error in health check.',
	},
} )

route.add( 
	{
		method      : 'get',
		path        : '/',
		summary     : 'Check api health status',
		description : 'Check if your API goes into trouble.',
		responses   : {
			200 : route.response.responseJSONSuccess( route.validation.object( {
				ok   : route.validation.literal( true ),
				bepp : route.validation.literal( true ),
			} ) ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	async c => {

		try {

			return route.response.addSuccessResponse( c, {
				ok   : true as const,
				bepp : true as const,
			} ) 
	
		} catch ( e ) {

			return route.response.add500Error( c, e )
	
		}

	}, 
)
export default route
