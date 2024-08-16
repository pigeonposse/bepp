
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

const onlyOneBin = process.argv.slice( 2 ) == '--only-one-bin'
const binSetName = 'bepp-server'
const appleMark  = '-apple-darwin'
const linuxMark  = '-unknown-linux-gnu'
const winMark    = '-pc-windows-msvc.exe'

const run = async () =>{

	await removePathIfExist( downloadPath )
	await createDir( downloadPath )

	const platform = await getPlatform()
	const arch     = await getArch()

	const getDownloadFileName = ( name, ext ) => `${binGetName}-${name}${arch === 'arm64' ? `-${ext}` : '' }${name === 'win' ? '.exe' : ''}`
	const getOutputsArm       = ( mark, plat ) => {

		return [
			...( !onlyOneBin ? [
				binSetName + '-aarch64' + mark,
			] : [] ),
			...( platform === plat && arch === 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-universal' + mark,
					binSetName + '-x86_64' + mark,
					binSetName + '-aarch64' + mark,
				] : [] ),
			] : [] ),
		] 

	}
	const getOutputsx86       = ( mark, plat ) => {

		return [
			...( !onlyOneBin ? [
				binSetName + '-universal' + mark,
				binSetName + '-x86_64' + mark,
			] : [] ),
			...( platform === plat && arch !== 'arm64' ? [
				binSetName,
				...( onlyOneBin ? [
					binSetName + '-x86_64' + mark,
				] : [] ),
			] : [] ),
		] 

	}
	const binData             = [
		// MACOS
		{
			downloadFile    : getDownloadFileName( 'macos', 'arm64' ),
			outputFileNames : getOutputsArm( appleMark, 'macos' ), 
			outputPath      : downloadPath, 
		},
		{
			downloadFile    : getDownloadFileName( 'macos', 'x64' ),
			outputFileNames : getOutputsx86( appleMark, 'macos' ), 
			outputPath      : downloadPath, 
		},
		// LINUX
		{
			downloadFile    : getDownloadFileName( 'linux', 'arm64' ),
			outputFileNames : getOutputsArm( linuxMark, 'linux' ), 
			outputPath      : downloadPath, 
		},
		{
			downloadFile    : getDownloadFileName( 'linux', 'x64' ),
			outputFileNames : getOutputsx86( linuxMark, 'linux' ), 
			outputPath      : downloadPath, 
		},
		// WIN
		{
			downloadFile    : getDownloadFileName( 'win', 'arm64' ),
			outputFileNames : getOutputsArm( winMark, 'windows' ), 
			outputPath      : downloadPath, 
		},
		{
			downloadFile    : getDownloadFileName( 'win', 'x64' ),
			outputFileNames : getOutputsx86( winMark, 'windows' ), 
			outputPath      : downloadPath, 
		},
	]
	
	console.log( {
		arch, 
		platform,
		binData,
	} )

	for ( let index = 0; index < binData.length; index++ ) {

		const data = binData[index]
		if( data.outputFileNames ) await getBin( data )
	
	}

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

				const output = joinPath( outputPath, outputFileNames[i] )
				const exist  = existPath( output )

				if( exist )
					await copyFile( {
						input : file,
						output,
					} )
				else console.log( output + ' no exists' )
		
			}

		} catch ( error ) {

			console.error( `Error in downloadBin: ${error.message}` )
	
		}

	}

}
run()
