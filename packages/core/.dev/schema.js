import { createGenerator } from 'ts-json-schema-generator'
import {
	joinPath, 
	paths, 
	writeFile,
} from '@bepp/config/core'

const generateSchema = async () => {
	
	const route = joinPath( paths.coreDir, 'src', 'build', 'config' )

	const config     = {
		path     : joinPath( route, 'types.ts' ),
		tsconfig : joinPath( paths.coreDir, 'tsconfig.json' ),
		type     : 'BuildConfigSchema', // Or <type-name> if you want to generate schema for that one type only,
		expose   : 'none',
	}
	const outputPath = joinPath( paths.coreDir, 'schema.json' )

	console.log( {
		title : 'config data:',
		value : {
			...config,
			outputPath,
		},
	} )

	try {

		// @ts-ignore
		const schema       = createGenerator( config ).createSchema( config.type )
		const schemaString = JSON.stringify( schema, null, '\t' )
    
		await writeFile( outputPath, schemaString + '\n' ) 
		console.log( 'Schema file written successfully!' )
	
	} catch ( err ) {

		console.error( 'Error writing schema file:', err )
	
	}

}

generateSchema()
