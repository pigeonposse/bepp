import type { Validate } from '_shared/validate'
import type {
	queryResponse,
	queryResponseValue,
	response,
	urlResponse, 
} from './schema'

export type EdgeStoreQueryRessponseValue = Validate.infer<typeof queryResponseValue>
export type EdgeStoreQueryRessponse = Validate.infer<typeof queryResponse>
export type EdgeStoreUrlResponse = Validate.infer<typeof urlResponse>
export type EdgeStoreResponse = Validate.infer<typeof response>
