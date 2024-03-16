/**
 * Tests.
 *
 * @description File for set tests.
 */
import { describe, expect, it } from "../../../_shared/tests"

type BrowserSharedType<T> = {
	build: (opts: T) => Promise<void>
	props: unknown
}

type BrowserType<T> = BrowserSharedType<T> & {
	mv2?: BrowserSharedType<T>
}
const testBuildFunction = <T>(name: string, brwoser: BrowserType<T>, opts: object) => {

    it(name, () => {

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
    })
    
}

export const testBuildBrowser= <T>(id: string, brwoser: BrowserType<T>, cb?: () => Promise<void>) => {

describe(`Build ${id}`, () => {

    testBuildFunction(
        'Error because no options',
        brwoser,
        { }
    )
    
    testBuildFunction(
        'Error because [input] does not exist',
        brwoser,
        {input: 'non-existent/path'}
    )
    testBuildFunction(
        'Error because [ID] is number. Must be a string',
        brwoser,
        {input: 'non-existent/path', id: 2}
    )
    testBuildFunction(
        'Error because [filename] is number. Must be a string',
        brwoser,
        {input: 'non-existent/path', filename: 2}
    )
    testBuildFunction(
        'Error because [compress-type] is not valid',
        brwoser,
        {input: 'non-existent/path', compress: 'zzip'}
    )

    if(cb) cb()
})

}
