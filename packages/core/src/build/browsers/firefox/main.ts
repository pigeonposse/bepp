
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildFirefoxMv2Params, BuildFirefoxParams } from "./types";

export class BuildFirefoxMV2Core extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.firefoxMv2, 
        target: extTypes.firefox, 
        man: manVersions[2]
    }

    async create(values:BuildFirefoxMv2Params){
        
        await this.buildBrowserWithProps(this.props, values)
        
    }

}


export class BuildFirefoxCore extends BuildBrowserSharedCore {

    props = {
        name: browserTypes.firefox, 
        target: extTypes.firefox, 
        man: manVersions[3]
    }

    async create(values:BuildFirefoxParams){
        
        await this.buildBrowserWithProps(this.props, values)

        if(values.inputMv2){
            const coreMv2 = new BuildFirefoxMV2Core()
            await coreMv2.create({...values, input: values.inputMv2})
        }
    }

}

const core = new BuildFirefoxCore()
const coreMv2 = new BuildFirefoxMV2Core()

export default {
    props: core.props,
    build: core.create.bind(core),
    mv2: {
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}