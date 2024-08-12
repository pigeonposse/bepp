
import {
	joinPath,
	removePathIfExist,
	copyFile,
	existPath,
	createDir,
	getPlatform,
	getArch, 
	paths,
	readJSON,
} from '@bepp/config/core'

const binsPath     = joinPath( paths.apiDir, 'build', 'bin' )
const downloadPath = joinPath( paths.appDir, 'src-tauri', 'bin' )
const apiPkg       = await readJSON( joinPath( paths.apiDir,'pkg.config.json' ) )
const binGetName   = apiPkg.name

const binSetName = 'bepp-server'
const appleMark  = '-apple-darwin'
const linuxMark  = '-unknown-linux-gnu'
const winMark    = '-pc-windows-msvc.exe'

const run = async () =>{

	await removePathIfExist( downloadPath )
	await createDir( downloadPath )

	const platform = await getPlatform()
	const arch     = await getArch()
	
	console.log( {
		arch, platform,
	} )

	// MACOS
	await getBin( {
		downloadFile    : binGetName + '-macos-arm64',
		outputFileNames : [
			binSetName + '-aarch64' + appleMark,
			...( platform === 'macos' && arch === 'arm64' ? [
				binSetName,
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )

	await getBin( {
		downloadFile    : binGetName + '-macos-x64',
		outputFileNames : [
			binSetName + '-universal' + appleMark,
			binSetName + '-x86_64' + appleMark,
			...( platform === 'macos' && arch !== 'arm64' ? [
				binSetName,
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )

	// LINUX
	await getBin( {
		downloadFile    : binGetName + '-linux-arm64',
		outputFileNames : [
			binSetName + '-aarch64' + linuxMark,
			...( platform === 'linux' && arch === 'arm64' ? [
				binSetName,
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )
	await getBin( {
		downloadFile    : binGetName + '-linux-x64',
		outputFileNames : [
			binSetName + '-x86_64' + linuxMark,
			...( platform === 'linux' && arch !== 'arm64' ? [
				binSetName,
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )
	
	// WIN
	await getBin( {
		downloadFile    : binGetName + '-win-x64.exe',
		outputFileNames : [
			binSetName + '-universal' + winMark,
			binSetName + '-x86_64' + winMark,
			...( platform === 'windows' && arch === 'arm64' ? [
				binSetName,
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )

	await getBin( {
		downloadFile    : binGetName + '-win-arm64.exe',
		outputFileNames : [
			binSetName + '-aarch64' + winMark,
			...( platform === 'windows' && arch !== 'arm64' ? [
				binSetName,
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )

	/**
	 * GetBin..
	 *
	 * @param {object}   options                 - Options object.
	 * @param {string}   options.downloadFile    - Filename of the bin.
	 * @param {string[]} options.outputFileNames - Desired output filenames after decompression.
	 * @param {string}   [options.outputPath]    - Optional download path.
	 */
	async function getBin( { downloadFile, outputFileNames, outputPath } ) {

		try {

			// console.log( {
			// 	downloadFile, outputFileNames, outputPath, 
			// } )
			const file   = joinPath( binsPath, downloadFile )
			const exists = existPath( file )
			if( !exists ) throw new Error( 'Bin does not exist in ' + file )
			for ( let i = 0; i < outputFileNames.length; i++ ) {

				await copyFile( {
					input  : file,
					output : joinPath( outputPath, outputFileNames[i] ),
				} )
		
			}

		} catch ( error ) {

			console.error( `Error in downloadBin: ${error.message}` )
	
		}

	}

}
run()