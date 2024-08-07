/**
 * Todo.
 *
 * @description Todo.
 */

import * as i18n  from './i18n/main'
import { Store }  from './store/main'
import { Window } from './window/main'
import { Api }    from './api/main'
import { System } from './system/main'

export class Core {

	pkg = PKG
	mainPkg = MAIN_PKG
	i18n = i18n

	store
	window
	system
	api
	onlineStatus

	constructor(){

		this.store  = new Store()
		this.system = new System()
		this.window = new Window( {
			store  : this.store,
			system : this.system,
		} )
		this.api    = new Api( {
			window : this.window,
			system : this.system,
			store  : this.store,
			t      : i18n.t,
		} )
		
		this.onlineStatus = this.store.writable( false )
		this.#onlineStatusStore()
	
	}

	async init(){

		await this.api.init()
		
	}

	initInBrowser(){

		if( !this.window.isBrowser() ) throw Error( 'Must be init in browser' )

		this.window.dragWindow( )
		this.window.printLogo()
		this.window.viewTransitions()
	
	}

	#onlineStatusStore(){

		this.onlineStatus.set( navigator.onLine )
		window?.addEventListener( 'offline', () => this.onlineStatus.set( false ) )
		window?.addEventListener( 'online', () => this.onlineStatus.set( true ) )
	
	}

}
