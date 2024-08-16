import type { TerminatedPayload } from '@tauri-apps/plugin-shell'

export type ExecuteParams = { 
	program: string, 
	args?: string | string[],
	on: ( v: ExecuteBinOnData ) => Promise<void>,
}

type ExecuteBinOnData = {
	type: 'stderr' | 'stdout' | 'error'
	data: string
} | {
	type: 'close'
	data: TerminatedPayload
}

export class Shell {
	
	async open( ...args: Parameters<typeof window.__TAURI__.shell.open> ){

		if( !window.__TAURI__?.shell?.open ) return window.open( ...args )
		return await window.__TAURI__.shell.open( ...args )
	
	}

	async invoke( ...args: Parameters<typeof window.__TAURI__.core.invoke> ){

		const invoke = window?.__TAURI__?.core?.invoke

		if( !invoke ) return 
		return await invoke( ...args )
	
	}

	async execute( { program, args, on }:ExecuteParams ){

		if( !window?.__TAURI__?.shell?.Command ) return 
		const command = window.__TAURI__.shell.Command.sidecar( program, args )
		command.on( 'close', async data => {

			if( on ) await on( {
				type : 'close',
				data,
			} )

		} )

		command.on( 'error', async data => {

			if( on ) await on( {
				type : 'error',
				data,
			} )

		} )
		command.stdout.on( 'data', async data => {

			if( on ) await on( {
				type : 'stdout',
				data,
			} )

		} )
		command.stderr.on( 'data', async data => {

			if( on ) await on( {
				type : 'stderr',
				data,
			} )

		} )
		
		const child = await command.execute()
		return child
	
	}

}
