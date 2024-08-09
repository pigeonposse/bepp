
import { extensionStoreId }        from '../../_shared/manifest/const'
import type { SearchBrowserStore } from '../_super/entity'
import { SuperSearchBrowserStore } from '../_super/use'
import type {
	ChromeStoreUrlResponse,
	ChromeStoreQueryResponse,
} from './types'
import { getChromeWebStoreData } from './webstore'

export class SearchChromeStore extends SuperSearchBrowserStore implements SearchBrowserStore<
	ChromeStoreQueryResponse, 
	ChromeStoreUrlResponse
> {

	urls = [
		'https://chrome.google.com/webstore',
		'https://chromewebstore.google.com/detail',
	]

	#getChromeDownloadUrl( id: string ){

		return `https://update.googleapis.com/service/update2/crx?response=redirect&acceptformat=crx3&prodversion=38.0&testsource=GetUrl-crx&x=id%3D${id}%26installsource%3Dondemand%26uc`
		const getNaclArch = () =>{

			if ( navigator.userAgent.indexOf( 'x86' ) > 0 ) return 'x86-32'
			else if ( navigator.userAgent.indexOf( 'x64' ) > 0 ) return 'x86-64'
			return 'arm'
		
		}
		const getVersion  = () => {
	
			const getChromeVersion = () =>{
		
				const pieces = navigator.userAgent.match( /Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/ )
				if ( !pieces || pieces == null || pieces.length != 5 ) return undefined
				
				const piecesMap = pieces.map( piece => parseInt( piece, 10 ) )
		
				return {
					major : piecesMap[1],
					minor : piecesMap[2],
					build : piecesMap[3],
					patch : piecesMap[4],
				}
			
			}
		
			const currentVersion = getChromeVersion()
			if( !currentVersion ) return ''
			
			return currentVersion.major + '.' + currentVersion.minor + '.' + currentVersion.build + '.' + currentVersion.patch
		
		}
		const version  = getVersion()
		const naclArch = getNaclArch()
		
		return `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${version}&acceptformat=crx2,crx3&x=id%3D${id}%26uc&nacl_arch=${naclArch}`
	
	}

	async getByQuery( value: string ): Promise<ChromeStoreQueryResponse | undefined> {

		try{

			const storeData = await getChromeWebStoreData( value )
			if( !storeData.data ) throw Error
	
			const res = storeData.data.map( data=> {
				
				try {

					const downloadURL = this.#getChromeDownloadUrl( data.id )
					return {
						...data, 
						downloadURL,
					}
				
				}catch( _e ){
	
					return data
				
				}
			
			} ).filter( d => d.downloadURL )
	
			return res
		
		}catch( _e ){
	
			return undefined
		
		}
	
	}

	async getByUrl( url: string ): Promise<ChromeStoreUrlResponse | undefined> {

		try {
			
			const validation = this.validateUrl( url )
			if( !validation ) return undefined

			const chromeURLPattern    = /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\\/#?]|$)/
			const chromeNewURLPattern = /^https?:\/\/chromewebstore.google.com\/detail\/.+?\/([a-z]{32})(?=[\\/#?]|$)/

			const id = this.extractIdFromUrl( url, [
				chromeURLPattern,
				chromeNewURLPattern,
			] )

			if( !id ) return undefined

			const data = await this.getByQuery( id )
			if( data ) {

				const res = data.filter( d => d.id === id )[0]
				return res
			
			}

			const downloadURL = this.#getChromeDownloadUrl( id )

			return {
				store : extensionStoreId.chrome,
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
