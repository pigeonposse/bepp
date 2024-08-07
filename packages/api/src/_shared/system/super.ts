import * as consts from './const'

export class SystemSuper {

	const = consts
	
	protected isWindow = typeof window !== 'undefined'
	
	protected isNode = 'process' in globalThis &&
		typeof globalThis.process !== 'undefined' && 
		globalThis.process.versions != null && 
		globalThis.process.versions.node != null

	// protected isTauri = typeof window !== 'undefined' && '__TAURI__' in window
	// protected isDeno = 'process' in globalThis &&
	// 	typeof globalThis.process !== 'undefined' && 
	// 	globalThis.process.versions != null && 
	// 	globalThis.process.versions.deno != null

	// protected isBun = 'process' in globalThis &&
	// 	typeof globalThis.process !== 'undefined' && 
	// 	globalThis.process.versions != null && 
	// 	globalThis.process.versions.bun != null

}

