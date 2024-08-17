/**
 * Readme.
 *
 * @description Readme.
 */

import { readme } from './templates/readme.mjs'
import {
	pkg, 
	addTextBetweenAMark,
	execProcess, 
} from './core/main.mjs'

await execProcess( {
	name : 'CHANGE README',
	on   : async ( ) => {

		const readmeTemp    = readme( pkg )
		const convertReadme = async filePath => {

			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START MARK -->', '<!-- PIGEONPOSSE END MARK -->', readmeTemp.mark )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START CONTENT -->', '<!-- PIGEONPOSSE END CONTENT -->', readmeTemp.content )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START INDEX -->', '<!-- PIGEONPOSSE END INDEX -->', readmeTemp.index )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START ORG -->', '<!-- PIGEONPOSSE END ORG -->', readmeTemp.org )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START HEADER -->', '<!-- PIGEONPOSSE END HEADER -->', readmeTemp.header )
		
		}

		const readmePaths = [
			'README.md',
			'packages/_config/README.md',
			'packages/core/README.md',
			'packages/bepp/README.md',
			'packages/docs/README.md',
			// 'packages/gh-action/README.md',
			'packages/api/README.md',
			'packages/app/README.md',
			'packages/container/README.md',
		]

		for ( const path of readmePaths ) {

			await convertReadme( path )
 
		}
	
	},
} )

