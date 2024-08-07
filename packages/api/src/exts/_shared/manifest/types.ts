
import type { Validate } from '../../../_shared/validate'
import type {
	extensionTypeSchema,
	extensionManVersionSchema,
	generalResponse, 
	extensionStoreIdSchema,
	extensionBrowserIdSchema,
	response, 
} from './schema'

export type ExtensionBrowserId = Validate.infer<typeof extensionBrowserIdSchema>
export type ExtensionStoreId = Validate.infer<typeof extensionStoreIdSchema>
export type ExtensionManVersion = Validate.infer<typeof extensionManVersionSchema>
export type ExtensionType = Validate.infer<typeof extensionTypeSchema>
export type ExtsManifestGetGeneralResponse = Validate.infer<typeof generalResponse>
export type ExtsManifestGetResponse = Validate.infer<typeof response>

