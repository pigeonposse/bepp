/**
 * SVELTE HOOKS.
 *
 * @description Add all sveltehooks.
 */

import { dev }                      from '$app/environment'
import {
	handle as handlei18n, 
	handleError as handlei18nError, 
} from '$lib/core/i18n/hook'
import type {
	Handle, HandleServerError, 
} from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const coreHandle: Handle = async ( { event, resolve } ) => {

	return await resolve( event )

}

export const handle = sequence( handlei18n, coreHandle )

export const handleError: HandleServerError = async data => {

	const { error } = data
	if( dev ) console.error( error )
	handlei18nError( data )

}

