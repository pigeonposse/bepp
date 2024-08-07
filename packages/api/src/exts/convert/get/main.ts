import { validate }                                                          from '../../../_shared/validate'
import { ApiError }                                                          from '../../../_shared/error'
import * as consts                                                           from '../_shared/const'
import type { ApiSuper }                                                     from '../../../_shared/main'
import { System }                                                            from '../../../_shared/system/main'
import type {
	ExtsConvertGetIdsResponse, ExtsConvertGetParams, ExtsConvertGetResponse, 
} from './types'

export class ConvertGet implements ApiSuper {

	const = consts
	schema = {
		getIds : {
			response : validate.array( validate.string() ),
		},
		params : validate.object( {
			id : validate.string(),
		} ),
		response : validate.instanceof( Buffer ),
	}

	errorID = {
		NO_EXTS_ON_THE_SERVER : 'NO_EXTS_ON_THE_SERVER',
		UNIDENTIFIED          : 'UNIDENTIFIED',
	} as const
	
	Error = class GetError extends ApiError<typeof this.errorID[keyof typeof this.errorID]> {}
	
	#system = new System()

	async #getApiFolder (){

		return await this.#system.path.join( 
			await this.#system.fs.getTempDir(),
			this.const.paths.apiTempFolderName,
		)
	
	}
	async #checkApiFolder ( dir: string ){

		const exist = await this.#system.fs.exists( dir, {
			force : 'dir',
		} )
		
		if( !exist ) throw new this.Error( this.errorID.NO_EXTS_ON_THE_SERVER )
	
	}
	async getIds(): Promise<ExtsConvertGetIdsResponse>{

		try {

			const dir = await this.#getApiFolder()
			
			await this.#checkApiFolder( dir )
			
			const dirNames = await this.#system.fs.getTopLevelSubdirectories( dir )
			const res      = dirNames.filter( d => d.startsWith( this.const.paths.prefixFolder ) )
			return res.map( d => d.replace( this.const.paths.prefixFolder,'' ) )
		
		}catch( e ){

			if( this.Error.isInstanceOf( e ) ) throw e
			throw new this.Error( this.errorID.UNIDENTIFIED, e )
		
		}
	
	}

	async execute( params: ExtsConvertGetParams ): Promise<{
		buffer: ExtsConvertGetResponse
		id: string
		filename: string
	}>{

		try {

			const dir = await this.#getApiFolder()
			
			await this.#checkApiFolder( dir )
			const filename = this.const.paths.outputFolderName + '.zip'
			const zip      = await this.#system.path.join( 
				dir,
				this.const.paths.prefixFolder + params.id,
				filename,
			)

			const exists = await this.#system.fs.exists( zip, {
				force : 'file',
			} )
			
			if( !exists ) throw new this.Error( this.errorID.NO_EXTS_ON_THE_SERVER )

			const BUFFER = await this.#system.fs.readFile( zip )

			return {
				buffer : BUFFER,
				id     : zip,
				filename,
			}
		
		}catch( e ){

			if( this.Error.isInstanceOf( e ) ) throw e
			throw new this.Error( this.errorID.UNIDENTIFIED, e )
		
		}
	
	}

}
