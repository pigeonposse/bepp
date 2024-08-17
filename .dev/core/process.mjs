// @ts-nocheck
import { spawn } from 'node:child_process'
import inquirer  from 'inquirer'

export const isDev = () => process.env.NODE_ENV !== 'production'
export const prompt = inquirer.prompt

export const exec = async cmd => {

	console.log( `🐢 CMD: ${cmd}` )
 
	await new Promise( ( resolve, reject ) => {

		const childProcess = spawn( cmd, {
			shell : true,
			stdio : 'inherit',
		} )

		// Manejar eventos del proceso hijo
		childProcess.on( 'close', code => {

			if ( code === 0 ) {

				// El proceso hijo terminó con éxito
				resolve()
				
			} else {

				// El proceso hijo falló
				const error = new Error( `Command failed with code ${code}` )
				console.error( error )
				reject( error )
				
			}
			
		} )
		
	} )

}

export const execChild = async cmd => {

	return new Promise( ( resolve, reject ) => {

		const childProcess = spawn( cmd, {
			shell  : true,
			stdout : 'pipe',
			stderr : 'pipe',
		} )

		let stdout = '',
			stderr = ''

		childProcess.stdout.on( 'data', data => {

			stdout += data.toString()
		
		} )

		childProcess.stderr.on( 'data', data => {

			stderr += data.toString()
		
		} )

		childProcess.on( 'close', code => {

			if ( code === 0 ) {

				resolve( {
					stdout, stderr, 
				} )
			
			} else {

				const error  = new Error( `Command failed with code ${code}` )
				error.stdout = stdout
				error.stderr = stderr
				console.error( error )
				reject( error )
			
			}
		
		} )

		// Maneja errores del proceso
		childProcess.on( 'error', err => {

			reject( err )
		
		} )
	
	} )

}

/**
 * Executes a process with logging and error handling.
 *
 * @param   {object}        options             - Options for the process execution.
 * @param   {string}        options.name        - The name of the process, used in logs.
 * @param   {Function}      options.on          - The main function to execute the process. Receives an object with the `log` utility.
 * @param   {Function}      [options.onError]   - On success function.
 * @param   {Function}      [options.onSuccess] - Optional exit handling function for graceful exits. Receives an object with `log`.
 * @param   {Function}      [options.onExit]    - Optional exit handling function for graceful exits. Receives an object with `log`.
 * @returns {Promise<void>}                     - Resolves when the process execution completes.
 * @example
 * const onProcess = async ({ log }) => {
 *     log.info('Starting the process...');
 *     // Your process logic here
 *     log.success('Process completed successfully.');
 * };
 *
 * const onError = async ({ log, error }) => {
 *     log.error('An error occurred:', error);
 * };
 *
 * execProcess({
 *     name: 'MyProcess',
 *     on: onProcess,
 *     onError,
 * });
 */
export const execProcess = async ( { name, on, onError, onExit, onSuccess } ) => {

	const isDebugMode = process.argv.includes( '--debug' )
	const log         = {
		debug : data => {

			if( isDebugMode )console.debug( `\n🐦⬛ [${name}]`, data )
		
		},
		info    : data => console.log( `\n🐦🟦 [${name}]`, data ),
		success : data => console.log( `\n🐦✅ [${name}]`, data ),
		warn    : data => console.warn( `\n🐦🟡 [${name}]`, data ),
		error   : data => console.error( `\n🐦❌ [${name}] Error: `, data ),
	}

	try {

		log.info( 'Init process \n' )

		console.group()
		await on( {
			log,
		} )
		console.groupEnd()

		if( onSuccess ) await onSuccess( {
			log,
		} )
		else log.success( 'Process executed successfully \n' )
	
	} catch ( error ) {

		console.groupEnd()
		if( error.name === 'ExitPromptError' ){
			
			if( onExit ) await onExit( {
				log,
			} )
			else log.warn( 'Exit from process' )
		
		}else {

			if( onExit ) await onError( {
				log, error,
			} )
			else log.error( error )
		
		}
	
	}

}
