import {
	extensionStoreIdSchema, 
	response as manResponse, 
} from '../../_shared/manifest/schema'
import { validate } from '../../../_shared/validate'

export const params = validate.object( {
	extensionId : validate.string(),
	store       : extensionStoreIdSchema,
	downloadURL : validate.string().optional(),
} )
export const response = manResponse
