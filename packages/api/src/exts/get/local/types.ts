import type { Validate } from '../../../_shared/validate'
import type {
	params,
	response,
} from './schema'

export type ExtsGetLocalParams= Validate.infer< typeof params>
export type ExtsGetLocalResponse = Validate.infer<typeof response>
