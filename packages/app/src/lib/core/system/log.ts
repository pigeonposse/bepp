export class Log {

	async attach( ...args : Parameters<typeof window.__TAURI__.log.attachLogger> ){

		if( !window.__TAURI__?.log?.attachLogger ) return
		const detach = await window.__TAURI__.log.attachLogger( ...args )

		return {
			detach,
		}
	
	}

	error( ...args : Parameters<typeof window.__TAURI__.log.error> ){

		if( !window.__TAURI__?.log?.error ) console.error( ...args )
		else window.__TAURI__.log.error( ...args )
	
	}

	info( ...args : Parameters<typeof window.__TAURI__.log.info> ){

		if( !window.__TAURI__?.log?.info ) console.info( ...args )
		else window.__TAURI__.log.info( ...args )
	
	}

}
