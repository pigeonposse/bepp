import { WebFacts } from './main'
import { Route }    from '../_shared/route'

const id       = 'facts'
const route    = new Route( {
	path : id,
	msg  : {
		error400 : 'Error getting Random fact',
	},
} )
const webFacts = new WebFacts() 

route.add( 
	{
		method  : 'get',
		path    : '/random',
		summary : 'Get Random fact',
		request : {
			query : webFacts.schema.random.params,
		},
		responses : {
			200 : route.response.responseJSONSuccess( webFacts.schema.random.response ),
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

			const res = await webFacts.getRandom( data )
			return route.response.addSuccessResponse( c, res ) 
	
		} catch ( e ) {

			if( webFacts.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)

route.add( 
	{
		method  : 'get',
		path    : '/all',
		summary : 'Get all facts',
		request : {
			query : webFacts.schema.all.params,
		},
		responses : {
			200 : route.response.responseJSONSuccess( webFacts.schema.all.response ),
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

			const res = await webFacts.getAll( data )
			return route.response.addSuccessResponse( c, res ) 
	
		} catch ( e ) {

			if( webFacts.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)
export default route
