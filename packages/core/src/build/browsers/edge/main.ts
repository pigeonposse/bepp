
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildEdgeMv2Params, BuildEdgeParams } from "./types";

export class BuildEdgeMV2Core extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.edgeMv2, 
        target: extTypes.chromium, 
        man: manVersions[2]
    }

    async create(values:BuildEdgeMv2Params){
        
        await this.buildBrowserWithProps(this.props, values)
        
    }

}

export class BuildEdgeCore extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.edge, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    async create(values:BuildEdgeParams){
        
        await this.buildBrowserWithProps(this.props, values)

        if(values.inputMv2){
            const coreMv2 = new BuildEdgeMV2Core()
            await coreMv2.create({...values, input: values.inputMv2})
        }
    }

}

const core = new BuildEdgeCore()
const coreMv2 = new BuildEdgeMV2Core()

export default {
    props: core.props,
    build: core.create.bind(core),
    mv2: {
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}
