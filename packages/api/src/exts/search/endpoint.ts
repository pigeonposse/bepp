import { Search } from './main'
import { Route }  from '../../_shared/route'
import { id }     from '../_shared/types'
const route  = new Route( {
	path : 'search',
	msg  : {
		error400 : 'Error searching extension Data',
	},
} )
const search = new Search()
route.add( 
	{
		method  : 'get',
		path    : '/',
		summary : 'Get extensions data array from Chrome, Firefox and edge webstores',
		request : {
			query : search.schema.params,
		},
		responses : {
			200 : route.response.responseJSONSuccess( search.schema.response ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	async c => {

		try {

			const data = c.req.valid( 'query' )

			const res = await search.get( data )
			return route.response.addSuccessResponse( c, res || [] ) 
	
		} catch ( e ) {

			if( search.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)
export default route
