import { response as getResponse } from '../get/schema'
import { validate }                from '../../_shared/validate'
import { schemaError400 }          from '../../_shared/response'

export const params = validate.object( {
	data       : getResponse,
	outputPath : validate.string().optional(),
	zip        : validate.boolean().optional(),
	/**
	 * Remove extensionDir or conversionDir if zip is activated.
	 */
	remove     : validate.boolean().optional(),
} )

export const response = validate.object( {
	outputDir     : validate.string(),
	extensionDir  : validate.string().optional(),
	conversionDir : validate.string().optional(),
	filename      : validate.string().optional(),
	serverPath    : validate.string().optional(),
} )

// stream
export const streamResponse = validate.string()
export const streamParsedResponse = validate.object( {
	success : validate.boolean(),
	data    : validate.union( [
		validate.string(),
		response,
		schemaError400,
	] ),
} )
