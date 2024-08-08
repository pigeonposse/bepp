import { SuperCore }       from '../_shared/main'
import { browserTypes }    from '../_shared/types'
import type { InitParams } from './types'

export class InitCore extends SuperCore {

	private readonly configPathName = `${this.id}.config.json`
	private readonly configPath = this.fs.getAbsolutePath( this.configPathName )

	defaultParams = {
		...this.globalDefaultParams,
		y     : false,
		id    : this.id,
		build : [
			browserTypes.chrome, 
			browserTypes.chromium,
		],
	}

	dataQuestion = {
		...this.globalDataQuestion,
		id : {
			id      : 'id',
			default : this.defaultParams.id,
		},
		input : {
			id      : 'input',
			default : './exts/chrome',
		},
		build : {
			id      : 'build' as const,
			default : this.defaultParams.build,
		},
	}
    
	async #askCreate( values: InitParams ){
        
		const questions: Parameters<typeof this.log.ask>[0] = []
		const res                                           = values

		if ( !values.build ) {

			questions.push( {
				type    : 'multiselect',
				name    : this.dataQuestion.build.id,
				message : 'Select list of browser for build',
				// @ts-ignore
				choices : Object.values( browserTypes ),
				initial : this.dataQuestion.build.default,
			} )
		
		}

		if ( !values.id ) {

			questions.push( {
				type     : 'input',
				name     : this.dataQuestion.id.id,
				message  : 'Write a ID for your build. This is used for package name',
				initial  : this.dataQuestion.id.default,
				validate : ( input: string ) =>{

					if ( input.includes( ' ' ) ) return 'The string cannot contain spaces'
					return true
				
				},
			} )
		
		}

		if ( !values.input ) {

			questions.push( {
				type    : 'input',
				name    : this.dataQuestion.input.id,
				message : 'Write a input path for where your Chrome extension is located',
				initial : this.dataQuestion.input.default,
			} )
		
		}
		const answers = await this.log.ask( questions )
	
		return {
			...res,
			...answers,
		}
	
	}

	private async existsConfigFile(){

		return await this.fs.existsFile( this.configPath )
	
	}

	async create( values: InitParams ){

		const initValues = values
		await this.setFunctionConstructor( {
			name          : 'init',
			defaultValues : this.defaultParams,
			values        : initValues,
			cb            : async ( { values } ) => {

				// console.log( values )
				const fileExists      = await this.existsConfigFile()
				let override: boolean = true
				
				// necesary for function mode
				// if( typeof values.input !== 'string' || values.input !== undefined ) throw Error( 'Input must be a string | undefined' )
				
				if ( !values.y && fileExists ) override = await this.askOverwriteConfigFile()
                
				if( !override && fileExists ) { 
                    
					throw new Error( `Config File [${this.configPath}] already exists` )

				} else {
        
					const data = await this.#askCreate( values.y ? {
						input : this.dataQuestion.input.default,
						...values, 
					} : initValues )
					if( data.input !== 'string' ) this.log.fatal( 'Input must be a string' )
					const build = data.build ? data.build.map( d => ( {
						type : d, 
					} ) ) : []
			
					const schemaUrl = this.version ? 
						`https://raw.githubusercontent.com/pigeonposse/bepp/${this.version}/packages/core/schema.json` :
						'https://raw.githubusercontent.com/pigeonposse/bepp/main/packages/core/schema.json'
					
					const defaultConfig = {
						$schema : schemaUrl,
						shared  : {
							id    : data.id, 
							input : {
								chromium : data.input,
							},
						},
						build,
					}
        
					await this.fs.writeFile(
						this.configPath,
						JSON.stringify( defaultConfig, null, 2 ),
					)
				
				}
			
			},
		} )

	}

}

const core = new InitCore()

/**
 * Initializes config file creation with the specified parameters.
 *
 * @param   {InitParams | undefined} [values] - Optional initialization parameters.
 * @returns {Promise<void>}                   - A promise representing the creation.
 * @see https://bepp.pigeonposse.com/guide/init
 */
// @ts-ignore
const init = async ( values?: InitParams ) => await core.create( values )

export {
	init,
}
