export class ApiError<IDS extends Uppercase<string>> extends Error {

	details

	static isInstanceOf( value: unknown ){

		return value instanceof ApiError
	
	}

	constructor( id: IDS, details?: unknown ) {

		super( id )
		this.details = details
		// Set the prototype explicitly.
		Object.setPrototypeOf( this, ApiError.prototype )
	
	}

}
export const ERROR = {
	SERVER_URL_FAIL     : 'SERVER_URL_FAIL',
	SERVER_FETCH_NOT_OK : 'SERVER_FETCH_NOT_OK',
} as const

export type ApiGeneralErrors =typeof ERROR[keyof typeof ERROR]
