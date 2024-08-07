/**
 * Tests.
 *
 * @description File for set tests.
 */
import { test } from "@bepp/config/tests"

type BrowserSharedType<T> = {
	build: (opts: T) => Promise<void>
	props: unknown
}

type BrowserType<T> = BrowserSharedType<T> & {
	mv2?: BrowserSharedType<T>
}

export const testBuildBrowser= <T>(id: string, brwoser: BrowserType<T>, cb?: (args: Parameters<Parameters<Parameters<Parameters<typeof test>[0]>[0]['section']>[0]['fn']>[0] ) => Promise<void>) => {
	const testCases = [
		{
		  name: 'Error because no options',
		  opts: {}
		},
		{
		  name: 'Error because [input] does not exist',
		  opts: { input: 'non-existent/path' }
		},
		{
		  name: 'Error because [ID] is number. Must be a string',
		  opts: { input: 'non-existent/path', id: 2 }
		},
		{
		  name: 'Error because [filename] is number. Must be a string',
		  opts: { input: 'non-existent/path', filename: 2 }
		},
		{
		  name: 'Error because [compress-type] is not valid',
		  opts: { input: 'non-existent/path', compress: 'zzip' }
		}
	]
	test( async ( { section } ) => ( section( {
		title : `Build ${id}`,
		fn    : async ( args ) => {
			testCases.forEach(({ name, opts }) => ( args.addTest({
				title: name,
				fn: async ({ expect }) => {
					expect(async () => {
						try{
							// @ts-ignore
							await brwoser.build(opts)
						}catch(e){
							throw e
						}
						
					}).toThrowError;
			
					if(brwoser.mv2 && typeof brwoser.mv2 === 'object' && 'build' in brwoser.mv2){
						
						expect(async () => {
							try{
								// @ts-ignore
								await brwoser.mv2.build(opts)
							}catch(e){
								throw e
							}
						}).toThrowError;
					}
				}
			} )))

			if(cb) cb(args)

		},
	} ))) 
}

// const testBuildFunction = <T>(name: string, brwoser: BrowserType<T>, opts: object) => {

//     it(name, () => {

//         expect(async () => {
// 			try{
// 				// @ts-ignore
// 				await brwoser.build(opts)
// 			}catch(e){
// 				throw e
// 			}
			
// 		}).toThrowError;

//         if(brwoser.mv2 && typeof brwoser.mv2 === 'object' && 'build' in brwoser.mv2){
			
//             expect(async () => {
// 				try{
// 					// @ts-ignore
// 					await brwoser.mv2.build(opts)
// 				}catch(e){
// 					throw e
// 				}
// 			}).toThrowError;
//         }
//     })
    
// }
// describe(`Build ${id}`, () => {

//     testBuildFunction(
//         'Error because no options',
//         brwoser,
//         { }
//     )
    
//     testBuildFunction(
//         'Error because [input] does not exist',
//         brwoser,
//         {input: 'non-existent/path'}
//     )
//     testBuildFunction(
//         'Error because [ID] is number. Must be a string',
//         brwoser,
//         {input: 'non-existent/path', id: 2}
//     )
//     testBuildFunction(
//         'Error because [filename] is number. Must be a string',
//         brwoser,
//         {input: 'non-existent/path', filename: 2}
//     )
//     testBuildFunction(
//         'Error because [compress-type] is not valid',
//         brwoser,
//         {input: 'non-existent/path', compress: 'zzip'}
//     )

//     if(cb) cb()
// })


