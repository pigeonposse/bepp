/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

import {
	exec, 
	prompt,
} from './core/main.mjs'

const main = async () => {

	try {

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
	
	} catch ( error ) {

		console.error( '❌ Error in push script:', error )
	
	}

}

main()
