import type { Validate } from '../../_shared/validate'
import type { Download } from './main'

export type ExtsDownloadError = Download['errorID'][keyof Download['errorID']]
export type ExtsDownloadParams = Validate.infer<Download['schema']['params']>
export type ExtsDownloadResponse = Validate.infer<Download['schema']['response']>
