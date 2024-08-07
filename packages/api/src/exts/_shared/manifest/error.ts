import { ApiError } from '../../../_shared/error'

export const errorID = {
	MANIFEST_DATA_FAIL : 'MANIFEST_DATA_FAIL',
	NO_MANIFEST        : 'NO_MANIFEST',
} as const
type ManifestErrorID = typeof errorID[keyof typeof errorID]

export class ManifestError extends ApiError<ManifestErrorID> {}

