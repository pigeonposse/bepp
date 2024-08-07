/**
 * Get releases url.
 *
 * @description Get releases url.
 */
import { extra } from '../../../../package.json'

// @ts-ignore
const downloadUrl = extra.downloadUrl

type DownloadsData = typeof downloadUrl
type DownloadData = DownloadsData[keyof DownloadsData]
type DownloadsGroupData = {
	[key: string]: {
        text: string;
        link: string;
    }[];
}

const groupByType = ( data: DownloadsData ) => {

	const groupedByType: DownloadsGroupData = {}

	for ( const key in data ) {

		if ( Object.prototype.hasOwnProperty.call( data, key ) ) {

			const item: DownloadData = data[key]
			const type               = item.type

			if ( !groupedByType[type] ) groupedByType[type] = []
			if( item.url )
				groupedByType[type].push( {
					text : item.name.replace( 'App', '' ).replace( 'extension', '' ).replace( 'Extension', '' ),
					link : item.url,
				} )
		
		}
	
	}

	return groupedByType

}

export const getReleases = () => {

	const navDownload = groupByType( downloadUrl )
	return [
		{ 
			text  : 'Desktop app', 
			items : navDownload.desktop,
		},
		{ 
			text : 'Executable (Core and Server)', 
	
			items : navDownload.bin,
		},
		{ 
			text  : 'Containers', 
			items : navDownload.container,
		},
	]

}
