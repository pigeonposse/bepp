import {
	app, port, 
} from './app'

// @ts-ignore
Deno.serve( {
	port : port, 
}, app.fetch ) 
