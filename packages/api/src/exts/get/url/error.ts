import { ApiError } from '../../../_shared/error'

export const errorID = {
	URL_UNIDENTIFIED : 'URL_UNIDENTIFIED',
} as const

export class GetUrlError extends ApiError<
	typeof errorID[keyof typeof errorID]
> {

}

