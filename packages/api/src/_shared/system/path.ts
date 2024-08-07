import { SystemSuper } from './super'

export class Path extends SystemSuper {

	#access: typeof import( 'node:fs/promises' ).access | undefined
	#join: typeof import( 'node:path' ).join | undefined
	#dirname: typeof import( 'node:path' ).dirname | undefined

	constructor(){

		super()
		if( this.isNode ) {

			const init = async () => {

				const { access }        = await import( 'node:fs/promises' )
				const { join, dirname } = await import( 'node:path' )
				this.#access            = access
				this.#join              = join
				this.#dirname           = dirname
			
			}
			init()
		
		}
	
	}

	async exists( path:string ): Promise<boolean>{

		if ( !this.#access ) throw new Error( 'Unsupported environment in existsPath function' )

		try {

			await this.#access( path )
			return true

		} catch ( err ) {

			return false

		}
	
	}
	async join( ...args: Parameters<typeof import( 'node:path' ).join> ){

		if ( !this.#join ) throw new Error( 'Unsupported environment in existsPath function' )

		return await this.#join( ...args )
	
	}
	
	async getDirName( ...args: Parameters<typeof import( 'node:path' ).dirname> ){

		if ( !this.#dirname ) throw new Error( 'Unsupported environment in getDirName function' )

		return await this.#dirname( ...args )
	
	}

}
