
import { validate }         from '../../../_shared/validate'
import { extensionStoreId } from '../../_shared/manifest/const'

// QUERY
export const queryResponseValue = validate.object( {
	store       : validate.literal( extensionStoreId.chrome ),
	title       : validate.string(),
	id          : validate.string(),
	url         : validate.string(),
	category    : validate.string(),
	categoryNo  : validate.string(),
	coverURL    : validate.string(),
	description : validate.string(),
	ifEstablish : validate.string(),
	ifFeatured  : validate.string(),
	rating      : validate.string(),
	reviewCount : validate.string(),
	userCount   : validate.string(),
	downloadURL : validate.string(),
	iconURL     : validate.string().optional(),
} )
export const queryResponse = validate.array( queryResponseValue )

export const chromeWebstoreResponse = validate.object( {
	success : validate.boolean(),
	number  : validate.number(),
	error   : validate.string().optional(),
	data    : queryResponse.optional(),
} )

// URL
export const urlResponse = validate.union( [
	validate.object( {
		store       : validate.literal( extensionStoreId.chrome ),
		id          : validate.string(),
		title       : validate.string(),
		url         : validate.string(),
		downloadURL : validate.string(),
	} ),
	queryResponseValue,
] )

// ALL
export const response = validate.union( [
	queryResponseValue, 
	urlResponse,
] )
