import type { ApiError } from './error'
import type { Validate } from './validate'

export type ApiSuper = {
	const: Record<PropertyKey, never> | Record<string, Record<string, string | number>>
	schema: {
		[key in string]: Validate.ZodAny | unknown
	}
	errorID:{
		[key in string]: Uppercase<string>
	}
	Error: typeof ApiError<Uppercase<string>>
}
