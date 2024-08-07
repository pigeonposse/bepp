import type { ExtensionStoreId } from 'exts/_shared/manifest/types'

type ExtensionData = {
	store : ExtensionStoreId
	id : string
	url : string
	downloadURL : string
}

export interface SearchBrowserStore<QueryRes extends ExtensionData[], UrlRes extends ExtensionData> {
	/**
	 * Browser urls for search extensions.
	 */
	urls: string[]
	/**
	 * Get extensions data list by keyword.
	 */
	getByQuery( value: string ): Promise<QueryRes | undefined>
	/**
	 * Get extension data by url.
	 */
	getByUrl( url: string ): Promise<UrlRes | undefined>
}
