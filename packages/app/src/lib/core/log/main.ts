/**
 * Log.
 *
 * @description Log.
 */
export class Log {

	#stringifyRes( data: unknown ): string{

		return typeof data == 'string' ? data : JSON.stringify( data )
	
	}
	#setError( e: unknown ){

		if ( !( typeof e === 'object' && e !== null && 'data' in e ) ) return e

		if ( typeof e.data === 'string' ) return e
				
		if ( 
			typeof e.data === 'object' && e.data !== null && (
				'message' in e.data && typeof e.data.message === 'string' 
			)
		) {

			e.data = {
				stack   : 'stack' in e && typeof e.stack == 'string' ? e.stack.split( '\n' ).map( line => line.trim() ) : '',
				message : e.data.message,
			}
			return e
				
		}
		return 'No error displayed'
	
	}
	
	/**
	 * Logs a trace message.
	 *
	 * @description                Provides the most details about the internal workings of the application. It is used to trace the execution flow and view minute details such as function inputs and outputs, parameters, etc.
	 * @param       {unknown} data - The data to log. Can be a string or any other type.
	 */
	async trace( data: unknown ){

		if( !window?.__TAURI__?.log?.trace ) console.trace( data )
		else await window.__TAURI__.log.trace( this.#stringifyRes( data ) )
	
	}

	/**
	 * Logs an informational message.
	 *
	 * @param {unknown} data - The data to log. Can be a string or any other type.
	 */
	async info( data: unknown ){

		if( !window?.__TAURI__?.log?.info ) console.log( data )
		else await window.__TAURI__.log.info( this.#stringifyRes( data ) )
	
	}

	/**
	 * Logs an error message.
	 *
	 * @param {unknown} data - The data to log. Can be a string or any other type.
	 */
	async error( data: unknown ){

		if( !window?.__TAURI__?.log?.error ) console.error( data )
		else await window.__TAURI__.log.error( this.#stringifyRes( this.#setError( data ) ) )
	
	}

}
