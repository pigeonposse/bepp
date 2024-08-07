import { extensionStoreId } from '../../_shared/manifest/const'
import { validate }         from '../../../_shared/validate'

// QUERY
export const queryResponseValue = validate.object( {
	store       : validate.literal( extensionStoreId.edge ),
	id          : validate.string(),
	url         : validate.string(),
	downloadURL : validate.string(),
	title       : validate.string(),
	iconURL     : validate.string(),
	rating      : validate.object( {
		average : validate.string(),
	} ),
	description : validate.string(),
} )

// URL
export const urlResponse = validate.union( [
	validate.object( {
		store       : validate.literal( extensionStoreId.edge ),
		id          : validate.string(),
		title       : validate.string(),
		url         : validate.string(),
		downloadURL : validate.string(),
	} ),
	queryResponseValue, 
] )

export const queryResponse = validate.array( queryResponseValue )

// ALL
export const response = validate.union( [
	queryResponseValue, 
	urlResponse,
] )

