import type {
	ExtsSearchError , ExtsConvertError, ExtsGetError,
} from '@bepp/api'
import { ERROR as ApiERROR } from '../_shared/error'

export const searchError: {[key in ExtsSearchError]: ExtsSearchError} = {
	UNIDENTIFICATED : 'UNIDENTIFICATED',
}
export const getError: {[key in ExtsGetError]: ExtsGetError} = {
	NO_EXIST_VALUE_PARAM : 'NO_EXIST_VALUE_PARAM',
	NO_EXIST_FROM_PARAM  : 'NO_EXIST_FROM_PARAM',
	FROM_PARAM_INVALID   : 'FROM_PARAM_INVALID',
	UNIDENTIFIED         : 'UNIDENTIFIED',
	// url
	URL_UNIDENTIFIED     : 'URL_UNIDENTIFIED',
	// local
	LOCAL_NO_FILE_TYPE   : 'LOCAL_NO_FILE_TYPE',
	LOCAL_IN_VALIDATION  : 'LOCAL_IN_VALIDATION',
	// man
	MANIFEST_DATA_FAIL   : 'MANIFEST_DATA_FAIL',
	NO_MANIFEST          : 'NO_MANIFEST',
}

export const convertError: {[key in ExtsConvertError]: ExtsConvertError} = {
	OUTPUT_PATH_NO_EXIST : 'OUTPUT_PATH_NO_EXIST',
	INVALID_EXT_DATA     : 'INVALID_EXT_DATA',
	FAILED_EXECUTION     : 'FAILED_EXECUTION',
	INPUT_FILE_NO_EXIST  : 'INPUT_FILE_NO_EXIST',
	ABORTED              : 'ABORTED',
}

export const ERROR = {
	...ApiERROR,
	EXTS_CONVERT       : 'EXTS_CONVERT',
	EXTS_GET           : 'EXTS_GET',
	EXTS_SEARCH        : 'EXTS_SEARCH',
	EXTS_GET_FILE_DATA : 'EXTS_GET_FILE_DATA',
} as const
