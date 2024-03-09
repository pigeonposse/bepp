/**
 * Todo.
 *
 * @description Todo.
 */

import { generateASCII } from '../core/main.mjs'
export const mark = pkg => {

	const data       = pkg.data
	const author     = data.author.name 
	const authorLink = data.author.url 
	const repoUrl    = data.repository.url 
	// const version    = data.version ? data.version : 'UNDEFINDED'

	return `${generateASCII( pkg.data.name.toUpperCase() )}                    
                                                
REPOSITORY: ${repoUrl}
AUTHORS: 
	- ${author} (${authorLink})

DEVELOPED BY ${author} 🐦🌈
` 

}
