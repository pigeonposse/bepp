import { extensionStoreId } from '../../_shared/manifest/const'
import { validate }         from '../../../_shared/validate'

// Query
export const queryResponseValue = validate.object( {
	store       : validate.literal( extensionStoreId.mozilla ),
	title       : validate.string(),
	id          : validate.string(),
	url         : validate.string(),
	version     : validate.string(),
	categories  : validate.array( validate.string() ),
	description : validate.string(),
	rating      : validate.object( {
		average  : validate.number(),
		url      : validate.string(),
		comments : validate.number(),
	} ),
	authors : validate.array( validate.object( {
		name : validate.string(),
		url  : validate.string(),
	} ) ),
	users       : validate.number(), 
	downloadURL : validate.string(),
	iconURL     : validate.string().optional(),
} )
export const queryResponse = validate.array( queryResponseValue )

// const minimalResponse = validate.object( {
// 	store       : validate.literal( extensionStoreId.mozilla ),
// 	id          : validate.string(),
// 	title       : validate.string(),
// 	url         : validate.string(),
// 	downloadURL : validate.string(),
// } )

// Url
export const urlResponse = queryResponseValue

// All
export const response = validate.union( [
	queryResponseValue,
	urlResponse,
] )
