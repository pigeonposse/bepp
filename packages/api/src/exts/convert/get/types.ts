
import type { Validate }   from '../../../_shared/validate'
import type { ConvertGet } from './main'

export type ExtsConvertGetError = ConvertGet['errorID'][keyof ConvertGet['errorID']]

// GET
export type ExtsConvertGetIdsResponse = Validate.infer<ConvertGet['schema']['getIds']['response']>

// GET:ID
export type ExtsConvertGetParams = Validate.infer<ConvertGet['schema']['params']>
export type ExtsConvertGetResponse = Validate.infer<ConvertGet['schema']['response']>
