/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

import { initCache } from './core/cache.mjs'
import {
	execChild, 
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
	on   : async ( { log } ) => {

		const fileNames = await getFilteredFileNames( {
			path       : paths.worksflowsDir,
			extensions : [
				'.yml',
			],
		} )
		
		const data  = {
			file   : 'file',
			inputs : 'inputs',
		}
		const cache = initCache( {
			id     : 'workflow',
			values : {
				[data.file]   : fileNames[0],
				[data.inputs] : `version=${version}`,
			},
		} )

		const answers = await prompt( [
			{
				type    : 'list',
				message : 'Select a workflow to run:',
				choices : fileNames,
				name    : data.file,
				default : cache.get( data.file ),
			},
			{
				name    : data.inputs,
				default : cache.get( data.inputs ),
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

		const createdWorkflow = await execChild( `gh workflow run ${answers.file}.yml ${formattedInputs}` )
		if( createdWorkflow.stderr ) throw Error( 'Error creating workflow' )

		const result = await execChild( 'echo $(gh run list --limit 1 --json databaseId,url --jq \'.[0].url\')' )
		if( result.stdout ) log.info( `GitHub action url: ${result.stdout}` )
		
		cache.set( answers )
	
	},
	onSuccess : ( { log } ) => log.success( `See action progress: ${actionUrl}` ),
} )
