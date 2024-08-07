import { fetchFunct } from '../../../_shared/fetch'

export class SuperSearchBrowserStore {

	urls: string[] = []

	protected validateUrl( v: string ) {

		for ( const url of this.urls ) {

			if ( v.startsWith( url ) ) return true
		
		}
		return false
	
	}
	protected getLastUrlSlug( url:string ){

		// Remove query parameters and fragments
		url = url.split( '?' )[0].split( '#' )[0]
		// Ensure the URL does not end with a slash
		url = url.endsWith( '/' ) ? url.slice( 0, -1 ) : url
		// Get the last segment
		const slug = url.split( '/' ).pop()
		return slug
	
	}
	/**
	 * Extracts an ID from a URL using an array of regular expressions.
	 *
	 * @param   {string}             url      - The URL to be matched against the regular expressions.
	 * @param   {RegExp[]}           patterns - An array of regular expressions to match the URL against.
	 * @returns {string | undefined}          - The extracted ID if a match is found, otherwise undefined.
	 */
	protected extractIdFromUrl( url: string, patterns: RegExp[] ): string | undefined {

		for ( const pattern of patterns ) {

			const match = url.match( pattern )
			if ( match && match[1] ) return match[1]
		
		}
		return undefined
	
	}
	protected fetch = fetchFunct

}
