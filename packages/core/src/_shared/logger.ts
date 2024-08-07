/**
 * LOGGER.
 *
 * @description File for set logger functions.
 */
import { Spinner } from '@topcli/spinner'
import pino        from 'pino'
import chalk       from 'chalk'
import pretty      from 'pino-pretty'
import enquirer    from 'enquirer'

export type SpinnerFunct = ReturnType< Logger['spinner']>

export class Logger {

	private log = pino(
		{
			level : 'debug',
		}, 
		pretty( {
			colorize : true,
			ignore   : 'pid,hostname,time',
		},
		) )
    
	verbose = false

	spinner( withPrefix: string ){

		const instance = new Spinner( {
			name : 'line',
		} )
  
		return {
			start : ( txt: string ) => {

				if ( this.verbose ) {

					this.info( txt )
				
				} else {

					instance.start( txt, {
						withPrefix : chalk.blue( withPrefix ) + ' - ', 
					} )
				
				}
			
			},
			changeText : ( txt: string ) => {

				if ( this.verbose ) {

					this.info( txt )
				
				} else {

					instance.text = txt
				
				}
			
			},
			getTime : () => instance.elapsedTime.toFixed( 2 ),
			succeed : ( txt: string ) => {

				if ( this.verbose ) {

					this.info( txt )
				
				} else {

					instance.succeed( chalk.green( txt ) )
				
				}
			
			},
			failed : ( txt: string ) => {

				if ( this.verbose ) {

					this.error( txt )
				
				} else {

					instance.failed( chalk.red( txt ) )
				
				}
			
			},
			reset        : () => Spinner.reset(),
			verbose      : ( data: string | object ) => this.info( data ),
			verboseError : ( data: string | object ) => this.fatal( data ),
		}

	}
	ask = enquirer.prompt
	// async ask( questions: Parameters<typeof enquirer.prompt>[0] ){
		
	// 	return await enquirer.prompt( questions )
	
	// }
    
	time(){

		let start: number | undefined, 
			stop: number | undefined

		return { 
			start : () => {

				start = performance.now()
			
			},
			stop : () => {

				stop = performance.now()
			
			},
			getResult : () => {

				if( start && stop ) return stop - start
				return false
			
			},
		}
	
	}
	forceInfo( data: string | object ){

		this.log.info( data )

	}
	info( data: string | object ){

		if( this.verbose ) this.log.info( data )

	}
	error( data: string | object ){

		this.log.error( data )

	}
	warn( data: string | object ){

		if( this.verbose ) this.log.warn( data )

	}
	debug( data: string | object ){

		if( this.verbose ) this.log.debug( data )

	}
	fatal( data: string | object ){
   
		this.log.fatal( data )
		process.exit( 1 )
	
	}

}
