import type { errorID }  from './error'
import type { Validate } from '../../_shared/validate'
import type {
	params, 
	response,
	streamParsedResponse,
	streamResponse, 
} from './schema'

export type ExtsConvertStremResponse = Validate.infer<typeof streamResponse>
export type ExtsConvertStremParsedResponse = Validate.infer<typeof streamParsedResponse>
export type ExtsConvertError = typeof errorID[keyof typeof errorID]
export type ExtsConvertParams = Validate.infer<typeof params>
export type ExtsConvertResponse = Validate.infer<typeof response>
