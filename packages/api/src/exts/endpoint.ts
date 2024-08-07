
import { Route } from '../_shared/route'
import { id }    from './_shared/types'
import search    from './search/endpoint'
import get       from './get/endpoint'
import convert   from './convert/endpoint'
import download  from './download/endpoint'

const route = new Route( {
	path : id,
} )

route.addRoute( search )
route.addRoute( get )
route.addRoute( convert )
route.addRoute( download )

export default route
