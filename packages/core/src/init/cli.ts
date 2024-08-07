
import { InitCore } from './main'
import { SuperCLI } from '../_shared/cli'

export class InitCLI extends SuperCLI {

	core = new InitCore()

	run(){
        
		this.CMDConstructor( {
			cmd : {
				value    : 'init',
				desc     : 'Create a config file for build extension',
				infoPath : 'init',
			},
			options : [
				{
					type  : 'boolean',
					value : [
						'-y', 
					],
					desc         : 'No prompt questions are set',
					defaultValue : this.core.defaultParams.y,
				},
				{
					type  : 'string',
					value : [
						'--id', 
					],
					name         : 'extension-name',
					desc         : 'Identification for build. Used in filename build.',
					defaultValue : this.core.defaultParams.id,
				},
				{
					type  : 'string',
					value : [
						'-i', '--input', 
					],
					name : 'input-path',
					desc : 'Input directory for Chromium extension',
				},
				{
					type  : 'array',
					value : [
						'-b', '--build', 
					],
					name    : 'browser-ids',
					desc    : 'List for browser builds',
					choices : this.core.defaultParams.build,
				},
			],
			action : this.core.create.bind( this.core ),
		} )

	}

}

// const init = new InitCLI()
// init.run()
