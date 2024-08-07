import { ApiError } from '../_shared/error'

export const errorID = {
	/**
	 * Error ID displayed when Lang does not exist.
	 */
	LANG_ID_NO_EXIST : 'LANG_ID_NO_EXIST',
	/**
	 * Error ID displayed when facts for specific lang are empty.
	 */
	EMPTY_FACTS      : 'EMPTY_FACTS',
} as const

type FactsErrorID = typeof errorID[keyof typeof errorID]

export class FactsError extends ApiError<FactsErrorID> {}

