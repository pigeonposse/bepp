
import { Path }        from '../path'
import { SystemSuper } from '../super'

export class FsSuper extends SystemSuper {

	protected fsNode: ( 
		{ createWriteStream: typeof import( 'node:fs' ).createWriteStream } &
		typeof import( 'node:fs/promises' ) 
	) | undefined
	#tempDir: string | undefined

	constructor(){

		super()
		if( !this.isNode ) return

		const init = async () => {

			const { createWriteStream } = await import( 'node:fs' )
			const { tmpdir }            = await import( 'node:os' )
			this.fsNode                 = {
				createWriteStream,
				...await import( 'node:fs/promises' ),
			}
			this.#tempDir               = tmpdir()
		
		}
		
		init()
	
	}

	/**
	 * Get Temporaly Directory path.
	 *
	 * @returns {string} - Returns the operating system's default directory for temporary files as a string.
	 */
	async getTempDir(): Promise<string>{

		if ( !this.#tempDir ) throw new Error( 'Temporary directory retrieval not supported in browser environment.' )
		
		return this.#tempDir
	
	}

	protected path = new Path()

}
