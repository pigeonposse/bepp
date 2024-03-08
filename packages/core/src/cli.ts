/**
 * CLI.
 *
 * @description File for set cli.
 */

import { InitCLI }      from './init/cli'
import { BuildCLI }     from './build/cli'
import { setupProgram } from './_shared/cli'

export const run = () => {

	setupProgram( program => {

		const init  = new InitCLI( {
			program, 
		} )
		const build = new BuildCLI( {
			program, 
		} )
		init.run()
		build.run()

	} )

}
