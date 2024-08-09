
import { validate }       from '../../_shared/validate'
import type { ApiSuper }  from '../../_shared/main'
import { ApiError }       from '../../_shared/error'
import type {
	ExtsDownloadParams,
	ExtsDownloadResponse, 
} from './types'

export class Download implements ApiSuper{

	const = {}
	schema = {
		params : validate.object( {
			downloadPath : validate.string().optional(),
		} ),
		response : validate.object( {
			ok           : validate.literal( true ),
			downloadPath : validate.string().optional(),
		} ),
	}
	errorID = {
		unidentified : 'UNIDENTIFIED',
	} as const
	Error = class GetError extends ApiError<typeof this.errorID[keyof typeof this.errorID]> {}

	async execute( args: ExtsDownloadParams ): Promise<ExtsDownloadResponse>{

		try {

			if( args.downloadPath )
				return {
					ok           : true as const,
					downloadPath : args.downloadPath,
				}
			
			throw new this.Error( this.errorID.unidentified )	
		
		}catch( _e ){

			throw new this.Error( this.errorID.unidentified )	
		
		}
	
	}

}
