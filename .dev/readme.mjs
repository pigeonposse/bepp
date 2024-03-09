/**
 * Readme.
 *
 * @description Readme.
 */

import { readme }             from './templates/readme.mjs'
import {
	pkg, addTextBetweenAMark, 
} from './core/main.mjs'

const dynamicReadme = async () => {

	try{

		const readmeTemp    = readme( pkg )
		const convertReadme = async filePath => {

			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START MARK -->', '<!-- PIGEONPOSSE END MARK -->', readmeTemp.mark )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START CONTENT -->', '<!-- PIGEONPOSSE END CONTENT -->', readmeTemp.content )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START INDEX -->', '<!-- PIGEONPOSSE END INDEX -->', readmeTemp.index )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START ORG -->', '<!-- PIGEONPOSSE END ORG -->', readmeTemp.org )
			await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START HEADER -->', '<!-- PIGEONPOSSE END HEADER -->', readmeTemp.header )
		
		}
		await convertReadme( 'README.md' )
		await convertReadme( 'packages/_config/README.md' )
		await convertReadme( 'packages/core/README.md' )
		await convertReadme( 'packages/bepp/README.md' )
		await convertReadme( 'packages/docs/README.md' )
		await convertReadme( 'packages/gh-action/README.md' )
	
	}catch( e ){

		throw '📝 ' + e

	}

}

try {
	
	dynamicReadme()

}catch( e ){

	console.log( '❌ ' + e )

}
