/* eslint-disable jsdoc/require-jsdoc */

import {
	fetchFunct, imageUrlExist, 
} from '../../../_shared/fetch'
import { extensionStoreId }                              from '../../_shared/manifest/const'
import type {
	ChromewebstoreResponseValue, ChromewebstoreResponse, 
} from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function objectToUrlEncoded( obj: Record<string, any> ): string {

	return Object.keys( obj )
		.map( key => `${encodeURIComponent( key )}=${encodeURIComponent( obj[key] )}` )
		.join( '&' )

}

async function fetchData(
	baseUrl: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	queryParams: Record<string, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	bodyObject: Record<string, any>,
): Promise<string> {

	const queryString = objectToUrlEncoded( queryParams )
	const url         = `${baseUrl}?${queryString}`
	const body        = objectToUrlEncoded( bodyObject )

	try {

		const headers = new Headers()
		headers.append( 'Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8' )
		headers.append( 'Access-Control-Allow-Origin', '*' )

		const response = await fetchFunct( url, {
			method : 'POST',
			mode   : 'cors',
			headers,
			body,
		} )
		
		if ( !response.ok ) throw new Error( `HTTP error! status: ${response.status}` )
		return await response.text()

	} catch ( error ) {

		console.error( 'Error:', error )
		throw error

	}

}

function processData( rawData: string ): string {

	const lines     = rawData.split( '\n' )
	const cleanData = lines[3]?.trim()
	const json      = JSON.parse( cleanData )
	const data      = json[0][2]
	return data

}

interface Pattern {
	name: string;
	regex: RegExp;
}

function parseFields( block: string, patterns: Pattern[] ): ChromewebstoreResponseValue {

	const entries = block
		.replace( /, /g, ' ' )
		.replace( /\[\[/g, '[' )
		.replace( /\]\]/g, ']' )
		.split( '],[' )

	return entries.map( entry => {

		const fields = entry
			.split( ',' )
			.map( field => field.replace( /^["[]+|["\]]+$/g, '' ).trim() )

		// @ts-ignore
		const result: Result = {}
		let lastIndex        = -1

		patterns.forEach( pattern => {

			for ( let i = lastIndex + 1; i < fields.length; i++ ) {

				if ( pattern.regex.test( fields[i] ) ) {
					
					result[pattern.name] = fields[i]
					lastIndex            = i
					break

				}

			}

		} )
		
		if( 'unknow' in result ) delete result.unknow

		return result

	} ).filter( result => Object.keys( result ).length )

}

interface Options {
	limit?: number;
	minRating?: number;
	ifFeatured?: boolean;
	ifWellKnown?: boolean;
}

export async function getChromeWebStoreData( keyword: string, options: Options = {} ): Promise<ChromewebstoreResponse> {

	const {
		limit = 10,
		minRating = 0,
		ifFeatured = false,
		ifWellKnown = false,
	} = options

	const baseUrl     = 'https://chromewebstore.google.com/_/ChromeWebStoreConsumerFeUi/data/batchexecute'
	const queryParams = {
		'rpcids'       : 'zTyKYc',
		'source-path'  : '/search/%E8%B1%86%E7%93%A3',
		'bl'           : 'boq_chrome-webstore-consumerfe-ui_20240306.00_p1',
		'hl'           : 'en-GB',
		'soc-app'      : '1',
		'soc-platform' : '1',
		'soc-device'   : '1',
		'rt'           : 'c',
	}

	const validMinRating  = Math.max( 0, Math.min( minRating, 5 ) )
	const minRatingFilter = validMinRating === 0 ? 'null' : validMinRating.toString()
	const featuredFilter  = ifFeatured ? '1' : 'null'
	const wellKnownFilter = ifWellKnown ? '1' : 'null'

	const bodyObject = {
		'f.req' : `[[["zTyKYc","[[null,[null,null,null,[\\"${keyword}\\",[${limit}],${minRatingFilter},null,${featuredFilter},${wellKnownFilter},1]]]]",null,"1"]]]`,
	}

	try {

		const rawData             = await fetchData( baseUrl, queryParams, bodyObject )
		const dataBlocks          = processData( rawData )
		const patterns: Pattern[] = [
			{
				name : 'id', regex : /^[a-z0-9]{32}$/, 
			},
			{
				name : 'iconURL', regex : /^https:\/\/lh3\.googleusercontent\.com\//, 
			},
			{
				name : 'title', regex : /.+/, 
			},
			{
				name : 'rating', regex : /^\d+(\.\d+)?$|null/, 
			},
			{
				name : 'reviewCount', regex : /^\d+$|null/, 
			},
			{
				name : 'coverURL', regex : /^https:\/\/lh3\.googleusercontent\.com\/|null/, 
			},
			{
				name : 'description', regex : /[^\s]+/, 
			},
			{
				name : 'publish', regex : /.+\..+/, 
			},
			{
				name : 'ifEstablish', regex : /true|null/, 
			},
			{
				name : 'ifFeatured', regex : /true|null/, 
			},
			{
				name : 'category', regex : /.+\/.+/, 
			},
			{
				name : 'categoryNo', regex : /^\d+$/, 
			},
			{
				name : 'unknow', regex : /^\d+$/, 
			},
			{
				name : 'userCount', regex : /^\d+$/, 
			},
		]
		const results             = parseFields( dataBlocks, patterns )
		// const failed              = results.length == 1 && results[0].title === 'null' // this is because there are a error en search
		const res = results.filter( 
			r => typeof r.id === 'string' && typeof r.title === 'string' && r.title !== 'null', 
		).map( async r => {

			return{
				...r, 
				iconURL : r.iconURL && await imageUrlExist( r.iconURL ) ? r.iconURL : undefined,
				url     : 'https://chrome.google.com/webstore/detail/' + r.id,
				store   : extensionStoreId.chrome,
			}
		
		} )

		const response = await Promise.all( res )

		return {
			success : true,
			error   : undefined,
			number  : response.length,
			data    : response,
		}

	} catch ( error ) {

		return {
			success : false,
			number  : 0,
			// @ts-ignore
			error   : `Error searching keyword ${keyword}: ${error?.message || ''}`,
			data    : undefined,
		}

	}

}

