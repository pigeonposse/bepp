import { errorID as errorIDMan }   from '../_shared/manifest/error'
import { errorID as errorIDLocal } from './local/error'
import { errorID as errorIDUrl }   from './url/error'
import { ApiError }                from '../../_shared/error'

export const errorID = {
	NO_EXIST_VALUE_PARAM : 'NO_EXIST_VALUE_PARAM',
	NO_EXIST_FROM_PARAM  : 'NO_EXIST_FROM_PARAM',
	FROM_PARAM_INVALID   : 'FROM_PARAM_INVALID',
	UNIDENTIFIED         : 'UNIDENTIFIED',
	...errorIDMan,
	...errorIDLocal,
	...errorIDUrl,
} as const

export class GetError extends ApiError<
	typeof errorID[keyof typeof errorID]
> {

}

