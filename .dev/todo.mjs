/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

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
	on   : async ( ) => {

		const todoFolderPath = paths.todoDir
		const fileNames      = await getFilteredFileNames( {
			path       : todoFolderPath,
			extensions : [
				'.md',
			],
		} )

		const logFilesPathList = async () => {

			console.group( '\nList of files in the "TODO" folder:' )
			fileNames.forEach( file =>
				console.log( '- 🔗 ' + file.replace( '.md', '' ) + ': ' + joinPath( todoFolderPath, file ) ),
			)
			console.groupEnd()

		}

		const logFilePath    = async fileName => {

			console.group( '\nTODO file path:' )
			console.log( '- 🔗 ' + fileName + ': ' + joinPath( todoFolderPath, fileName + '.md' ) )
			console.groupEnd()
		
		}
		const logFileContent = async fileName => {

			const selectedFilePath = joinPath( todoFolderPath, fileName + '.md' )
			console.log( '\nFile content:\n' )
			console.group()
			await exec( 'md ' + selectedFilePath )
			console.groupEnd()
		
		}

		const firstAnswers = await prompt( [
			{
				type    : 'list',
				name    : 'selectedFile',
				message : 'Select a file from the "TODO" folder:',
				choices : [
					...fileNames, 'All','Exit',
				],
			},
		] )

		if ( firstAnswers.selectedFile !== 'Exit' ) {

			const answers = await prompt( [
				{
					type    : 'confirm',
					name    : 'showInConsole',
					message : 'Do you want to show the selected file in the console?',
				},
			] )

			if ( firstAnswers.selectedFile !== 'All' ) {

				if ( answers.showInConsole ) 
					await logFileContent( firstAnswers.selectedFile )

				await logFilePath( firstAnswers.selectedFile )
			
			}else {

				if ( answers.showInConsole ) {

					for ( const fileName of fileNames ) {

						await logFileContent( fileName )
				
					}
				
				}
		
				await logFilesPathList()
			
			}

		} else console.log( '✨ Exit from TODOs' )
	
	},

} )
