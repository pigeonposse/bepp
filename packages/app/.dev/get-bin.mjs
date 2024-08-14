
import {
	joinPath,
	removePathIfExist,
	copyFile,
	existPath,
	createDir,
	getPlatform,
	getArch, 
	paths,
} from '@bepp/config/core'
import { binName } from '../../api/.dev/const.js'

const binsPath     = joinPath( paths.apiDir, 'build', 'bin' )
const downloadPath = joinPath( paths.appDir, 'src-tauri', 'bin' )
const binGetName   = binName

const onlyOneBin = true
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
			...( !onlyOneBin ? [
				binSetName + '-aarch64' + appleMark,
			] : [] ),
			...( platform === 'macos' && arch === 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-aarch64' + appleMark,
				] : [] ),
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )

	await getBin( {
		downloadFile    : binGetName + '-macos-x64',
		outputFileNames : [
			...( !onlyOneBin ? [
				binSetName + '-universal' + appleMark,
				binSetName + '-x86_64' + appleMark,
			] : [] ),
			...( platform === 'macos' && arch !== 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-x86_64' + appleMark,
				] : [] ),
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )

	// LINUX
	await getBin( {
		downloadFile    : binGetName + '-linux-arm64',
		outputFileNames : [
			...( !onlyOneBin ? [
				binSetName + '-aarch64' + linuxMark,
			] : [] ),
			...( platform === 'linux' && arch === 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-aarch64' + linuxMark,
				] : [] ),
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )
	await getBin( {
		downloadFile    : binGetName + '-linux-x64',
		outputFileNames : [
			...( !onlyOneBin ? [
				binSetName + '-x86_64' + linuxMark,
			] : [] ),
			...( platform === 'linux' && arch !== 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-x86_64' + linuxMark,
				] : [] ),
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )
	
	// WIN
	await getBin( {
		downloadFile    : binGetName + '-win-x64.exe',
		outputFileNames : [
			...( !onlyOneBin ? [
				binSetName + '-universal' + winMark,
				binSetName + '-x86_64' + winMark,
			] : [] ),
			...( platform === 'windows' && arch === 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-x86_64' + winMark,
				] : [] ),
			] : [] ),
		], 
		outputPath : downloadPath, 
	} )

	await getBin( {
		downloadFile    : binGetName + '-win-arm64.exe',
		outputFileNames : [
			...( !onlyOneBin ? [
				binSetName + '-aarch64' + winMark,
			] : [] ),
			...( platform === 'windows' && arch !== 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-aarch64' + winMark,
				] : [] ),
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
			if( !exists ) return
			// if( !exists ) throw new Error( 'Bin does not exist in ' + file )
			if( outputFileNames.length <= 0 ) return

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
