/**
 * Process.
 *
 * @description File for set process functions.
 */
import type { ChildProcessWithoutNullStreams } from 'child_process'
import { spawn }                               from 'child_process'

export type ChildProcessExecuteParams = {
    cmd: string, 
    onError: ( error: Error ) => void, 
    onLog: ( data: string ) => void
}

export class ChildProcess {

	async execute( {
		cmd, 
		onError, 
		onLog,
	}: ChildProcessExecuteParams ) {

		return new Promise<void>( ( resolve, reject ) => {

			// @ts-ignore
			const childProcess: ChildProcessWithoutNullStreams = spawn( cmd, {
				shell : true,
				stdio : [
					'inherit', 'pipe', 'pipe',
				], // Redirigir la salida estándar y de error a cauces
			} )
    
			// Manejar salida estándar
			childProcess.stdout.on( 'data', data => {

				onLog( data.toString() )
			
			} )
    
			// Manejar salida de error
			childProcess.stderr.on( 'data', data => {

				onLog( data.toString() )
			
			} )
    
			// Manejar eventos del proceso hijo
			childProcess.on( 'close', code => {

				if ( code === 0 ) {

					resolve()
				
				} else {

					const error = new Error( `Command failed with code ${code}` )
					onError( error )
					reject( error )
				
				}
			
			} )
    
			// Manejar error al iniciar el proceso hijo
			childProcess.on( 'error', error => {

				onError( error )
				reject( error )
			
			} )
		
		} )
	
	}

	async exec( cmd: string ) {
     
		await new Promise( ( resolve, reject ) => {
    
			const childProcess = spawn( cmd, {
				shell : true,
				stdio : 'inherit',
			} )
    
			// Manejar eventos del proceso hijo
			childProcess.on( 'close', code => {
    
				if ( code === 0 ) {
    
					// @ts-ignore
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

}
