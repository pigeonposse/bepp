import { zipFilesSchema }                from '../../../_shared/system/fs/zip'
import {
	createLiteralObjectValues, validate, 
} from '../../../_shared/validate'
import {
	extensionBrowserId,
	extensionType, extensionStoreId,
	extensionManVersion, 
} from './const'

export const extensionTypeSchema = createLiteralObjectValues( extensionType )
export const extensionBrowserIdSchema = createLiteralObjectValues( extensionBrowserId )
export const extensionStoreIdSchema = createLiteralObjectValues( extensionStoreId )
export const extensionManVersionSchema = createLiteralObjectValues( extensionManVersion )

export const generalResponse = validate.object( {
	manifest : validate.object( {} ),//.passthrough(), 
	files    : zipFilesSchema,
	folder   : validate.string().optional(),
} )
  
export const response = generalResponse.extend( {
	manifestVersion : extensionManVersionSchema,
	type            : extensionTypeSchema,
	name            : validate.string(),
	files           : validate.string(), // is base64
	icon            : validate.object( {
		zipPath : validate.string(),
		base64  : validate.string(),
		url     : validate.string(),
	} ).optional(),
} )
