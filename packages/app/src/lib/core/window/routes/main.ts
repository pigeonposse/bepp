import {
	currLocaleRoute, t,
} from '../../i18n/main'
import type {
	Store, Readable, 
} from '$lib/core/store/main'

/**
 * TYPES.
 */

type ObjectValues<Values> = Values[keyof Values];

export type Route = {
    id: RouteID;
    path: string;
    name: string;
};

export type RouteID = ObjectValues<RouteService['routeIds']>;
export type Routes = { [key in RouteID]: Route };

export type RouteInterface = {
	store: Store
}

/**
 * ROUTE SERVICE CLASS.
 */
export class RouteService {

	#store
	currRouteID: Readable<string>
	list: Readable<Routes>
	routeIds = {
		home     : 'home',
		info     : 'info',
		settings : 'settings',
	} as const

	constructor( args: RouteInterface ) {

		this.#store      = args.store
		this.currRouteID = this.#store.derived(
			this.#store.page,
			$page => {
	
				const activeUrl = $page.data.route.replace( '/', '' )
				const pageID    = activeUrl === '' ? this.routeIds.home : activeUrl.replace( '/', '' )
				// console.log( {
				// 	lang : $page,
				// 	pageID,
				// } )
				return pageID
			
			},
		)
	
		this.list = this.#store.derived(
			[
				currLocaleRoute, t,
			],
			( [
				$currLocaleRoute, $t,
			] ) => {

				// console.log( $currLocaleRoute )
				const localeRoute = $currLocaleRoute.endsWith( '/' ) ? $currLocaleRoute : $currLocaleRoute + '/'
				return {
					home : {
						id   : this.routeIds.home,
						path : localeRoute,
						name : 'Bepp',
					},
					info : {
						id   : this.routeIds.info,
						path : localeRoute + this.routeIds.info,
						name : $t( 'common.info' ) as string,
					},
					settings : {
						id   : this.routeIds.settings,
						path : localeRoute + this.routeIds.settings,
						name : $t( 'common.settings' ) as string,
					},
				}
			
			},
		)
	
	}

	public isOn( pageID: RouteID ): boolean {

		const $page = this.#store.get( this.#store.page )

		const activeUrl = $page.url.pathname.replace( '/' + $page.data.lang, '' )
		const pageRoute = pageID === this.routeIds.home ? pageID : '/' + pageID

		return activeUrl === pageRoute
	
	}

}
