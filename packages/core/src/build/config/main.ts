
import { extTypes, manTypes, manVersions } from "../../_shared/types";
import { BuildSharedCore } from "../_shared/main";
import { BuildConfig, BuildConfigParams } from "./types";
import schema from './schema.json'
import { resolve } from "path";
import { allBrowsers } from "../browsers/main";

export class BuildConfigCore extends BuildSharedCore {
    
    schema = schema.definitions.BuildConfig

    defaultConfigPaths = [
        this.id+'.config.json',
        this.id+'.config.yaml',
        this.id+'.config.toml'
    ]

    defaultParams = {
        ...this.globalDefaultParams,
        file: undefined
    }

    async create(v: BuildConfigParams){
        await this.setFunctionConstructor({
            name: 'Build',
            defaultValues: this.defaultParams,
            values: v,
            cb: async ({log, values}) => {
                
                log.start('Staring...')
        
                let configPath: string | undefined = undefined
                
                if(!values.file) {
    
                    log.changeText('Searching configuration file automatically...')
                    for (let index = 0; index < this.defaultConfigPaths.length; index++) {
                
                        const file = resolve(this.defaultConfigPaths[index])
                        const exists = await this.fs.existsFile(file)
            
                        if(exists) {
                            configPath = file
                            break;
                        }
                        
                    }
                    
                    if(!configPath) throw new Error (`There is no supported configuration file. Supported files: ${this.defaultConfigPaths.join(" or ")}`)
    
                }else {
                    configPath = values.file
                }
    
                log.changeText('Getting data from file: '+ configPath)
                const configData = await this.fs.getDataFromFile(configPath) as BuildConfig
                
                log.verbose({
                    title: 'Config data:',
                    value: configData
                })
    
                await this.type.object.validateWithSchema(
                    configData, 
                    this.schema, 
                    this.log.verbose
                )
    
                const cores = allBrowsers
    
                let sharedParams: typeof configData.shared = this.defaultParams
                
                if(configData.shared) {
                    sharedParams = {...sharedParams, ...configData.shared}
                }
    
                if(!configData.build) throw Error('Error in config file: No "build" key found.')
    
                const buildStrings = []
                const promises = [] as Promise<void>[]
                for (let index = 0; index < configData.build.length; index++) {
                    const element = configData.build[index]
    
                    if(element && element.type && cores[element.type]) {
                        buildStrings.push(element.type)
                        const promise = (async () => {
                            
                            const props = cores[element.type].props
                            const input = (() => {
                                if (props.target === extTypes.chromium) {
                                    if (props.man === manVersions[3]) {
                                        // @ts-ignore
                                        return element.input || sharedParams.input[manTypes.chromium]
                                    } else if (props.man === manVersions[2]) {
                                        // @ts-ignore
                                        return element.input || sharedParams.input[manTypes.chromiumMv2]
                                    }
                                    return element.input
                                } else if (props.target === extTypes.firefox) {
                                    if (props.man === manVersions[3]) {
                                        // @ts-ignore
                                        return element.input || sharedParams.input[manTypes.firefox]
                                    } else if (props.man === manVersions[2]) {
                                        // @ts-ignore
                                        return element.input || sharedParams.input[manTypes.firefoxMv2]
                                    }
                                    return element.input
                                }
                                return element.input
                            })()
        
                            const shared = sharedParams.input ? ((({ input, ...rest }) => rest)(sharedParams)) : sharedParams
                            const data = {
                                ...shared,
                                ...((({ type, ...rest }) => rest)(element)),
                                input: input,
                                // time: false, // always false because there are problems with spinner
                                verbose: this.log.verbose
                            }
                            log.verbose({
                                title: `data for extension ${element.type}`,
                                value:data
                            })
                            // @ts-ignore
                            await cores[element.type].build(data)
                        })()

                        promises.push(promise)
    
                    }
                    
                }

                log.changeText(`Building for [${buildStrings.toString()}]`)
                await Promise.all(promises)

                log.succeed(`Built extensions for [${buildStrings.toString()}]`)
        
            }
        })

    }


}

const core = new BuildConfigCore()
// @ts-ignore
const buildConfig = async (values?: BuildConfigParams) => await core.create(values)

export {
    buildConfig
}
