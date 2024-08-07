/**
 * Todo.
 *
 * @description Todo.
 */

import {
	get, writable, readable, derived,
	type Writable,
	type Readable,
	type StartStopNotifier,
} from 'svelte/store'
import { page } from '$app/stores'
export type { Writable, Readable }

export class Store {

	writable<T>( value?: T, start?: StartStopNotifier<T> ): Writable<T> {

		return writable( value, start )
	
	}

	readable = readable
	derived = derived
	get = get

	isNavigation = writable( false )
	page = page

}
