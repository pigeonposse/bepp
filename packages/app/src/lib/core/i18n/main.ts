/**
 * TYPES.
 *
 * @description File for set core types.
 */

import {
	derived, get,
	type Writable, 
} from 'svelte/store'
import { dev }       from '$app/environment'
import i18n          from 'sveltekit-i18n'
import {
	defaultLocale,
	loaders, translations as trans,
	type i18nLangId, 
} from './get'

const i18nObj = new i18n( {
	log : {
		level : dev ? 'warn' : 'error', 
	},
	translations : trans,
	loaders,
} )

export const { 
	t, 
	locales, 
	loading, 
	addTranslations, 
	loadTranslations,
	translations, 
	setRoute, 
	setLocale,
} = i18nObj

export const locale = i18nObj.locale as Writable<i18nLangId>
export { defaultLocale }

export const currLocaleRoute = derived( locale, $locale => {

	// @before return $locale === defaultLocale ? '/' : '/' + $locale
	return $locale === defaultLocale ? '/' + $locale : '/' + $locale

} )

export const layoutFunct = async ( pathname: string ) =>{

	const storeLang = get( locale )
	const lang      = `${pathname.match( /\w+?(?=\/|$)/ ) || storeLang || defaultLocale}` as i18nLangId
	const route     = pathname.replace( new RegExp( `^/${lang}` ), '' )
	
	await loadTranslations( lang, route )

	const trans = translations.get()
	
	await setLocale( lang )
	await setRoute( route )

	addTranslations( trans )

	return {
		/**
		 * Route of url without lang.
		 */
		route,
		/**
		 * Current Lang ID of url.
		 */
		lang,
	}

}

// Translations logs
loading.subscribe( async $loading => {

	if ( $loading ) {

		// console.log( 'Loading translations...' )
		await loading.toPromise()
		// console.log( 'Updated translations', translations.get() )
	
	}

} )
