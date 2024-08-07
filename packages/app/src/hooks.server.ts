/**
 * SVELTE HOOKS.
 *
 * @description Add all sveltehooks.
 */

import {
	handle as handlei18n, handleError, 
} from '$lib/core/i18n/hook'
import { sequence } from '@sveltejs/kit/hooks'

export const handle = sequence( handlei18n )

export {
	handleError,
}

