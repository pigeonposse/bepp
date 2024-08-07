import { app }                                 from '../dist/app.js'
import {
	joinPath, object2string, paths, writeFile, 
} from '@bepp/config/core'

try {

	const openApiPath = joinPath( paths.apiDir, 'dist', 'openapi-schema.json' )

	await writeFile(
		openApiPath,
		object2string( app.getOpenApiObject() ),
	)

}catch( e ){

	console.error( {
		id : 'Error getting openapi object',
		e,
	} )

}
