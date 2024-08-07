import { response as manResponse } from '../../_shared/manifest/schema'
import { validate }                from '../../../_shared/validate'

export const params = validate.object( {
	fileName       : validate.string(),
	fileType       : validate.string(),
	fileBase64Data : validate.string(),
} )
export const response = manResponse
