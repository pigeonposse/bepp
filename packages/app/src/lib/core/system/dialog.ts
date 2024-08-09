export class Dialog {

	isSupported(){

		try {

			return window?.__TAURI__?.dialog ? true : false
		
		}catch( _e ){

			return false
		
		}
	
	}

	fileImporter( ...args: Parameters<typeof window.__TAURI__.dialog.open> ) {

		if( this.isSupported() ) 
			return window.__TAURI__.dialog.open( ...args )
	
	}

	saveOn( ...args: Parameters<typeof window.__TAURI__.dialog.save> ) {

		if( this.isSupported() ) 
			return window.__TAURI__.dialog.save( ...args )
	
	}

}
