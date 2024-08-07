import type { ExtsGetResponse } from '@bepp/api'

import { ApiSuper } from '../_shared/super'
import { ERROR }    from './error'

export class ExtensionStore extends ApiSuper<typeof ERROR[keyof typeof ERROR]> {

	ERROR = ERROR
	protected _setProcessStore(){

		type Log = string
		type Props = {
			loading : boolean
			success : boolean
			error?: {
				id: string
				error: object[] | object
			}
			log?: Log[]
		}

		const defaultValue    = {
			loading : false,
			success : false,
			error   : undefined,
			log     : undefined,
		} 
		const store           = this.store.writable<Props>( defaultValue )
		const { set, update } = store

		return {
			...store,
			reset     : () => set( defaultValue ),
			resetPart : ( v: Partial<Props> ) => {

				update( state => {

					return {
						...state, 
						...v, 
					} 
			
				} )
		
			},
			change : ( v: Partial<Props> ) => {

				update( state => {

					return {
						...state, 
						...v, 
					} 
			
				} )
		
			},
			get : () => this.store.get( store ),
			log : {
				getLast : () => {

					const v =  this.store.get( store )
		
					return v.log && v.log.length > 0 ? v.log[v.log.length - 1] : ''
		
				},
				add : ( v: Log ) => {

					update( state => {

						if( !state.log ) state.log = []
						state.log.push( v )

						return state 
				
					} )
			
				},
				get : () => this.store.get( store ).log,
			},
		}

	}

	protected _setExtStore(){

		type Props = ExtsGetResponse | undefined
		const defaultValue  = undefined
		const store         = this.store.writable<Props>( defaultValue )
		const storeBrowsers = this.store.writable<ExtsGetResponse['browsersAllowed'] | undefined>( undefined )
		return {
			...store,
			reset            : () => store.set( undefined ),
			selectedBrowsers : {
				...storeBrowsers,
				change : ( data:ExtsGetResponse['browsersAllowed'] ) => {

					storeBrowsers.set( data )
			
				},
				get : () => this.store.get( storeBrowsers ),
			},
			get : () => this.store.get( store ),
		}

	}

}
