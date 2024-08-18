/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

import { initCache } from './core/cache.mjs'
import {
	exec, 
	execProcess, 
	getFilteredFileNames, 
	joinPath, 
	paths, 
	prompt,
} from './core/main.mjs'

await execProcess( {
	name : 'TODO',
	on   : async ( { log } ) => {

		const todoFolderPath = paths.todoDir
		const fileNames      = await getFilteredFileNames( {
			path       : todoFolderPath,
			extensions : [
				'.md',
			],
		} )
		const data           = {
			selectedFile  : 'selectedFile',
			showInConsole : 'showInConsole',
		}
		const cache          = initCache( {
			id     : 'todo',
			values : {
				[data.selectedFile]  : fileNames[0],
				[data.showInConsole] : true,
			},
		} )
		
		const logFilesPathList = async () => {
			
			const list = fileNames.map( file => ( {
				name : file.replace( '.md', '' ),
				path : joinPath( todoFolderPath, file ),
			} ) )

			log.info( {
				description : 'List of files in the "TODO" folder:',
				list,
			} )

		}

		const logFilePath = async fileName => {

			const list =  {
				name : fileName,
				path : joinPath( todoFolderPath, fileName + '.md' ) ,
			} 

			log.info( {
				description : 'List of files in the "TODO" folder:',
				list,
			} )
		
		}
		const logFileContent = async fileName => {

			const selectedFilePath = joinPath( todoFolderPath, fileName + '.md' )

			console.group()
			await exec( 'md ' + selectedFilePath )
			console.groupEnd()
		
		}
		let secondAns 
		const firstAnswers = await prompt( [
			{
				type    : 'list',
				name    : data.selectedFile,
				message : 'Select a file from the "TODO" folder:',
				choices : [
					...fileNames, 
					'All'
					,'Exit',
				],
				default : cache.get( data.selectedFile ),
			},
		] )

		if ( firstAnswers.selectedFile !== 'Exit' ) {

			secondAns = await prompt( [
				{
					type    : 'confirm',
					name    : data.showInConsole,
					message : 'Do you want to show the selected file in the console?',
					default : cache.get( data.showInConsole ),
				},
			] )

			if ( firstAnswers.selectedFile !== 'All' ) {

				if ( secondAns.showInConsole ) 
					await logFileContent( firstAnswers.selectedFile )

				await logFilePath( firstAnswers.selectedFile )
			
			}else {

				if ( secondAns.showInConsole ) {

					for ( const fileName of fileNames ) {

						await logFileContent( fileName )
				
					}
				
				}
		
				await logFilesPathList()
			
			}

		} else log.info( '✨ Exit from TODOs' )

		cache.set( {
			[data.selectedFile]  : firstAnswers.selectedFile,
			[data.showInConsole] : typeof secondAns.showInConsole == 'boolean' ? secondAns.showInConsole : true,
		} )
	
	},

} )
