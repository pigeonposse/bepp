
import {
	joinPath, paths, readFile,
	writeFile, 
} from '../core/main.mjs'

export const updateActionVersion = async newVersion => {

	const filePath  = joinPath( paths.workspaceDir, 'action.yml' )
	let fileContent = await readFile( filePath )
  
	const versionRegex = /(@bepp\/bepp@)\d+\.\d+\.\d+/

	if ( versionRegex.test( fileContent ) ) {

		fileContent = fileContent.replace( versionRegex, `$1${newVersion}` )
	
	} else {

		fileContent += `\n    - name: 🧩📦 Install dependencies\n      run: pnpm i -g @bepp/bepp@${newVersion}\n      shell: bash`
	
	}

	await writeFile( filePath, fileContent )

	console.log( `Version updated to ${newVersion} in action.yml` )

}
