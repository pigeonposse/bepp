type WriteFileParams = {
	path: string | URL
	data: string
	type: 'text' 
} | {
	path: string | URL
	data: object
	type: 'json'
} | {
	path: string | URL
	data: Uint8Array
	type: 'bin'
} | {
	path: string | URL
	data: Buffer
	type: 'buffer'
}
export class Fs {

	isSupported(){

		try {

			return window?.__TAURI__?.fs && window?.__TAURI__?.path ? true : false
		
		}catch( e ){

			return false
		
		}
	
	}

	async writeFile( { path, data, type = 'text' }: WriteFileParams ) {

		if( !this.isSupported() ) return
		if( type === 'text' && typeof data === 'string' ) return await window.__TAURI__.fs.writeTextFile( path, data )
		else if ( type === 'json' && typeof data === 'object' ) return await window.__TAURI__.fs.writeTextFile( path, JSON.stringify( data ) )
		else if ( type === 'bin' && data instanceof Uint8Array ) return await window.__TAURI__.fs.writeFile( path, data )
		else if ( type === 'buffer' && data instanceof Buffer ) return await window.__TAURI__.fs.writeFile( path, data )
		return
	
	}
	async getDir( ...args: Parameters<typeof window.__TAURI__.path.dirname> ){

		if( !this.isSupported() ) return
		return await window.__TAURI__.path.dirname( ...args )
	
	} 
	async joinPath( ...args: Parameters<typeof window.__TAURI__.path.join> ){

		if( !this.isSupported() ) return
		return await window.__TAURI__.path.join( ...args )
	
	}
	
	async existDir( path: string | URL ) {

		if ( !this.isSupported() ) return false
		try {

			const exists = await window.__TAURI__.fs.exists( path )
			return exists
		
		} catch ( e ) {

			return false
		
		}
	
	}

	async createDir( path: string | URL, recursive: boolean = false ) {

		if ( !this.isSupported() ) return
		try {

			await window.__TAURI__.fs.mkdir( path, {
				recursive, 
			} )
		
		} catch ( e ) {

			console.error( `Failed to create directory: ${e}` )
		
		}
	
	}

}
