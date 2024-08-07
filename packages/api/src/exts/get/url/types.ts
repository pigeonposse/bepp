import type { Validate } from '../../../_shared/validate'
import type {
	params, response, 
} from './schema'
export type ExtsGetUrlParams = Validate.infer<typeof params>
export type ExtsGetUrlResponse = Validate.infer<typeof response>
