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
import { Log }    from './log/main'
import { Http }   from './http/main'
import * as data  from '$lib/data/main'

export class Core {

	pkg = PKG
	mainPkg = MAIN_PKG
	i18n = i18n
	http
	log
	store
	window
	system
	api
	onlineStatus
	data = data

	constructor(){

		this.log    = new Log()
		this.store  = new Store()
		this.system = new System()
		this.http   = new Http()
		this.window = new Window( {
			log    : this.log,
			store  : this.store,
			system : this.system,
		} )
		
		this.api = new Api( {
			log    : this.log,
			window : this.window,
			system : this.system,
			http   : this.http,
			store  : this.store,
			data   : this.data,
			t      : i18n.t,
		} )
		
		this.onlineStatus = this.store.writable( false )
		// Here because there are problems in initInBrowser function
		this.#onlineStatusStore()
	
	}

	async init(){

		await this.api.init()
		// this.#onlineStatusStore()
	
	}

	async initInBrowser(){

		if( !this.window.isBrowser() ) throw Error( 'Must be init in browser' )

		this.window.dragWindow( )
		// if is active create a error
		// this.window.viewTransitions()

		await this.window.printLogo()
	
	}

	#onlineStatusStore(){

		this.onlineStatus.set( navigator.onLine )
		globalThis.window?.addEventListener( 'offline', () => this.onlineStatus.set( false ) )
		globalThis.window?.addEventListener( 'online', () => this.onlineStatus.set( true ) )
	
	}

}
