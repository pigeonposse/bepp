import { GetLocal }          from './main'
import { Route }             from '../../../_shared/route'
import { id }                from '../../_shared/types'
import { ExtensionManifest } from '../../_shared/manifest/main'

const route  = new Route( {
	path : 'upload',
	msg  : {
		error400 : 'Error getting extension data from File or FileList Object',
	},
} )
const upload = new GetLocal( {
	manifest : new ExtensionManifest(),
} )
route.add( 
	route.create( {
		method      : 'post',
		path        : '/',
		description : 'Get extension data from File or FileList Object',
		request     : {
			body : {
				description : 'File or FileList Object to upload. 🔴 At the moment must be only a zip file.',
				content     : {
					'application/json' : {
						schema : upload.schema.params,
					},
					
				},
			} ,
		},
		responses : {
			200 : route.response.responseJSONSuccess( upload.schema.response ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	} ),
	async c => {

		try {

			const data = c.req.valid( 'json' )

			const res = await upload.get( data )

			return route.response.addSuccessResponse( c, res ) 
	
		} catch ( e ) {

			if( upload.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)

export default route
