/**
 * MAIN.
 *
 * @description File for core shared functions.
 */
import { Fs }                    from './fs'
import { ChildProcess }          from './child-process'
import type { SpinnerFunct }     from './logger'
import { Logger }                from './logger'
import { Vars }                  from './var'
import type { CmdSharedOptions } from './types'
import {
	version, name, 
} from './const'
export class SuperCore {

	protected readonly fs = new Fs()
	protected readonly log = new Logger()
	protected readonly type = new Vars()
	protected readonly childProcess = new ChildProcess()
	protected readonly id = name
	protected readonly version = version
    
	protected isMacos(){

		return process.platform === 'darwin'
	
	}

	globalDefaultParams = {
		verbose : false,
		exit    : false,
		time    : false,
	}
	globalDataQuestion = {
		overwrite : {
			id      : 'overwrite' as const,
			default : true,
		},
	}

	async askOverwriteConfigFile(){

		const res = await this.log.ask( [
			{
				type    : 'confirm',
				name    : this.globalDataQuestion.overwrite.id,
				message : 'Configuration file detected. Do you want to overwrite it?',
				initial : this.globalDataQuestion.overwrite.default,
			},
		] )

		return this.globalDataQuestion.overwrite.id in res ? res[this.globalDataQuestion.overwrite.id] as boolean : this.globalDataQuestion.overwrite.default
	
	}

	async setFunctionConstructor<R extends Required<CmdSharedOptions>, T extends CmdSharedOptions>( { name, defaultValues, values, cb }: {
        name: string
        defaultValues: R
        values: T
        cb: ( { log, values }:{log: SpinnerFunct, values: R & T} ) => Promise<void>
    } ){

		const v = {
			...defaultValues, ...values,
		}

		this.log.verbose = values.verbose || false
		const log        = this.log.spinner( name )
		const time       = this.log.time()
		time.start()
        
		try{    
            
			log.verbose( {
				title : 'Init data:',
				value : values,
			} )

			await cb( {
				log, values : v,
			} )

		}catch( e ){

			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			log.failed( e.message ) || this.log.fatal( e.message )

			if( values.exit ) process.exit( 1 )

		}finally{
            
			time.stop()

			if( values.time ) {
    
				const elapsedTime = ( time.getResult() ).toString()
				if( this.log.verbose ){

					this.log.info( {
						title : `[${name}] Execution time`,
						value : {
							miliseconds : elapsedTime,
							seconds     : Number( elapsedTime ) / 1000,
						},
					} )

				}else{

					this.log.forceInfo( `[${name}] Execution time: ${Number( elapsedTime ) / 1000 } seconds` )

				}
                
			}

		}

	}

}
