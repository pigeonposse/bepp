import {
	mdToHTML, 
	paths, 
	pkg,
	readJSON, 
}   from './core/main.mjs'
import { releaseBody } from './templates/release-body.mjs'

try{

	const jsonAppPath    = paths.appPkg
	const fileAppContent = await readJSON( jsonAppPath )
	const newVersion     = fileAppContent.version
	const readmeTemp     = releaseBody( pkg, newVersion )
	const res            = await mdToHTML( readmeTemp )

	console.log( res )

}catch( e ){

	console.error( 'Error in get release body.', e )
	process.exit()
	
}
