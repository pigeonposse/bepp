/**
 * LAYOUT.
 *
 * @description LAYOUT FILE.
 */

import { dev }       from '$app/environment'
import { Core }      from '$lib/core/main'
import { shortcuts } from '$lib/core/shortcuts/main.js'
import { error }     from '@sveltejs/kit'

export const load = async ( { url } ) => {

	const core = new Core()

	try{
		
		const { pathname } = url
		const { route }    = await core.i18n.layoutFunct( pathname )
		const platform     = await core.system.getPlatform()
		
		// await core.init()	
		
		return {
			route,
			t               : core.i18n.t,
			locale          : core.i18n.locale,
			locales         : core.i18n.locales,
			currLocaleRoute : core.i18n.currLocaleRoute,
			platform,
			core,
			shortcuts,
		}
	
	}catch( e ){

		let msg
		if( typeof e === 'string' ) msg = e
		else msg = typeof e === 'object' && e !== null &&
			'message' in e && typeof e.message === 'string' 
			? e.message : ''
		
		if( dev ) console.log( {
			'app-error' : msg,
		} )
		return error( 404, msg )
	
	}

} 

export type GeneralLayoutData = Awaited<ReturnType<typeof load>>
export const prerender = 'auto' // must be true for i18n
export const ssr = false
