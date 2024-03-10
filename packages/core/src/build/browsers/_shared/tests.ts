/**
 * Tests.
 *
 * @description File for set tests.
 */
import { describe, expect, it } from "../../../_shared/tests"

const testBuildFunction = (name: string, brwoser: unknown, opts: object) => {
    const run = async (cb: unknown, opts: object) => {
        try{
            // @ts-ignore
            await cb()
        }catch(e){
            throw e
        }
    }

    it(name, () => {

        // @ts-ignore
        expect(async () => await run(brwoser.build), opts).rejects.toThrowError();
        // @ts-ignore
        if(brwoser.mv2){
            // @ts-ignore
            expect(async () => await run(brwoser.mv2.build, opts)).rejects.toThrowError();
        }
    })
    
}

export const testBuildBrowser = (id: string, brwoser: unknown, cb: unknown) => {
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
        {input: 'non-existent/path', compres: 'zzip'}
    )
    // @ts-ignore
    if(cb) cb()
});

}
