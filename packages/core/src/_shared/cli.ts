/**
 * Cli.
 *
 * @description File for set cli functions.
 */
import {
	version, name, description, docsPath,
} from './const'

import {
	Command, Option, 
} from '@commander-js/extra-typings'
import { Logger }                                                                                              from './logger'
import chalk                                                                                                   from 'chalk'
import type {
	CLIParams, CmdConstructor, CmdParams, OptionArrayParams, OptionBooleanParams, OptionStringParams, Program, 
} from './types'
import type { OptionValues } from '@commander-js/extra-typings'

const moreInfoLink = ( path: string | undefined = undefined ) => `\nMore info: ${chalk.italic.gray.underline( 'https://bepp.pigeonposse.com' + docsPath + ( path ? path : '' ) )}\n`

export const setupProgram = ( cb: ( program: Program ) => void ) => {
    
	const program = new Command()

	program
		.name( name )
		.description( chalk.blackBright( description ) )
		.addHelpText( 'after', moreInfoLink( ) )
		.version( chalk.green( version ), '-V, --version', chalk.gray( 'Output the version number' ) )
		.helpOption( '-h, --help',chalk.gray( 'Display help for command' ) )
		.helpCommand( 'help [command]', chalk.gray( 'Display help for command' ) )
        
	if ( typeof cb === 'function' ) cb( program )

	program.parse()

}

export class SuperCLI {

	protected program
	protected name = name
	protected version = version
	protected log = new Logger()
    
	constructor( args: CLIParams ){

		this.program = args.program

		this.program.configureOutput( {
			outputError : ( str, write ) => {

				if ( str.startsWith( 'error: ' ) ){
                
					const message = str.replace( 'error: ', '' )
					this.log.fatal( message )

				}else
					write( str )

			},
		} )
	
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	private addOptions<Args extends unknown[] = [], Opts extends OptionValues = {}>( cmdInstance: Command<Args, Opts> ) {
        
		const baseOption = ( value: string, desc: string, defaultValue: unknown ) => {
            
			const option = new Option(
				value, 
				chalk.gray( desc ),
			)
			if( defaultValue ) option.default( defaultValue )
			return option
		
		}

		const opts = {
			addOptionBool : ( { value, desc, defaultValue }: OptionBooleanParams ) => {
        
				const option = baseOption( value.toString(), desc, defaultValue )
                
				return cmdInstance.addOption( option )
        
			},
			addOptionArray : ( { value, desc, defaultValue, name, choices }: OptionArrayParams ) => {

				const nameString = `<${name}...>`
				const option     = baseOption( `${value.toString()} ${nameString}`, desc, defaultValue )
        
				if( choices ) option.choices( choices )
                
				return cmdInstance.addOption( option )
        
			},
			addOptionString : ( { value, desc, defaultValue, name, choices }: OptionStringParams ) => {

				const nameString = `<${name}>`
				const option     = baseOption( `${value.toString()} ${nameString}`, desc, defaultValue )
        
				if( choices ) option.choices( choices )
                
				return cmdInstance.addOption( option )
        
			},
		}
        
		return opts

	}

	private addCMD( { value, desc, infoPath = undefined }: CmdParams, action: CmdConstructor['action'] ){

		const cmdInstance = this.program
			.command( value )
			.description( chalk.blackBright( desc ) )
			.addHelpText( 'after',moreInfoLink( infoPath ) )
			.action( action )

		return {
			...this.addOptions( cmdInstance ),
		}
	
	}

	protected CMDConstructor( { cmd, options, action }: CmdConstructor ){

		const command = this.addCMD(
			cmd,
			action,
		)

		options.forEach( opt => {

			if ( opt.type === 'boolean' ) {

				command.addOptionBool( opt )
			
			} else if ( opt.type === 'string' ) {

				command.addOptionString( opt )
			
			} else if ( opt.type === 'array' ) {

				command.addOptionArray( opt )
			
			}
		
		} )

		command.addOptionBool( {
			value : [
				'-v', '--verbose',
			],
			desc : 'Use verbose output',
		} )

		command.addOptionBool( {
			value : [
				'-t', '--time',
			],
			desc : 'Print execution time',
		} )
		command.addOptionBool( {
			value : [
				'-e','--exit',
			], 
			desc : 'Force exit from process on error',
		} )

	}

}
