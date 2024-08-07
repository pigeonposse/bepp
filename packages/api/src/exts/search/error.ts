import { ApiError } from '../../_shared/error'

export const errorID = {
	UNIDENTIFICATED : 'UNIDENTIFICATED',
} as const

export class SearchError extends ApiError<
	typeof errorID[keyof typeof errorID]
> {

}

