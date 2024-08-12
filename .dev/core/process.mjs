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
