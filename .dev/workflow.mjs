/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

import {
	exec, 
	execProcess, 
	getFilteredFileNames, 
	joinUrl, 
	paths, 
	prompt,
	readJSON,
} from './core/main.mjs'

const getAppVersion = async () => {

	const packageJsonPath = paths.appPkg
	const packageJson     = await readJSON( packageJsonPath )
	return packageJson.version

}
const getActionsUrl = async () => {

	const packageJsonPath = paths.workspacePkg
	const packageJson     = await readJSON( packageJsonPath )
	return joinUrl( packageJson.repository.url, 'actions' )

}
const version   = await getAppVersion()
const actionUrl = await getActionsUrl()

await execProcess( {
	name : 'WORKFLOW',
	on   : async ( ) => {

		const fileNames = await getFilteredFileNames( {
			path       : paths.worksflowsDir,
			extensions : [
				'.yml',
			],
		} )

		const answers = await prompt( [
			{
				type    : 'list',
				name    : 'selectedFile',
				message : 'Select a workflow to run:',
				choices : fileNames,
			},
			{
				name    : 'inputs',
				default : `version=${version}`,
				message : `Set inputs for workflow in comma separed.\nExample: version=${version},platform=ubuntu-22.04\n`,
			},
		] )
		
		let formattedInputs = ''
		if ( answers.inputs ) {

			const inputsArray = answers.inputs.split( ',' ).map( input => input.trim() )
			formattedInputs   = inputsArray
				.map( input => {

					const [
						key, value,
					] = input.split( '=' )
					return `-f ${key}=${value}`
				
				} )
				.join( ' ' )
		
		}

		await exec( `gh workflow run ${answers.selectedFile}.yml ${formattedInputs}` )
	
	},
	onSuccess : ( { log } ) => log.success( `See action progress: ${actionUrl}` ),
} )
