import { serve } from '@hono/node-server'
import {
	app, port, 
} from './app'

const startServer = async () => {

	try {

		await new Promise( ( resolve, reject ) => {

			serve( {
				fetch : app.fetch,
				port  : port,
			}, info => {

				console.log( `Listening on http://localhost:${info.port}` )
				// @ts-ignore
				resolve()

			} ).on( 'error', err => {

				// If the port is already in use
				if ( err.code === 'EADDRINUSE' ) {

					reject( new Error( `Port ${port} is already in use. Please choose a different port.` ) )

				} else {

					reject( err )

				}

			} )

		} )

	} catch ( err ) {

		// @ts-ignore
		console.error( err.message )
		process.exit( 1 ) // Exit the process with an error code

	}

}
  
// Start the server
startServer()
