import { createBins } from '@bepp/config/bin'
import {
	joinPath, paths, 
} from '@bepp/config/core'

const args    = process.argv.slice( 2 )
let buildType = 'all'
args.forEach( arg => {

	const [
		key, value,
	] = arg.split( '=' )
	if ( key === '--build' ) {

		buildType = value
	
	}

} )

await createBins( {
	binName    : 'bepp-core',
	projectDir : paths.coreDir,
	inputFile  : joinPath( paths.coreDir, 'dist', 'main.js' ),
	build      : buildType,
} )
