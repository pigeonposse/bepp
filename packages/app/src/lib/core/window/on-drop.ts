/**
 * Todo.
 *
 * @description Todo.
 */

import {
	TauriEvent,
	type EventCallback, type UnlistenFn, 
} from '@tauri-apps/api/event'

export const eventDropType = {
	hover     : 'hover',
	drop      : 'drop',
	cancelled : 'cancelled',
} as const

type EventDropType = typeof eventDropType[keyof typeof eventDropType]
type EventDropPrivateData = {
	type: EventDropType, 
	paths: string[], 
	id: string 
}
type EventDropData = EventDropPrivateData & {
	valid: boolean
	paths: string[] | false,
}
type EventDropCallBackContructor<DataType> = ( data: DataType ) => void
type EventDropPrivateCallBack = EventDropCallBackContructor<EventDropPrivateData>
type EventDropCallBack = EventDropCallBackContructor<EventDropData>
type OnDropEventRes = { 
    id: string; 
    unlisten: () => void 
}
type OnDropArgs = {
	id: string, 
	multiple?: boolean,
	extensions?: string[],
}

export class OnDropEvent {

	readonly #args
	readonly #tauriEvent = TauriEvent
	#event: undefined | OnDropEventRes

	on: EventDropCallBack
	readonly type = eventDropType

	constructor( { id, extensions, multiple }: OnDropArgs ){

		if( !id ) throw Error( 'Needs a ID' )

		this.#args = { 
			multiple   : multiple || false,
			extensions : extensions || [],
			id,
		}

		this.on = () => {}
	
	}

	#validateExtensions( paths: string[], exts: string[] ): boolean {

		if ( !paths ) return false
		return paths.every( path => exts.some( ext => path.endsWith( ext ) ) )
	
	}

	async #onDropEvent( id: string, cb: EventDropPrivateCallBack = () => {} ): Promise<OnDropEventRes | undefined>{

		if( !window.__TAURI__?.event ) return
		
		// console.log( id )

		const eventListen = <T>( eventID: TauriEvent, cb: EventCallback<T> ): Promise<UnlistenFn> => {

			return window.__TAURI__.event.listen( 
				eventID, 
				cb, 
			)
	
		}

		const onDropHover     = eventListen( 
			this.#tauriEvent.DROP_OVER, 
			e => {
	
				if( e.payload && Array.isArray( e.payload ) ) cb( {
					type : this.type.hover, paths : e.payload, id, 
				} )
			
			}, 
		)
		const onDrop          = eventListen( 
			this.#tauriEvent.DROP, 
			e => {

				if( e.payload && Array.isArray( e.payload ) ) cb( {
					type : this.type.drop, paths : e.payload, id, 
				} )

			}, 
		)
		const onDropCancelled = eventListen( 
			this.#tauriEvent.DROP_CANCELLED, 
			e => {
	
				if( e.payload && Array.isArray( e.payload ) ) cb( {
					type : this.type.cancelled, paths : e.payload, id, 
				} )
			
			}, 
		)
		
		const unlistenDropHover     = await onDropHover
		const unlistenDrop          = await onDrop
		const unlistenDropCancelled = await onDropCancelled

		const unlisten = () => {
			
			unlistenDropHover()
			unlistenDrop()
			unlistenDropCancelled()
		
		}

		return {
			id,
			unlisten,
		}
	
	}	

	async start( ) {

		const event = await this.#onDropEvent( this.#args.id, ( { type, paths, id } ) => {
	
			let valid, pathResult
	
			const isValidType = type === this.type.hover || type === this.type.drop

			if( this.#args.multiple ){

				if( isValidType && this.#validateExtensions( paths, this.#args.extensions ) ){

					valid      = true
					pathResult = true
				
				}else {

					valid      = false
					pathResult = false
				
				}
			
			}else{

				if( isValidType && paths.length !== 1 ) {

					valid      = false
					pathResult = false
				
				}else if( isValidType && this.#validateExtensions( paths, this.#args.extensions ) ){

					valid      = true
					pathResult = true
				
				}else if ( isValidType ) {

					valid      = false
					pathResult = false
				
				}else {

					valid      = false
					pathResult = false
				
				}
			
			}

			if ( type === this.type.cancelled ) valid = false
	
			if( typeof valid === 'boolean' )
				this.on( {
					type, 
					valid,
					paths : pathResult ? paths : [],
					id,
				} )
		
		} )

		this.#event = event
	
	}

	async stop(){

		if( this.#event && this.#event.unlisten ) await this.#event.unlisten()
	
	}

}
