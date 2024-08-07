
import type { Validate } from '../_shared/validate'
import type {
	all,
	allData,
	langId,
	random, 
} from './schema'
import type { errorID } from './error'

export type FactsError = typeof errorID[keyof typeof errorID]
export type FactsLang = Validate.infer<typeof langId>
export type FactsAllData = Validate.infer<typeof allData>

export type FactsRandomParams = Validate.infer<typeof all.params>
export type FactsRandomResponse = Validate.infer<typeof random.response>
export type FactsAllParams = Validate.infer<typeof all.params>
export type FactsAllResponse = Validate.infer<typeof all.response>
