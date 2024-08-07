import {
	execSync, exec, 
} from 'node:child_process'
import { join }      from 'node:path'
import { rename }    from 'node:fs/promises'
import { promisify } from 'node:util'

const execAsync = promisify( exec )

export const isGitHubAuthenticated = () => {

	try {

		const output = execSync( 'gh auth status', {
			encoding : 'utf-8',
		} )
		return output.includes( 'Logged in to github.com' )
	
	} catch ( error ) {

		return false
	
	}

}

/**
 * Downloads a GitHub release asset using the GitHub CLI and optionally renames the final file.
 *
 * @param {object} options               - The options object.
 * @param {string} options.user          - The GitHub username.
 * @param {string} options.repo          - The GitHub project/repository name.
 * @param {string} options.outputPath    - The directory where the file should be saved.
 * @param {string} options.filename      - The name of the file to download.
 * @param {string} [options.version]     - The release version or 'latest' for the latest release.
 * @param {string} [options.newFilename] - The new name for the file after download (if applicable).
 */
export async function downloadGitHubRelease( {
	user,
	repo,
	outputPath,
	filename,
	newFilename,
	version = '',
} ) {

	// console.log( {
	// 	user,
	// 	repo,
	// 	outputPath,
	// 	filename,
	// 	newFilename,
	// 	version,
	// } )
	const outputFilePath = join( outputPath, filename )
	const finalFilePath  = join( outputPath, newFilename || filename )
	const ghCommand      = `gh release download ${version || ''} --repo ${user}/${repo} --pattern ${filename} --dir ${outputPath}`

	try {

		const isAuth = isGitHubAuthenticated()
		if ( !isAuth ) throw new Error( 'You need to authenticate in GitHub via CLI with "gh auth login"' )

		const { stderr } = await execAsync( ghCommand )

		if ( stderr ) {

			console.error( `stderr: ${stderr}` )
			return
		
		}

		console.log( `File downloaded successfully to ${outputFilePath}` )

		if ( newFilename ) {

			await rename( outputFilePath, finalFilePath )
			console.log( `File renamed successfully to ${finalFilePath}` )
		
		}
	
	} catch ( error ) {

		// @ts-ignore
		console.error( `Error: ${error.message}` )
	
	}

}
