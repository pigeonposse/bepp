import { extensionStoreId }       from '../../_shared/manifest/const'
import { fetchFunct }             from '../../../_shared/fetch'
import { System }                 from '../../../_shared/system/main'
import type { ExtensionManifest } from '../../_shared/manifest/main'
import type { ExtensionStoreId }  from '../../_shared/manifest/types'
import * as schema                from './schema'
import {
	GetUrlError, errorID, 
} from './error'
import type {
	ExtsGetUrlParams, ExtsGetUrlResponse, 
} from './types'

type GetUrlOBJParams = {[key in ExtensionStoreId]: {
	URL_PATTERN: string
	headers: RequestInit & {
		'User-Agent' : string,
		'Referer'? : string,
	}
}}

const GetUrlParams: GetUrlOBJParams = {
	[extensionStoreId.mozilla] : {
		URL_PATTERN : 'https://addons.mozilla.org/firefox/downloads/file/[EXTENSION_ID]/[EXTENSION_NAME].xpi',
		headers     : {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
			'Referer'    : 'https://addons.mozilla.org/',
		},
	},
	[extensionStoreId.chrome] : {
		URL_PATTERN : 'https://update.googleapis.com/service/update2/crx?response=redirect&acceptformat=crx3&prodversion=38.0&testsource=GetUrl-crx&x=id%3D[EXTENSION_ID]%26installsource%3Dondemand%26uc',
		headers     : {
			'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
			'Referer'    : 'https://chrome.google.com',
		},
	},
	[extensionStoreId.edge] : {
		URL_PATTERN : 'https://edge.microsoft.com/extensionwebstorebase/v1/crx?response=redirect&prod=chromiumcrx&prodchannel=&x=id%3D[EXTENSION_ID]%26installsource%3Dondemand%26uc',
		// URL_PATTERN : 'https://edge.microsoft.com/extensionwebstorebaseurl/api/extension/getbyid?product=Microsoft%20Edge&version=1.0&extensionid=[EXTENSION_ID]',
		headers     : {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36 Edg/89.0.774.63',
			'Referer'    : 'https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions-Home',
		},
	},
}

export class GetUrl {

	const = {}
	schema = schema
	errorID = errorID
	Error = GetUrlError

	#man: ExtensionManifest
	#system = new System()

	constructor( { manifest }: {manifest: ExtensionManifest} ){

		this.#man = manifest
	
	}

	async get( { extensionId, store, downloadURL }: ExtsGetUrlParams ): Promise<ExtsGetUrlResponse>{
	
		try {
			
			const params   = GetUrlParams[store]
			const url      = downloadURL ? downloadURL : params.URL_PATTERN.replace( '[EXTENSION_ID]', extensionId )
			const response = await fetchFunct( url, params.headers )
			
			if ( !response.ok ) throw new Error( `HTTP error! Status: ${response.status}` )
	
			const blob        = await response.blob()
			const arrayBuffer = await blob.arrayBuffer()
			const zipData     = await this.#system.fs.getZipObject( arrayBuffer )
			const res         = await this.#man.get( zipData.files, zipData.name )
			return res
		
		} catch ( e ) {

			// console.log( e )
			if( this.Error.isInstanceOf( e ) ) throw e
			else throw new this.Error( this.errorID.URL_UNIDENTIFIED, e )
		
		}
	
	}

}
