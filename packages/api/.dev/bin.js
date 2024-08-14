import { createBins } from '@bepp/config/bin'
import {
	joinPath, paths, 
} from '@bepp/config/core'

await createBins( {
	binName    : 'bepp-api',
	projectDir : paths.apiDir,
	inputFile  : joinPath( paths.apiDir, 'dist', 'node.js' ),
} )
