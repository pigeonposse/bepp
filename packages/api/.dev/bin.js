import { createBins } from '@bepp/config/bin'
import {
	joinPath, paths, 
} from '@bepp/config/core'
import { binName } from './const.js'

await createBins( {
	binName,
	projectDir : paths.apiDir,
	inputFile  : joinPath( paths.apiDir, 'dist', 'node.js' ),
} )
