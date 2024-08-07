import type { errorID }  from './error'
import type { Validate } from '../../_shared/validate'
import type {
	params, response, 
} from './schema'

export type * from './local/types'
export type * from './url/types'

export type ExtsGetError = typeof errorID[keyof typeof errorID]
export type ExtsGetParams = Validate.infer<typeof params>
export type ExtsGetResponse = Validate.infer<typeof response>
