
import {
	building, dev, 
} from '$app/environment'
import type {
	Handle, HandleServerError, 
} from '@sveltejs/kit'
import {
	derived, get,
} from 'svelte/store'
import I18n from 'sveltekit-i18n'

type I18NParams<Langs extends string[]> = {
	localeIds: Langs
	defaultLocale: Langs[number]
	translations: {[key in Langs[number]]: {lang: object}}
	loaders: {locale: string, key: string, route?: string, loader: unknown}[]
	routesWithoutI18n?: string[]
}

export class I18NSuper<Langs extends string[]> {

	readonly #isBuilding = building

	protected translations
	protected loaders

	readonly localeIds
	readonly defaultLocale

	#core
	
	t
	locale
	locales
	currLocaleRoute
	loading
	routesWithoutI18n

	constructor( { 
		localeIds,
		defaultLocale, 
		translations,
		loaders,
		routesWithoutI18n,
	}: I18NParams<Langs> ){

		this.localeIds         = localeIds
		this.defaultLocale     = defaultLocale
		this.translations      = translations
		this.loaders           = loaders
		this.routesWithoutI18n = routesWithoutI18n
		
		this.#core = new I18n( {
			log : {
				level : dev ? 'warn' : 'error', 
			},
			translations : this.translations,
			// @ts-ignore
			loaders      : this.loaders,
		} )
		
		this.t       = this.#core.t
		this.locale  = this.#core.locale
		this.locales = this.#core.locales

		this.currLocaleRoute = derived( this.locale, $locale => {

			return $locale === this.defaultLocale ? '/' : '/' + $locale
		
		} )
	
		this.loading = this.#core.loading

		this.loading.subscribe( async $loading => {
	
			if ( $loading ) {
		
				// console.log( 'Loading translations...' )
				await this.loading.toPromise()
				// console.log( 'Updated translations', translations.get() )
			
			}
		
		} )
	
	}

	/**
	 * Function for execute in layout svelte.
	 *
	 * @param   {string}                                 pathname - Set current pathname.
	 * @returns {Promise<{route: string;lang: string;}>}          - Returns current Route of url without lang, and current lang ID.
	 */
	async layoutFunct( pathname: string ) {
	
		const storeLang = get( this.locale )
		const lang      = `${pathname.match( /\w+?(?=\/|$)/ ) || storeLang || this.defaultLocale}`
		const route     = pathname.replace( new RegExp( `^/${lang}` ), '' )
		
		await this.#core.loadTranslations( lang, route )
	
		const trans = this.#core.translations.get()
		
		await this.#core.setLocale( lang )
		await this.#core.setRoute( route )
	
		this.#core.addTranslations( trans )
	
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

	handle: Handle = async ( { event, resolve } ) =>{

		// this is for cloudflare build adapter
		// @see https://github.com/sveltejs/kit/issues/9386#issuecomment-1714660627
		if ( this.#isBuilding ) {

			const response = await resolve( event )
			return response // bailing here allows the 404 page to build
		
		}

		const { url, request, isDataRequest } = event
		const { pathname, origin }            = url

		// ROUTES WITOUT I18N
		if( this.routesWithoutI18n ){

			for ( const routeWithoutI18n of this.routesWithoutI18n ) {

				if( pathname.startsWith( routeWithoutI18n ) ) return await resolve( event )
			
			}
		
		}

		const routeRegex = new RegExp( /^\/[^.]*([?#].*)?$/ )
		
		// If this request is a route request
		if ( routeRegex.test( pathname ) ) {

			// Get defined locales
			const supportedLocales = this.locales.get().map( l => l.toLowerCase() )

			// Try to get locale from `pathname`.
			let locale = supportedLocales.find( l => l === `${pathname.match( /[^/]+?(?=\/|$)/ )}`.toLowerCase() )
			// We want to redirect the default locale to "no-locale" path
			if ( locale === this.defaultLocale && !request.headers.get( 'prevent-redirect' ) ) {

				const localeRegex = new RegExp( `^/${locale}` )
				const location    = `${pathname}`.replace( localeRegex, '' ) || '/'

				return new Response( undefined, {
					headers : {
						location, 
					}, status : 301, 
				} )

				// If route locale is not supported
		
			} else if ( !locale ) {

				// Get user preferred locale if it's a direct navigation
				if ( !isDataRequest ) {

					locale = `${`${request.headers.get( 'accept-language' )}`.match( /[a-zA-Z]+?(?=-|_|,|;)/ )}`.toLowerCase()
			
				}

				// Set default locale if user preferred locale does not match
				if ( locale && !supportedLocales.includes( locale ) ) locale = this.defaultLocale

				if ( locale === this.defaultLocale ) {

					const path       = `${pathname}`.replace( /\/$/, '' )
					const redirectTo = `${origin}/${locale}${path}${isDataRequest ? '/__data.json?x-sveltekit-invalidated=100' : ''}`

					// We want to prevent redirect to fetch data for the default locale
					request.headers.set( 'prevent-redirect', '1' )

					// Fetch the redirected route
					const response = await fetch( redirectTo, request )

					// Get response body and set html headers
					const data = await response.text()

					// Serve the redirected route.
					// In this case we don't have to set the html 'lang' attribute
					// as the default locale is already included in our app.html.
					return new Response( data, {
						...response,
						headers : {
							...response.headers,
							'Content-Type' : isDataRequest ? 'application/json' : 'text/html',
						},
					} )

				}

				// 301 redirect
				return new Response( undefined, {
					headers : {
						'location' : `/${locale}${pathname}`, 
					}, status : 301, 
				} )
		
			}

			// Add html `lang` attribute
			return resolve( {
				...event, 
				locals : {
					lang : locale, 
				}, 
			}, {
				transformPageChunk : ( { html } ) => html.replace( '%lang%', `${locale}` ),
			} )
	
		}

		return resolve( event )

	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	handleError: HandleServerError = async ( { event } ) =>{

		const { locals } = event
		const { lang }   = locals
		await this.#core.loadTranslations( lang, 'error' )

		return locals

	}

}
