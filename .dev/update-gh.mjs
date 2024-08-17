/**
 * Change GH Data.
 *
 * @description Change GH Data.
 */

import {
	joinPath, 
	object2string, 
	paths,
	removePathIfExist,
	writeFile,
	pkg as pkgJson,
	execChild,
	execProcess,
} from './core/main.mjs'

await execProcess( {
	name : 'UPDATE GH INFO',
	on   : async ( ) => {
	
		const tempFilePath = joinPath( paths.tempDir, 'topics.json' )

		try {

			const pkg    = pkgJson.data
			pkg.keywords = Array.isArray( pkg.keywords ) ? pkg.keywords.slice( 0, 19 ) : []
 
			const topicData = {
				names : pkg.keywords,
			}

			await writeFile( tempFilePath, object2string( topicData ) )

			const cmds = [
				`gh repo edit ${pkg.repository.url} -d "${pkg.description}" -h "${pkg.homepage}"`,
				`gh api -X PUT /repos/${ pkg.extra.collective.id}/${pkg.name}/topics --input '${tempFilePath}'`,
			]

			for ( const cmd of cmds ) {

				try {

					const { stdout, stderr } = await execChild( cmd )
					if ( stderr ) throw Error( stderr )

					console.log( `✅ Successfully exec "${cmd}".\n\tstdout: ${stdout || 'Nothing'}` )
			
				} catch ( error ) {
        
					throw Error( `CMD "${cmd}":` + error.message )
			
				}
		
			}
	
		} catch ( error ) {

			console.error( 'Error in gh update.', error )
			process.exit()
	
		}finally{

			await removePathIfExist( paths.tempDir )
	
		}

	},
} )
