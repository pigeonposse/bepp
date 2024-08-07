import { ApiError } from '../../../_shared/error'

export const errorID = {
	LOCAL_NO_FILE_TYPE  : 'LOCAL_NO_FILE_TYPE',
	LOCAL_IN_VALIDATION : 'LOCAL_IN_VALIDATION',
} as const

type ErrorID = typeof errorID[keyof typeof errorID]

export class GetLocalError extends ApiError<ErrorID> {}

