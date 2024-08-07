
import { Fs }          from './fs/main'
import { Os }          from './os'
import { Path }        from './path'
import { SystemSuper } from './super'

/**
 * SYSTEM CLASS.
 */

export class System extends SystemSuper{

	fs = new Fs()
	path = new Path()
	os = new Os()
	
	async getRandomUUID(){

		if ( !this.isNode ) throw new Error( 'Temporary directory retrieval not supported in browser environment.' )
		
		const { randomBytes } = await import( 'node:crypto' )		
		const bytes           = randomBytes( 16 )

		bytes[6] = ( bytes[6] & 0x0f ) | 0x40 
		bytes[8] = ( bytes[8] & 0x3f ) | 0x80 
		
		const hexString = bytes.toString( 'hex' )
		const matches   = hexString.match( /.{1,4}/g )
		if ( !matches ) throw new Error( 'Failed to match hex string' )

		const uuid = matches.join( '-' )
		return uuid
	
	}

}
