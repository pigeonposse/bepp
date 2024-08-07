
import { Route }   from '../../_shared/route'
import { id }      from '../_shared/types'
import { Convert } from './main'
import { stream }  from 'hono/streaming'
import { Process } from '../../_shared/system/process'
import getRoute    from './get/endpoint'

const route = new Route( {
	path : 'convert',
	msg  : {
		error400 : 'Error converting extension',
	},
} )

const convert = new Convert()

route.add( 
	{
		method      : 'post',
		path        : '/',
		summary     : 'Convert extension Data to selected browser extensions',
		description : 'Convert your extension to any browser using BEPP.',
		request     : {
			body : {
				content : {
					'application/json' : {
						schema : convert.schema.params,
					},
				},
			},
		},
		
		responses : {
			200 : route.response.responseStreamSuccess( convert.schema.streamResponse ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [
			id,
		],
	},
	// @ts-ignore
	async c => {

		try {

			const json = c.req.valid( 'json' )
			
			return await stream( c, async stream => {

				const write = async ( data: string | object, success:boolean = true ) =>{

					await stream.writeln( JSON.stringify( {
						success, 
						data,
					} ) )
				
				}

				stream.onAbort( async () => await write( convert.errorID.aborted, false ) )
				// await write( 'START' )
				const unhookStdout = Process.hookStdout( async string =>{

					if ( typeof string === 'object' || typeof string === 'string' ) 
						await write( string )
			
				} )

				const res = await convert.execute( json )
				unhookStdout()

				// await write( 'END' )	
				await write( res )	
	
				await stream.close()
			
			},
			async ( e, stream ) => {

				await stream.writeln( JSON.stringify( route.response.add400ErrorObject( e ) ) )

			} )
		
		} catch ( e ) {

			if( convert.Error.isInstanceOf( e ) ) return route.response.add400Error( c, e )

			return route.response.add500Error( c, e )
	
		}

	}, 
)

route.addRoute( getRoute )
export default route
