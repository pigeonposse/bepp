import type {
	FactsRandomResponse, FactsRandomParams, 
} from '@bepp/api'
import { ApiSuper } from '../_shared/super'
import { ERROR }    from './error'

export class WebFacts extends ApiSuper<typeof ERROR[keyof typeof ERROR]>{

	ERROR = ERROR
	async getRandom( { lang }: FactsRandomParams ): Promise<FactsRandomResponse | undefined> {

		try {

			const url = this.getUrlPath( {
				paths : [
					'facts',
					'random',
				],
				queries : {
					lang,
				},
			} )

			if( !url ) throw new this.Error( this.ERROR.SERVER_URL_FAIL )
			const res = await this.fetch( url ) 

			if( !res.ok ) throw new this.Error( this.ERROR.SERVER_FETCH_NOT_OK )
			const data = await res.json()
			
			return data
		
		}catch( e ){

			// @ts-ignore
			if( this.Error.isInstanceOf( e ) ) this.addError( e.message, e )
			else this.addError( this.ERROR.FACTS_RANDOM, e )
			return undefined
		
		}
	
	}

}
