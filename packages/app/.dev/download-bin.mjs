
import {
	downloadGitHubRelease, 
	decompressFile,
	removePathIfExist, 
	joinPath,
	paths,
} from '@bepp/config/core'

/**
 * DownloadBin.
 *
 * @param {object}   options                 - Options object.
 * @param {string}   options.downloadFile    - Filename of the bin.
 * @param {string[]} options.outputFileNames - Desired output filenames after decompression.
 * @param {string}   [options.outputPath]    - Optional download path.
 */
async function downloadBin( { downloadFile, outputFileNames, outputPath } ) {

	try {

		await downloadGitHubRelease( {
			user     : 'pigeonposse',
			repo     : 'bepp',
			outputPath,
			filename : downloadFile,
		} )

		for ( let i = 0; i < outputFileNames.length; i++ ) {

			const outputFileName = outputFileNames[i]
			const isLastFile = i === outputFileNames.length - 1

			await decompressFile( {
				input   : joinPath( outputPath, downloadFile ),
				output  : outputPath,
				newName : outputFileName,
				remove  : isLastFile, // Remove only for the last file
			} )
		
		}

	} catch ( error ) {

		console.error( `Error in downloadBin: ${error.message}` )
	
	}

}

const downloadPath = joinPath( paths.appDir, 'src-tauri', 'bin' )
const binName      = 'bepp-cli'
const appMark      = '-apple-darwin'
const linuxMark    = '-unknown-linux-gnu'
const winMark      = '-pc-windows-msvc.exe'

await removePathIfExist( downloadPath )

await downloadBin( {
	downloadFile    : 'bepp-macos.zip',
	outputFileNames : [
		binName + '-aarch64' + appMark,
		binName + '-universal' + appMark,
		binName + '-x86_64' + appMark,
	], 
	outputPath : downloadPath, 
} )

await downloadBin( {
	downloadFile    : 'bepp-linux.zip',
	outputFileNames : [
		binName + '-x86_64' + linuxMark,
	], 
	outputPath : downloadPath, 
} )

await downloadBin( {
	downloadFile    : 'bepp-win.exe.zip',
	outputFileNames : [
		binName + '-aarch64' + winMark,
		binName + '-universal' + winMark,
		binName + '-x86_64' + winMark,
	], 
	outputPath : downloadPath, 
} )
