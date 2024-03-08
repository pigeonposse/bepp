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
			browserTypes.chrome, browserTypes.chromium,
		],
	}
	// @ts-ignore
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
			id      : 'build',
			default : this.defaultParams.build,
		},
	}
    
	private async askCreate( values: InitParams ){
        
		const questions = []
		const res       = values

		if ( !values.build ) {

			questions.push( {
				type    : 'checkbox',
				name    : this.dataQuestion.build.id,
				message : 'Select list of browser for build',
				choices : Object.values( browserTypes ),
				default : this.dataQuestion.build.default,
			} )
		
		}

		if ( !values.id ) {

			questions.push( {
				type     : 'input',
				name     : this.dataQuestion.id.id,
				message  : 'Write a ID for your build. This is used for package name',
				default  : this.dataQuestion.id.default,
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
				default : this.dataQuestion.input.default,
			} )
		
		}

		return {
			...res,
			...await this.log.ask( questions ),
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

				const fileExists      = await this.existsConfigFile()
				let override: boolean = true
                
				if ( !values.y && fileExists ) override = await this.askOverwriteConfigFile()
                
				if( !override && fileExists ) { 
                    
					throw new Error( `Config File [${this.configPath}] already exists` )

				} else {
        
					const data  = await this.askCreate( values.y ? {
						...values, input : this.dataQuestion.input.default,
					} : initValues )
					const build = data.build ? data.build.map( d => ( {
						type : d, 
					} ) ) : []
                    
					const defaultConfig = {
						shared : {
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
// @ts-ignore
const init = async ( values?: InitParams ) => await core.create( values )

export {
	init,
}
