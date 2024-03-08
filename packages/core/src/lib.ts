/**
 * LIBRARY.
 *
 * @description File for set library functions.
 */
import { init }   from './init/main'
import * as build from './build/main'

export * from './build/main'

export { init }
export default {
	init,
	...build,
}

// import { InitParams } from "init/types"
// export type { InitParams }
// import chrome from "./build/browsers/chrome/main"
// try{
//     // init({
//     //     y: undefined,
//     //     time: true,
//     // })
    
//     chrome.build({verbose: true, input: 'k', exit: true})
// }catch(e){
//     console.log(e)
// }
