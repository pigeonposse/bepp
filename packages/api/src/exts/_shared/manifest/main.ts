import { System }           from '../../../_shared/system/main'
import { type ZipFiles }    from '../../../_shared/system/fs/zip'
import type { ApiSuper }    from '../../../_shared/main'
import * as consts          from './const'
import * as schema          from './schema'
import type { 
	ExtensionBrowserId,
	ExtensionManVersion,
	ExtensionType,
	ExtsManifestGetGeneralResponse,
	ExtsManifestGetResponse,
} from './types'
import {
	ManifestError, errorID, 
} from './error'

export class ExtensionManifest implements ApiSuper{
	
	const = consts
	schema = schema
	errorID = errorID
	Error = ManifestError

	#system = new System()

	getAllowedBrowsers( 
		type: ExtensionType, 
		manVersion: ExtensionManVersion, 
	): {[key in ExtensionBrowserId] : boolean}{

		const extensionType       = this.const.extensionType
		const extensionManVersion = this.const.extensionManVersion

		return {
			firefox       : type === extensionType.firefox && manVersion == extensionManVersion.three,
			'firefox-mv2' : type === extensionType.firefox && manVersion == extensionManVersion.two,
			chrome        : type === extensionType.chromium && manVersion == extensionManVersion.three,
			'chrome-mv2'  : type === extensionType.chromium && manVersion == extensionManVersion.two,
			edge          : type === extensionType.chromium && manVersion == extensionManVersion.three,
			'edge-mv2'    : type === extensionType.chromium && manVersion == extensionManVersion.two,
			yandex        : type === extensionType.chromium && manVersion == extensionManVersion.three,
			'yandex-mv2'  : type === extensionType.chromium && manVersion == extensionManVersion.two,
			//  only one
			safari        : type === extensionType.chromium && manVersion == extensionManVersion.three,
			brave         : type === extensionType.chromium && manVersion == extensionManVersion.three,
			'opera-gx'    : type === extensionType.chromium && manVersion == extensionManVersion.three,
			opera         : type === extensionType.chromium && manVersion == extensionManVersion.two,
		}
	
	}

	async get( files: ZipFiles, name: string ): Promise<ExtsManifestGetResponse> {

		try {

			const res         = await this.#handleZipFile( files )
			const filesBase64 =  await this.#system.fs.convertZipFiles( res.files, 'base64' )
			const icon        = await this.#getManifestIcon( res )
			const type        = this.#getExtType( res.manifest )
			// console.log( res , type, icon )
			return {
				...res,
				files           : filesBase64,
				icon            : icon,
				manifestVersion : 'manifest_version' in res.manifest && Number( res.manifest.manifest_version ) === this.const.extensionManVersion.two ? this.const.extensionManVersion.two : this.const.extensionManVersion.three,
				type            : type,
				name            : 'name' in res.manifest && typeof res.manifest.name == 'string' && !res.manifest.name.startsWith( '__' ) ? res.manifest.name : name,
			}
		
		}catch( e ){

			if( this.Error.isInstanceOf( e ) ) throw e
			throw new this.Error( this.errorID.MANIFEST_DATA_FAIL, e )
			
		}

	}

	#getExtType( manifest: object ): ExtensionType {

		if ( 
			( 'applications' in manifest && manifest['applications'] !== null && typeof manifest['applications'] === 'object' && 'gecko' in manifest['applications'] ) ||
			( 'browser_specific_settings' in manifest && manifest['browser_specific_settings'] !== null && typeof manifest['browser_specific_settings'] === 'object' && 'gecko' in manifest['browser_specific_settings'] ) ||
			( 'options_ui' in manifest && manifest['options_ui'] !== null && typeof manifest['options_ui'] === 'object' && 'browser_style' in manifest['options_ui'] && manifest['options_ui']['browser_style'] === false )
		) return this.const.extensionType.firefox
		return this.const.extensionType.chromium
	
	}

	async #getManifestIcon( { manifest, folder, files } : ExtsManifestGetGeneralResponse ){

		try {

			if( !( 'icons' in manifest ) || typeof manifest.icons !== 'object' || manifest.icons === null ) return undefined

			const getMaxValue = ( arr: ( string | number )[] ): number => {

				if ( arr.length === 0 ) throw new Error( 'Array is empty' )
			
				const numericArr = arr.map( value => {

					const numberValue = typeof value === 'string' ? parseFloat( value ) : value
					if ( !Number.isFinite( numberValue ) ) throw new Error( 'Array contains non-numeric values' )
					return numberValue
			
				} )
		
				return Math.max( ...numericArr )
		
			}
		
			const manIcons = manifest.icons as {[keys in string | number]: string}
			const iconKeys = Object.keys( manIcons ) as unknown as number[] 
			const iconMax  = getMaxValue( iconKeys ) 

			if( !( iconMax in manIcons ) ) return undefined
		
			const iconPath    = manIcons[iconMax] as string
			const iconZipPath = folder ? 
				await this.#system.path.join( folder, iconPath ) :
				iconPath
	
			const iconBase64 = await await this.#system.fs.convertZipFileToType( files[iconZipPath], 'base64' )
		
			return {
				zipPath : iconZipPath,
				base64  : iconBase64.startsWith( 'data:image/png;base64' ) ? iconBase64 : 'data:image/png;base64,' + iconBase64,
				url     : await this.#system.fs.convertBase64ToBlobUrl( iconBase64, 'image/png' ),
			}
		
		}catch( e ){

			return undefined
		
		}
	
	}

	async #handleZipFile( files: ZipFiles ): Promise<ExtsManifestGetGeneralResponse> {
		
		const checkMan = async ( zipFiles: ZipFiles, folder: string | undefined = undefined ) => {
	
			const manPath = folder ? `${folder}manifest.json` : 'manifest.json'
	
			if ( manPath in zipFiles ) {

				const manifestContent = await this.#system.fs.convertZipFileToType( zipFiles[manPath], 'text' )
				const manifestObj     = JSON.parse( manifestContent )

				return {
					files    : zipFiles,
					manifest : manifestObj as object,
				}
			
			}
			return false
		
		}
		const hasMoreThanOneSlash = ( v: string ) => ( v.match( /\//g ) || [] ).length > 1

		// console.log( 'handleZipFile', {
		// 	file,
		// 	zip,
		// } )

		const withoutFolder = await checkMan( files )
		
		if( withoutFolder ) return withoutFolder

		let folderName: string | undefined = undefined,
			folderNum                      = 0
		for ( const key in files ) {

			const file = files[key]
		
			if( !hasMoreThanOneSlash( file.name ) && !file.name.startsWith( '__' ) && !file.name.startsWith( '.' ) && file.dir === true ) {

				folderName = file.name
				++folderNum
				
			}
			
		}

		if( folderNum !== 1 && folderName ) throw new this.Error( this.errorID.NO_MANIFEST )

		const withFolder = await checkMan( files, folderName )
		if( withFolder ) return {
			...withFolder,
			folder : folderName,
		}

		throw new this.Error( this.errorID.NO_MANIFEST )
	
	}

}
