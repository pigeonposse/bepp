import { validate }                    from '../../_shared/validate'
import { response as mozillaResponse } from './mozilla/schema'
import { response as edgeResponse }    from './edge/schema'
import { response as chromeResponse }  from './chrome/schema'

export const params = validate.object( {
	value : validate.string()
		.describe( 'Add value to search' ),
} ) 
export const responseValue = validate.union( [
	mozillaResponse,
	edgeResponse,
	chromeResponse,
] )
export const response = validate.array( responseValue )
