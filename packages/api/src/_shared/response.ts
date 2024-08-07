/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-jsdoc */

import type { Context } from 'hono'
import { validate }     from './validate'

type Error400Data = {
    id: string;
    message: string;
    error?: unknown;
    help?: string | undefined;
}
type Error500Data ={
    id: string;
    error?: unknown;
}

export const add500Error = (
	c: Context,
	data: Error500Data,
) => {

	const res = add500ErrorObject( data )
	return c.json( res, res.status )

}

export const add500ErrorObject = (
	data: Error500Data,
) => {

	const status = 500 as const
	return {
		status, 
		...data,
		message : 'Internal Server error',
		error   : getErrorResponse( data.error ),
		help    : 'Contact the developers to report the issue or wait until the issue is resolved',
	}

}
const getErrorResponse = ( e: unknown ) => {

	if( !e ) return 'No data error'
	if( e instanceof Error ) return e.stack ? e.stack.split( '\n' ).map( line => line.trim() ) : ''
	else if ( typeof e === 'object' && Object.keys( e ).length <= 0 ) return 'No data error'
	else return e

}
export const add400Error = (
	c: Context,
	data: Parameters<typeof add400ErrorObject>[0],
) => {

	const res = add400ErrorObject( data )
	return c.json( res,res.status )

}

export const add400ErrorObject = (
	data: Error400Data,
) => {

	const status = 400 as const
	return {
		status, 
		...data,
		error : getErrorResponse( data.error ),
		help  : data.help || 'Please read the documentation for a succesfull response',
	}

}
export const add404Error = (
	c: Context,
	data: {
        id: string,
        message: string,
        help: string
    },
) => {

	const status = 404 as const

	return c.json( {
		status, 
		...data,
	},
	status )

}

/**
 * Use HTTP status code 200 for successful requests that retrieve or update a resource.
 */
export const addSuccessResponse = <Data extends object>(
	c: Context,
	data: Data,
) => {

	return c.json(
		data,
		200,
	)

}

/**
 * Use HTTP status code 201 for successful requests that create a new resource on the server. 
 */
export const addSuccess201Response = <Data extends object>(
	c: Context,
	data: Data,
) => {

	return c.json(
		data,
		200,
	)

}
/**
 * Use HTTP status code 202 for requests that have been accepted for processing but the processing has not yet been completed.
 */
export const addSuccess202Response = <Data extends object>(
	c: Context,
	data: Data,
) => {

	return c.json(
		data,
		200,
	)

}

const error = <T extends 500 | 404 | 400>( status: T ) => {

	return validate.object( {
		status  : validate.literal( status ),
		id      : validate.string(),
		message : validate.string(),
		error   : validate.object( {} ),
		help    : validate.string(),
	} )

}

export const schemaError500 = error( 500 )
export const schemaError404 = error( 404 )
export const schemaError400 = error( 400 )

export const responseJSONSuccess = <OBJ extends validate.ZodTypeAny>( schema: OBJ, more?: object )=> ( {
	description : 'Successfully fetched data',
	content     : {
		'application/json' : {
			schema : schema,
		},
	},
	...( more ? more : {} ),
} )
export const responseStreamSuccess = <OBJ extends validate.ZodTypeAny>( schema: OBJ, more?: object )=> ( {
	description : 'Successfully fetched data',
	// headers     : {
	// 	'Transfer-Encoding' : {
	// 		schema : {
	// 			type : 'string',
	// 		},
	// 		description : 'chunked',
	// 	},
	// },
	content     : {
		'text/plain' : {
			schema : schema,
		},
	},
	...( more ? more : {} ),
} )

export const responseJSONError500 = {
	description : 'Internal Server Error',
	content     : {
		'application/json' : {
			schema : schemaError500,
		},
	},
}
export const responseJSONError404 = {
	description : 'Page not found',
	content     : {
		'application/json' : {
			schema : schemaError404,
		},
	},
}
export const responseJSONError400 = {
	description : 'Bad request',
	content     : {
		'application/json' : {
			schema : schemaError400,
		},
	},
}

export type AppError505 = validate.infer<typeof schemaError500>
export type AppError404 = validate.infer<typeof schemaError404>
export type AppError400 = validate.infer<typeof schemaError400>
