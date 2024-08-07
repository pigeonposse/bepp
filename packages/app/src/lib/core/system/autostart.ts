/**
 * Todo.
 *
 * @description Todo.
 */

export class Autostart {

	enabled: boolean = false
	#tauriAutoStart(){

		return window?.__TAURI__?.autostart

	}
	
	#isSupported(){

		if( !this.#tauriAutoStart() ) throw Error( 'Autostart is not supported or enabled' ) 
	
	}

	isSupported(){

		try {

			this.#isSupported()
			return true
		
		}catch( e ){

			return false
		
		}
	
	}

	async enable(): Promise<boolean> {

		this.#isSupported()
		const app = this.#tauriAutoStart()
		await app.enable()
		const enabled = await app.isEnabled()
		this.enabled  = enabled
		return enabled
	
	}

	async disable(): Promise<boolean> {

		this.#isSupported()
		const app = this.#tauriAutoStart()
		await app.disable()
		const enabled = await app.isEnabled()
		this.enabled  = enabled
		return enabled
		
	}

	async toggle(): Promise<boolean> {

		this.#isSupported()
		const app     = this.#tauriAutoStart()
		const enabled = await app.isEnabled()

		if ( enabled ) 
			await this.enable()
		else 
			await this.disable()

		const enabledRes = await app.isEnabled()
		this.enabled     = enabledRes
		return enabledRes
	
	}

}
