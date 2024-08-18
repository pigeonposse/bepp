import Conf from 'conf'

export const initCache = ( { id, values, cached = true } ) => {

	// Crear una instancia de Conf, se utilizará id como clave de configuración base.
	const config = new Conf( {
		projectName : 'bepp-dev',
	} )

	return {
		values,
		get : v => {

			const c = config.get( id ) || {}
			if ( !v ) return c
			if ( cached && c && typeof c === 'object' && v in c ) return c[v]
			if ( typeof values === 'object' && v in values ) return values[v]
			throw new Error( `Cache value is unexpected: ${v}` )
		
		},
		set : obj => {

			const currentConfig = config.get( id ) || {}
			const updatedConfig = {
				...currentConfig, ...obj, 
			}
			config.set( id, updatedConfig )
		
		},
	}

}

// import NodeCache from 'node-cache'
// export const initCache = ( { id, values } ) => {
	
// 	const cacheInstace = new NodeCache()
// 	return {
// 		values,
// 		get : v=> {

// 			const c = cacheInstace.get < Object > ( id ) || {}
// 			if( !v ) return c
// 			if( c && typeof c === 'object' && v in c ) return c[v]
// 			if( typeof values === 'object' && v in values ) return values[v]
// 			throw Error( 'Cache value is unexpected', v )
		
// 		},
// 		set : obj => cacheInstace.set( id, obj ),
// 	}

// }

