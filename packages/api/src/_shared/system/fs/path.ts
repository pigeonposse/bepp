import { FsSuper } from './super'

type WriteFileParams = { path: string | URL } & ( 
	{
		data: string
		type: FsSuper['const']['writeType']['base64']
	} | 
	{
		data: string
		type: FsSuper['const']['writeType']['text']
	} | 
	{
		data: object
		type: FsSuper['const']['writeType']['json']
	} | 
	{
		data: Uint8Array
		type: FsSuper['const']['writeType']['bin']
	} 
)

export class FsPath extends FsSuper {

	async writeFile( { 
		path, 
		data, 
		type = this.const.writeType.text, 
	} : WriteFileParams ) {
		
		if ( !this.fsNode ) throw new Error( 'Unsupported environment in writeFile function' )

		const writeType = this.const.writeType
		
		const { writeFile } = this.fsNode
		if ( type === writeType.text && typeof data === 'string' ) 
			return await writeFile( path, data, 'utf8' )
		else if ( type === writeType.json && typeof data === 'object' ) 
			return await writeFile( path, JSON.stringify( data ), 'utf8' )
		else if ( type === writeType.bin && data instanceof Uint8Array ) 
			return await writeFile( path, data )
		else if ( type === writeType.base64 && typeof data === 'string' ) 
			await writeFile( path, data, 'base64' )
	
	}
	/**
	 * Removes a file or directory if it exists.
	 *
	 * @async
	 * @param   {string}        path - The path of the file or directory to remove.
	 * @returns {Promise<void>}
	 * @throws Will throw an error if the environment does not support Node.js file system operations.
	 */
	async rm( path: string ): Promise<void>{

		if ( !this.fsNode ) throw new Error( 'Unsupported environment in writeFile function' )
		
		try {

			const stats = await this.fsNode.stat( path )
			if ( stats.isDirectory() ) 
				await this.fsNode.rm( path, {
					recursive : true, 
				} )
			else if ( stats.isFile() ) await this.fsNode.unlink( path )

		}catch ( error ) {

			if ( error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT' ) {
				// path no exist
			} else throw Error( `Error al eliminar ${path}:` )

		}
	
	}

	async createDir( dir: string ){

		if ( !this.fsNode ) throw new Error( 'Unsupported environment in writeFile function' )
		await this.fsNode.mkdir( dir, {
			recursive : true, 
		} )
	
	}

	/**
	 * Get the names of the top-level subdirectories in a given directory.
	 *
	 * @param   {string}            path - The path to the directory.
	 * @returns {Promise<string[]>}      - A promise that resolves to an array of subdirectory names.
	 */
	async getTopLevelSubdirectories( path: string ) {

		if ( !this.fsNode ) throw new Error( 'Unsupported environment in getTopLevelSubdirectories function' )
	
		const entries = await this.fsNode.readdir( path, {
			withFileTypes : true, 
		} )

		const subdirectories = entries
			.filter( entry => entry.isDirectory() )
			.map( entry => entry.name )

		return subdirectories

	}

	async readFile( path: string ){

		if ( !this.fsNode ) throw new Error( 'Unsupported environment in readFile function' )
		return await this.fsNode.readFile( path )
	
	}
	
	async exists( path: string, options: {force?: 'dir' | 'file'} | undefined = {} ) {

		if ( !this.fsNode ) throw new Error( 'Unsupported environment in exists function' )
		
		try {

			const { force } = options
			const stats     = await this.fsNode.stat( path )

			if ( force === 'file' && stats.isFile() ) return true
			else if ( force === 'dir' && stats.isDirectory() ) return true
			else if ( !force ) return true
		
		} catch ( err ) {

			// @ts-ignore
			if ( err.code === 'ENOENT' ) return false
			else throw err
		
		}

		return false
	
	}

	async convertBase64ToBlobUrl( base64: string, contentType: BlobPropertyBag['type'] = '' ) {

		const byteCharacters = atob( base64 )
		const byteNumbers    = new Array( byteCharacters.length )
		for ( let i = 0; i < byteCharacters.length; i++ ) {

			byteNumbers[i] = byteCharacters.charCodeAt( i )
		
		}
		const byteArray = new Uint8Array( byteNumbers )
		const blob      = new Blob( [
			byteArray,
		], {
			type : contentType, 
		} )
		const blobUrl   = URL.createObjectURL( blob )
		return blobUrl
	
	}

}
