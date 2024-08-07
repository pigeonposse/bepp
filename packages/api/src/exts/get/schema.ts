import { responseValue as searchResponseValue } from '../search/schema'
import { params as localParams }                from './local/schema'
import { validate }                             from '../../_shared/validate'
import { getTypes }                             from './const'
import {
	extensionBrowserIdSchema,
	extensionManVersionSchema, 
	extensionStoreIdSchema, 
	extensionTypeSchema, 
} from '../_shared/manifest/schema'

export const params = validate.union( [
	validate.object( {
		value : localParams,
		from  : validate.literal( getTypes.local ),
	} ),
	validate.object( {
		value : searchResponseValue,
		from  : validate.literal( getTypes.url ),
	} ),
] )

const getExtensionReturnedDataGeneralSchema = validate.object( {
	title           : validate.string(),
	manifestVersion : extensionManVersionSchema,
	type            : extensionTypeSchema,
	browsersAllowed : validate.record( extensionBrowserIdSchema, validate.boolean() ),
	files           : validate.string(),
	iconURL         : validate.string().optional(),
} )
const getExtensionReturnedDataLocalSchema   = getExtensionReturnedDataGeneralSchema.extend( {
	from : validate.literal( getTypes.local ),
	data : validate.object( {
		path : validate.string().optional(),
	} ),
} )
const getExtensionReturnedDataUrlSchema     = getExtensionReturnedDataGeneralSchema.extend( {
	from : validate.literal( getTypes.url ),
	data : validate.object( {
		store : extensionStoreIdSchema,
		url   : validate.string(),
	} ),
} )
export const response = validate.union( [
	getExtensionReturnedDataLocalSchema,
	getExtensionReturnedDataUrlSchema, 
] )

