/**
 * Todo.
 *
 * @description Todo.
 */

import { onNavigate }   from '$app/navigation'
import { writable }     from 'svelte/store'
import { RouteService } from './routes/main'
import { browser }      from '$app/environment'
import { OnDropEvent }  from './on-drop'
import type { Store }   from '../store/main'
import type { System }  from '../system/main'
import type { Log }     from '../log/main'

/**
 * TYPES.
 */
type DragParams = {
    element?: Element | Document
    noDragSelectors?: string
} 
type WindowProps = {
	log: Log
	store: Store
	system: System
}

/**
 * FUNCTION.
 */
export class Window {

	routes
	#system
	#log
	constructor( args: WindowProps ) {

		this.routes  = new RouteService( {
			store : args.store,
		} )
		this.#system = args.system
		this.#log    = args.log
	
	}

	isNavigation = writable( false )
	events = {
		Drop : OnDropEvent,
	}

	isBrowser() {

		return browser || 'window' in globalThis
	
	}

	onWindowCreate(){

		if( !window?.__TAURI__?.event?.listen || !window?.__TAURI__?.event?.TauriEvent?.WINDOW_CREATED ) return 

		window.__TAURI__.event.listen( 
			window.__TAURI__.event.TauriEvent.WINDOW_CREATED, 
			() => {

				this.#log.info( {
					id   : window.__TAURI__.event.TauriEvent.WINDOW_CREATED,
					data : 'success',
				} )
	
			}, 
		)
		window.__TAURI__.event.listen( 
			window.__TAURI__.event.TauriEvent.WEBVIEW_CREATED, 
			() => {

				this.#log.info( {
					id   : window.__TAURI__.event.TauriEvent.WEBVIEW_CREATED,
					data : 'success',
				} )
	
			}, 
		)

	}
	
	dragWindow( { element, noDragSelectors }: DragParams = {
		element         : undefined, 
		noDragSelectors : undefined,
	} ){
        
		if( !document ) throw Error( 'Document is not defined' )
		
		element         = element === undefined ? document : element
		noDragSelectors = noDragSelectors === undefined ? 'input, a, textarea, button, iframe, video, [role="link"]' : noDragSelectors

		element.addEventListener( 'mousedown', async e => {

			if( e.target === null ) return
			
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if ( e.target.closest( noDragSelectors ) ) return
			
			if( window.__TAURI__ && window.__TAURI__.window ){

				const tauriW = window.__TAURI__.window
				// @ts-ignore
				const w = await tauriW.getCurrentWindow()
	
				await w.startDragging()
			
			} 

		} )
	
	}
	
	isTauri(){

		if( 'window' in globalThis && '__TAURI__' in globalThis ) return true
		return false
	
	}

	viewTransitions(){

		if( this.isTauri() ) return

		try {

			onNavigate( navigation => {

				this.isNavigation.set( true )
			
				if ( !document.startViewTransition ) return
	
				return new Promise( resolve => {

					document.startViewTransition( async () => {

						resolve()
						await navigation.complete
				
					} )
			
				} )
		
			} )
		
		}catch( e ){

			this.#log.error( {
				id   : 'view-transition',
				data : e,
			} )
		
		}
	
	}
	
	async printLogo(){

		await this.#log.info( `
	.:--==========++========-:.      
	-======+==++++++++++=+====--:     
	====+++++*+++++**++*+=====---     
	-==+++*%@@++++#@%=*@@#+===---     
	--==+%@@#+++=*@@+===*@@#=----     
	:--=+%@@#++=*@@+====#@@*---:-     
	:---==+#@@+=@@+-=-=@@*=------     
	::---====+====-----=-:-----:-     
	:::----=-----------::-------.     
	::::---:::::::::::::::::::.       
	..:::.                            
	...      

	Made with ❤️ by Pigeonposse

	https://pigeonposse.com
		` )
	
	}

}
