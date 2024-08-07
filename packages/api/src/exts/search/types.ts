import type { errorID }  from './error'
import type { Validate } from '../../_shared/validate'
import type {
	response,
	responseValue,
	params, 
} from './schema'

export type ExtsSearchError = typeof errorID[keyof typeof errorID]
export type ExtsSearchParams = Validate.infer<typeof params>
export type ExtsSearchResponseValue = Validate.infer<typeof responseValue>
export type ExtsSearchResponse = Validate.infer<typeof response>
