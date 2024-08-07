/* eslint-disable jsdoc/require-param-type */

export class Process {

	/**
	 * Hooks the stdout and stderr streams to intercept their outputs.
	 *
	 * @param          callback - A function to be called with the intercepted output.
	 *                          The callback receives four parameters: the output string, encoding, file descriptor, and a boolean indicating if it's stderr.
	 * @returns {void}          - A function to restore the original stdout and stderr behavior.
	 */
	static hookStdout( callback: ( string: string, encoding: BufferEncoding, isError: boolean, fd?: number, ) => void ) {

		const boundProcessStdout = process.stdout.write.bind( process.stdout )
		const boundProcessStderr = process.stderr.write.bind( process.stderr )
		// @ts-ignore
		process.stdout.write = ( string: string, encoding: BufferEncoding, fd?: number ): boolean => {

			boundProcessStdout( string, encoding )
			callback( string, encoding, false, fd )
			return true
		
		}

		// @ts-ignore
		process.stderr.write = ( string: string, encoding: BufferEncoding, fd?: number ): boolean => {

			boundProcessStderr( string, encoding )
			callback( string, encoding, true, fd )
			return true
		
		}

		return () => {

			process.stdout.write = boundProcessStdout
			process.stderr.write = boundProcessStderr
		
		}

	}

}
