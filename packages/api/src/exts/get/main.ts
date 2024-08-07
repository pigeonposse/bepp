import { GetUrl }                   from './url/main'
import { GetLocal }                 from './local/main'
import { ExtensionManifest }        from '../_shared/manifest/main'
import type {
	ExtsGetParams, ExtsGetResponse, 
} from './types'
import {
	errorID, GetError, 
} from './error'
import type { ApiSuper } from '_shared/main'
import * as schema       from './schema'
import * as consts       from './const'

export class GetExtension implements ApiSuper {

	const
	schema 
	errorID
	Error = GetError

	#man 
	#fromLocal 
	#fromUrl

	constructor(){

		this.#man       = new ExtensionManifest()
		this.#fromLocal = new GetLocal( {
			manifest : this.#man, 
		} )
		this.#fromUrl   = new GetUrl( {
			manifest : this.#man, 
		} )

		this.const   = {
			...this.#man.const,
			...consts,
		}
		this.schema  = {
			man : this.#man.schema,
			...schema,
		}
		this.errorID = {
			...errorID,
		}
	
	}
	
	async get( { value, from }: ExtsGetParams ): Promise<ExtsGetResponse>{

		// console.log( value )
		try{

			if( !value ) throw new this.Error( this.errorID.NO_EXIST_VALUE_PARAM ) 
			if( !from ) throw new this.Error( this.errorID.NO_EXIST_FROM_PARAM ) 
			
			if( from === this.const.getTypes.local ) {
				
				const res = await this.#fromLocal.get( value )
				
				return {
					title           : res.name,
					iconURL         : res.icon?.base64 || undefined,
					manifestVersion : res.manifestVersion,
					type            : res.type,
					browsersAllowed : this.#man.getAllowedBrowsers( res.type, res.manifestVersion ),
					from,
					files           : res.files,
					data            : {
						path : res.folder,
					},
				}
			
			}
			else if ( from === this.const.getTypes.url ){

				const id    = value.id
				const store = value.store
				const title = value.title || id
				// console.log( {
				// 	downloadURL : value.downloadURL,
				// 	extensionId : id, 
				// 	store       : store,
				// } )
				const res = await this.#fromUrl.get( {
					downloadURL : value.downloadURL,
					extensionId : id, 
					store       : store,
				} )

				const type = store === this.const.extensionStoreId.mozilla ? 
					this.const.extensionType.firefox : 
					this.const.extensionType.chromium

				return {
					title           : title || res.name,
					iconURL         : res.icon?.base64 || undefined,
					manifestVersion : res.manifestVersion,
					type            : type,
					browsersAllowed : this.#man.getAllowedBrowsers( type, res.manifestVersion ),
					from,
					files           : res.files,
					data            : {
						url   : value.url,
						store : store,
					},
				}
			
			}else
				throw new this.Error( this.errorID.FROM_PARAM_INVALID ) 
		
		}catch( e ){

			if( this.Error.isInstanceOf( e ) ) throw e
			else throw new this.Error( this.errorID.UNIDENTIFIED, e )

		}
	
	}

}
