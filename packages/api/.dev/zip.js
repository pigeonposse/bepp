import {
	zipFilesInDirectory, 
	paths, 
	joinPath,
} from '@bepp/config/core'

zipFilesInDirectory(
	joinPath( paths.apiDir, 'build', 'bin' ),
	joinPath( paths.apiDir, 'build', 'zip' ),
)
