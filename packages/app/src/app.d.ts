////////////////////////////////////////////////
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
////////////////////////////////////////////////

declare global {
	////////////////////////////////////////////////
	// APP
	////////////////////////////////////////////////
	namespace App {
		// interface Error {
		// 	data: object | undefined
		// 	id: string
		// }
		interface Locals {
			lang: string
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	////////////////////////////////////////////////
	// VIEW TRANSITIONS
	// @see https://svelte.dev/blog/view-transitions
	////////////////////////////////////////////////
	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}
	interface Document {
		startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
	}
	////////////////////////////////////////////////
	// Window
	////////////////////////////////////////////////
	interface Window {
		__TAURI__: typeof import('@tauri-apps/api') & {
			http: typeof import('@tauri-apps/plugin-http')
			shell: typeof import('@tauri-apps/plugin-shell')
			os: typeof import('@tauri-apps/plugin-os')
			fs: typeof import('@tauri-apps/plugin-fs')
			updater: typeof import('@tauri-apps/plugin-updater')
			autostart: typeof import('@tauri-apps/plugin-autostart')
			dialog: typeof import('@tauri-apps/plugin-dialog')
			log: typeof import('@tauri-apps/plugin-log')
		}
	}
	////////////////////////////////////////////////
	// VARIABLES
	////////////////////////////////////////////////
	declare const MAIN_PKG: typeof import('../../../package.json');
	declare const PKG: typeof import('../package.json');
}

export {};
