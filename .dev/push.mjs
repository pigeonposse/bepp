/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

import {
	exec, 
	execProcess, 
	joinUrl, 
	paths, 
	prompt,
	readJSON,
} from './core/main.mjs'

await execProcess( {
	name : 'PUSH REPO',
	on   : async ( { log } ) => {

		const getRepoUrl = async () => {

			const packageJsonPath = paths.workspacePkg
			const packageJson     = await readJSON( packageJsonPath )
			return joinUrl( packageJson.repository.url )
		
		}
		const answers = await prompt( [
			{
				name    : 'add',
				message : 'Git add',
				default : '.',
			},
			{
				name    : 'origin',
				default : 'main',
				message : 'push origin',
			},
		] )

		await exec( `git add ${answers.add} && pnpm cm && git push -f origin ${answers.origin}` )

		log.success( `Successfully commit to ${await getRepoUrl()}\n` )
		
		const answersAfter = await prompt( [
			{
				type    : 'confirm',
				name    : 'workflow',
				default : false,
				message : 'Run workflow',
			},
		] )
		if( answersAfter.workflow ){

			await exec( 'pnpm run-workflow' )
		
		}
	
	},
} )

