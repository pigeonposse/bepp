import type { ApiSuper }                  from '_shared/main'
import { SearchChromeStore }              from './chrome/main'
import { SearchEdgeStore }                from './edge/main'
import { SearchMozillaStore }             from './mozilla/main'
import type {
	ExtsSearchParams, ExtsSearchResponse, 
} from './types'
import * as schema        from './schema'
import {
	errorID, SearchError, 
} from './error'

const chrome  = new SearchChromeStore()
const mozilla = new SearchMozillaStore()
const edge    = new SearchEdgeStore()

export class Search implements ApiSuper {

	const = {}
	schema = schema
	errorID = errorID
	Error = SearchError

	/**
	 * Fetches results from various sources based on the input value.
	 *
	 * @async
	 * @param   {ExtsSearchParams} args - The arguments for get th exts data.
	 * @returns {Promise<Array>}        - A promise that resolves to an array of results.
	 */
	async get( { value }: ExtsSearchParams ): Promise<ExtsSearchResponse> {

		try{

			if( typeof value !== 'string' || value === '' ) return []
			
			const getBy   = value.startsWith( 'https://' ) ? 'getByUrl' : 'getByQuery'
			const sources = [
				chrome, edge, mozilla,
			]
			const results = await Promise.all( sources.map( source => source[getBy]( value ) ) )

			const uniqueResults = new Set(
				results
					.filter( result => result && typeof result === 'object' && result !== null )
					.flat(), 
			)

			const resArray =  Array.from( uniqueResults ).filter( item => item !== undefined )

			return resArray
		
		}catch( e ){
	
			if( this.Error.isInstanceOf( e ) ) throw e
			else throw new this.Error( this.errorID.UNIDENTIFICATED, e )
	
		}
	
	}

}
