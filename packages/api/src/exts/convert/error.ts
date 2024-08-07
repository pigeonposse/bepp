
import { ApiError } from '../../_shared/error'

export const errorID = {
	outputPathNoExist : 'OUTPUT_PATH_NO_EXIST',
	invalidExtData    : 'INVALID_EXT_DATA',
	failedExecution   : 'FAILED_EXECUTION',
	inputFileNoExist  : 'INPUT_FILE_NO_EXIST',
	aborted           : 'ABORTED',
} as const

export class ConvertError extends ApiError<
	typeof errorID[keyof typeof errorID]
> {

}

