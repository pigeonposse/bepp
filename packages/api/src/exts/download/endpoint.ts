
import { Route }    from '../../_shared/route'
import { id }       from '../_shared/types'
import { Download } from './main'

const route    = new Route( {
	path : 'download',
	msg  : {
		error400 : 'Error downloading extension data.',
	},
} )
const download = new Download()
route.add( 
	{
		method      : 'get',
		path        : '/',
		summary     : 'Download File or directory from server [COMING SOON]',
		description : 'Use this function only if your backend is separated from your front for download extension ZIP.',
		request     : {
			query : download.schema.params,
		},
		responses : {
			200 : route.response.responseJSONSuccess( download.schema.response ),
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

			const res = await download.execute( data )

			return route.response.addSuccessResponse( c, res ) 
	
		} catch ( e ) {

			if( download.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)
export default route
