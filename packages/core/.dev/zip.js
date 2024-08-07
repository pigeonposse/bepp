import {
	zipFilesInDirectory, 
	paths, 
	joinPath,
} from '@bepp/config/core'

zipFilesInDirectory(
	joinPath( paths.coreDir, 'build', 'bin' ),
	joinPath( paths.coreDir, 'build', 'zip' ),
)
