import facts       from './facts/endpoint'
import extensions  from './exts/endpoint'
import health      from './health/endpoint'
import { App }     from './_shared/app'
import { version } from '../package.json'
import {
	bugs,
	extra, 
} from '../../../package.json'

export type * from './types'

const getPortFromArgs = () => {

	const portArgIndex = process.argv.findIndex( arg => arg.startsWith( '--port=' ) )
	
	if ( portArgIndex !== -1 ) {

		const portArg   = process.argv[portArgIndex]
		const portValue = portArg.split( '=' )[1]
		return Number( portValue )
	
	}
  
	return Number( extra.defaultApiPort )

}
export const port = getPortFromArgs()

const app = new App( {
	version,
	title       : 'BEPP API',
	description : 'API documentation for BEPP - A Cross-Browser Extension Builder',
	port,
	cors        : {
		origin       : '*',
		allowMethods : [
			'GET',
		],
	},
	docs : {
		path : '/docs',
	},
	contact : bugs,
} )

app.addRoute( facts )
app.addRoute( extensions )
app.addRoute( health )
export {
	app,
}
export default app
