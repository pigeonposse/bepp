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
