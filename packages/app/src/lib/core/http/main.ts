export class Http {

	/**
	 * Performs an HTTP request using Tauri's HTTP client if available; otherwise, it falls back to the native `fetch` API.
	 *
	 * This method can handle various types of HTTP requests (e.g., GET, POST) and allows for detailed configuration via its parameters.
	 * For more information about the parameters and usage of Tauri's HTTP client, refer to the [Tauri HTTP plugin documentation](https://v2.tauri.app/plugin/http-client/).
	 * [Tauri HTTP plugin permissions](https://v2.tauri.app/plugin/http-client/#permission-table).
	 *
	 * @param   {Parameters<typeof window.__TAURI__.http.fetch >} args - The parameters to pass to the HTTP request. These are the same parameters accepted by both Tauri's HTTP client and the native `fetch` API.
	 * @returns {Promise<Response>}                                    - A Promise that resolves with the response of the HTTP request. The response is an object that follows the same structure as the response from the native `fetch` API.
	 */
	async fetch ( 
		...args: Parameters<typeof window.__TAURI__.http.fetch > 
	){

		// console.log( 'Que es fetched', args )
		if ( window.__TAURI__?.http?.fetch ) return window.__TAURI__.http.fetch( ...args )
		return fetch( ...args )
	
	}

}
