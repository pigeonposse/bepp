import type { Validate } from '_shared/validate'
import type {
	queryResponse, 
	queryResponseValue, 
	response, 
	urlResponse, 
} from './schema'

export type MozillaStoreQueryResponseValue = Validate.infer<typeof queryResponseValue>
export type MozillaStoreQueryResponse = Validate.infer<typeof queryResponse>
export type MozillaStoreUrlResponse = Validate.infer<typeof urlResponse>
export type MozillaStoreResponse = Validate.infer<typeof response>

