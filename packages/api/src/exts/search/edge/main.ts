import { extensionStoreId }        from '../../_shared/manifest/const'
import type { SearchBrowserStore } from '../_super/entity'
import { SuperSearchBrowserStore } from '../_super/use'
import type {
	EdgeStoreQueryRessponse, 
	EdgeStoreQueryRessponseValue, 
	EdgeStoreUrlResponse, 
} from './types'

export class SearchEdgeStore extends SuperSearchBrowserStore implements SearchBrowserStore<
	EdgeStoreQueryRessponse, 
	EdgeStoreUrlResponse
> {

	urls = [
		'https://microsoftedge.microsoft.com/addons/detail',
	]

	#getDownloadUrl( id:string ){

		return `https://edge.microsoft.com/extensionwebstorebase/v1/crx?response=redirect&prod=chromiumcrx&prodchannel=&x=id%3D${id}%26installsource%3Dondemand%26uc`
	
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async #getExtData( addon: any ): Promise<EdgeStoreQueryRessponseValue>{

		const data = {
			url     : 'https://microsoftedge.microsoft.com/addons/detail/' + addon.crxId as string,
			store   : extensionStoreId.edge,
			id      : addon.crxId as string,
			title   : addon.name as string,
			iconURL : addon.thumbnail.startsWith( '//' ) ? 'https:' + addon.thumbnail : addon.thumbnail as string,
			rating  : {
				average : addon.averageRating as string,
			},
			downloadURL : this.#getDownloadUrl( addon.crxId ),
			description : addon.shortDescription as string,
		} 
		return data
	
	}
	
	async getByQuery( value: string ): Promise<EdgeStoreQueryRessponse | undefined> {

		try {

			const resNum   = 10
			const url      = `https://microsoftedge.microsoft.com/addons/v2/getfilteredorderedsearch?filteredCategories=Edge-Extensions&filteredAddon=1&sortBy=Relevance&pgNo=1&Query=${value}`
			const response = await this.fetch( url )
			const addons   = await response.json()
		
			let res: EdgeStoreQueryRessponse | undefined
			
			for ( let index = 0; index < addons.extensionList.length; index++ ) {

				if( resNum === index ) return res
				const addon = addons.extensionList[index]

				const data = await this.#getExtData( addon ) 

				if( res )
					res.push( data )
				else res = [
					data,
				]
			
			}

			return res
		
		}catch( _e ){

			// console.error( e )
			return undefined

		}
	
	}

	async getById( id:string ): Promise<EdgeStoreQueryRessponseValue | undefined>{

		try {

			const url      = `https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/${id}`
			const response = await this.fetch( url )
			const addon    = await response.json()
			
			const data = await this.#getExtData( addon ) 
			return data
		
		}catch( _e ){

			// console.error( e )
			return undefined

		}
	
	}
	async getByUrl( url: string ): Promise<EdgeStoreUrlResponse | undefined> {

		try {
			
			const validation = this.validateUrl( url )
			if( !validation ) return undefined

			const id = this.extractIdFromUrl( url, [
				/^https:\/\/microsoftedge\.microsoft\.com\/addons\/detail\/([a-z]{32})(?=[\\/#?]|$)/,
				/^https:\/\/microsoftedge\.microsoft\.com\/addons\/detail\/.+?\/([a-z]{32})(?=[\\/#?]|$)/,
			] )

			if( !id ) return undefined

			const data = await this.getById( id )
			if( data ) return data

			const downloadURL =  this.#getDownloadUrl( id )

			return {
				store : extensionStoreId.edge,
				downloadURL,
				title : id,
				id,
				url,
			}
		
		}catch( _e ){

			return undefined
	
		}
	
	}

}
