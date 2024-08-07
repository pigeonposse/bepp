import { Fs }     from './fs'
import {
	pkg, joinPath,
} from '../../../../.dev/core/main.mjs'

const filesystem = new Fs()
const configDir  = joinPath( pkg.dir, 'packages','_config' )
await filesystem.compress( {
	inputPath  : joinPath( configDir, 'exts-examples','chromium' ),
	outputPath : joinPath( configDir, 'dist' ),
	outputName : 'chromium-compress-test',
	format     : 'zip',
} )
