import { extensionStoreId }                             from '../../_shared/manifest/const'
import type { SearchBrowserStore }                      from '../_super/entity'
import { SuperSearchBrowserStore }                      from '../_super/use'
import type {
	MozillaStoreQueryResponse, MozillaStoreUrlResponse, 
} from './types'

/**
 *  @see https://mozilla.github.io/addons-server/topics/api/addons.html
 */ 

export class SearchMozillaStore extends SuperSearchBrowserStore implements SearchBrowserStore<
	MozillaStoreQueryResponse,
	MozillaStoreUrlResponse
> {

	urls = [
		'https://addons.mozilla.org/',
	]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#getMozillaAddonData ( addon: any ): MozillaStoreUrlResponse | undefined {

		try {

			const getLocaleValue = ( v: {[key in string]: string} | string, defaultV: string ): string => {

				const defaultLocate = addon.default_locale as string
				if( typeof v === 'string' ) return v
				if( defaultLocate in v ) return v[defaultLocate] as string
				const ov = Object.values( v )
				if( ov.length >= 0 ) return ov[0]
				return defaultV
		
			}

			return {
				title       : getLocaleValue( addon.name, addon.guid ),
				id          : addon.guid,
				url         : addon.url,
				version     : addon.current_version.version,
				categories  : addon.categories,
				description : getLocaleValue( addon.summary, '' ),
				iconURL     : addon.icon_url,
				rating      : {
					average  : addon.ratings.average,
					url      : addon.ratings_url,
					comments : addon.ratings.count,
				},
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				authors : addon.authors.map( ( author: any ) => ( {
					name : author.name,
					url  : author.url,
				} ) ),
				users       : addon.average_daily_users,
				downloadURL : addon.current_version.file.url, // https://addons.mozilla.org/api/v5/addons/addon/${addon.guid}/versions/latest/download/'
				store       : extensionStoreId.mozilla,
			}
		
		}catch( e ){

			// console.log( e )
			return undefined
		
		}
	
	}

	async getByQuery( query: string ): Promise<MozillaStoreQueryResponse | undefined> {

		try {

			const resNum   = 10
			const response = await this.fetch( `https://addons.mozilla.org/api/v5/addons/search/?q=${query}&page_size=${resNum}` )
			const data     = await response.json()

			const res = data.results.map( ( addon: unknown ) => ( this.#getMozillaAddonData( addon ) ) )
			return res as MozillaStoreQueryResponse
		
		}catch( e ){

			console.log( e )
			return undefined
		
		}
	
	}

	async getByUrl( url: string ): Promise<MozillaStoreUrlResponse | undefined> {

		try {

			const validation = this.validateUrl( url )
			if( !validation ) return undefined

			const slug = this.getLastUrlSlug( url )

			// @see https://mozilla.github.io/addons-server/topics/api/addons.html#detail
			const response = await this.fetch( `https://addons.mozilla.org/api/v5/addons/addon/${slug}` )
			const addon    = await response.json()
		
			return this.#getMozillaAddonData( addon )
		
		}catch( e ){

			return undefined
	
		}
	
	}

}
