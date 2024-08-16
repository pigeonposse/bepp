/**
 * LAYOUT.
 *
 * @description LAYOUT FILE.
 */

export const load = async ( { url } ) => {

	const { error } = await import( '@sveltejs/kit' )
	const { Core }  = await import( '$lib/core/main' )
	const core      = new Core()

	try{
		
		const { pathname } = url
		const { route }    = await core.i18n.layoutFunct( pathname )
		const platform     = await core.system.getPlatform()
		//  throw Error( 'Not found' )
		// await core.init()	
		
		return {
			route,
			t               : core.i18n.t,
			locale          : core.i18n.locale,
			locales         : core.i18n.locales,
			currLocaleRoute : core.i18n.currLocaleRoute,
			platform,
			core,
			shortcuts       : core.data.appShortcuts,
		}
	
	}catch( e ){
		
		await core.log.error( {
			id   : core.data.logID.layoutInitError, 
			data : e,
		} )

		// redirect( 307, '/error' )
		throw error( 404, 'layout error' )
	
	}

} 

export type GeneralLayoutData = Awaited<ReturnType<typeof load>>
// export const prerender = false // must be true for i18n
export const ssr = false
