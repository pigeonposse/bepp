import type { Validate } from '../../../_shared/validate'
import type {
	chromeWebstoreResponse,
	queryResponse,
	queryResponseValue,
	response,
	urlResponse, 
} from './schema'

// chrome store
export type ChromewebstoreResponseValue = Validate.infer<typeof queryResponse>
export type ChromewebstoreResponse = Validate.infer<typeof chromeWebstoreResponse>

// res
export type ChromeStoreUrlResponse = Validate.infer<typeof urlResponse>
export type ChromeStoreQueryResponseValue = Validate.infer<typeof queryResponseValue>
export type ChromeStoreQueryResponse = Validate.infer<typeof queryResponse>
export type ChromeStoreResponse = Validate.infer<typeof response>
