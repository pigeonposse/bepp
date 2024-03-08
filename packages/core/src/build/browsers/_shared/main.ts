import { extTypes, manVersions } from "../../../_shared/types";
import { BuildSharedCore } from "../../_shared/main";
import type { BuildBrowserConstructorProps, BuildBrowserProps, BuildBrowserRequiredSharedParams, BuildBrowserSharedParams, buildBrowserConstructor } from "./types";

export class BuildBrowserSharedCore extends BuildSharedCore {
    
    defaultParams: BuildBrowserRequiredSharedParams = {
        ...this.globalBuildDefaultParams,
    }
    
    ERROR = {
        NO_INPUT: 'no-input',
        NO_MAN: 'no-man',
        NO_MAN_VER: 'no-man-version'
    }
    
    async buildBrowserConstructor<Type>({
        props, 
        cb, 
        onError, 
    }: buildBrowserConstructor<Type>){

        const { inputPath, name, man, target} = props
        const cliValues = props.values
        await this.setFunctionConstructor({
            name: name,
            defaultValues: this.defaultParams,
            // @ts-ignore
            values: cliValues,
            cb: async ({ log, values }) =>{
                
                log.start(`Staring building [${name}] package`)
                const manPath = this.fs.join(inputPath || '', 'manifest.json')

                try{
                   
                    if(!inputPath) throw new Error(this.ERROR.NO_INPUT)
                
                    const existsDir = await this.fs.existsDir(values.output)
                    if(!existsDir) await this.fs.createDir(values.output)

                    const manifest = await this.fs.getDataFromJSONFile(manPath)
                    if(!manifest) throw new Error(this.ERROR.NO_MAN)
        
                    const exists = man === manVersions.none ? true : Number(manifest.manifest_version) === Number(man)
                    if(!exists) throw new Error(this.ERROR.NO_MAN_VER)
        
                    values.filename = this.type.string.replacePlaceholders( values.filename, { 
                        id: values.id,
                        browser: name,
                        version: manifest.version || ''
                    })
        
                    await cb({
                        ...cliValues, // It is the first to avoid overwriting
                        ...values,
                        input: inputPath,
                        manifestPath: manPath,
                        manifestProps: manifest,
                        log
                    })
        
                }catch(e){
                    
                    // @ts-ignore
                    const error = e.message as string

                    if(error === this.ERROR.NO_INPUT) 
                        log.failed(target === extTypes.all ? `An Extension input path required`: `${this.type.string.capitalizeFirstLetter(target)} Extension input path required`)
                    else if(error === this.ERROR.NO_MAN) 
                        log.failed(`Input not has Manifest`)
                    else if(error === this.ERROR.NO_MAN_VER) 
                        log.failed(`Manifest path [${manPath}] must have: "manifest_version": "${man}"`)
                    else{
                        // @ts-ignore
                        onError({error, log, ...values})
                    }

                }
            },
        })
        
    }

    async buildBrowser( props: BuildBrowserConstructorProps){
        
        await this.buildBrowserConstructor<BuildBrowserSharedParams>({
            props,
            cb: async (params)=> {
                
                params.log.verbose({
                    title: 'All Params for compresion',
                    value: params
                })

                await this.fs.compress({
                    inputPath: params.input, 
                    outputPath: params.output,
                    outputName: params.filename,
                    format: params.compress
                })

                const compressFile = this.fs.getCompressOutputPath(params.output, params.filename, params.compress)
                params.log.succeed(`Builded in: ${compressFile}`)
            },
            onError: ({log, error}) => {
                log.failed(error)
            }
        })

    }

    async buildBrowserWithProps(props: BuildBrowserProps, values: BuildBrowserSharedParams){

        await this.buildBrowser({
            target: props.target, 
            name: props.name, 
            inputPath: values.input,
            values, 
            man: props.man
        })
    }

}

