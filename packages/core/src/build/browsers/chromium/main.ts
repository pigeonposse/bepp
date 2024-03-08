
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildChromiumMv2Params, BuildChromiumParams } from "./types";

export class BuildChromiumMV2Core extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.chromiumMv2, 
        target: extTypes.chromium, 
        man: manVersions[2]
    }

    async create(values:BuildChromiumMv2Params){
        
        await this.buildBrowserWithProps(this.props, values)
        
    }

}

export class BuildChromiumCore extends BuildBrowserSharedCore {

    props = {
        name: browserTypes.chromium, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    async create(values:BuildChromiumParams){

        await this.buildBrowserWithProps(this.props, values)

        if(values.inputMv2){
            const coreMv2 = new BuildChromiumMV2Core()
            await coreMv2.create({...values, input: values.inputMv2})

        }
    }

}

const core = new BuildChromiumCore()
const coreMv2 = new BuildChromiumMV2Core()

export default {
    props: core.props,
    build: core.create.bind(core),
    mv2: {
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}