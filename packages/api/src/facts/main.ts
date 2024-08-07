
import type { ApiSuper } from '_shared/main'
import { webFactsData }  from './data'
import {
	FactsError, errorID, 
} from './error'
import * as schema      from './schema'
import * as consts      from './const'
import type {
	FactsAllParams,
	FactsAllResponse,
	FactsRandomParams,
	FactsRandomResponse,
} from './types'

export class WebFacts implements ApiSuper {

	const = consts
	schema = schema
	errorID = errorID
	Error = FactsError
	
	facts = webFactsData

	async getAll( { lang }: FactsAllParams ): Promise<FactsAllResponse> {
		
		if ( !( lang in this.facts ) ) throw new this.Error( this.errorID.LANG_ID_NO_EXIST )

		const factsInLanguage = this.facts[lang]

		if ( factsInLanguage.length === 0 ) throw new this.Error( this.errorID.EMPTY_FACTS )

		return factsInLanguage
	
	}

	async getRandom( { lang }: FactsRandomParams ): Promise<FactsRandomResponse> {
		
		if ( !( lang in this.facts ) ) throw new this.Error( this.errorID.LANG_ID_NO_EXIST )

		const factsInLanguage = this.facts[lang]

		if ( factsInLanguage.length === 0 ) throw new this.Error( this.errorID.EMPTY_FACTS )

		const randomIndex = Math.floor( Math.random() * factsInLanguage.length )
		return factsInLanguage[randomIndex]
	
	}

}
