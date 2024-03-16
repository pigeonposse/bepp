
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
        
		await Promise.all([
			this.buildBrowserWithProps(this.props, values),
			values.inputMv2 ? new BuildEdgeMV2Core().create({...values, input: values.inputMv2}) : Promise.resolve()
		]);
    }

}

const core = new BuildEdgeCore()
const coreMv2 = new BuildEdgeMV2Core()

export default {
    props: core.props,
	/**
	 * Build Edge extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/edge
	 */
    build: core.create.bind(core),
    mv2: {
		/**
		 * Build Edge extension (manifest 2).
		 *
		 * @returns {Promise<void>}                    
		 * @see https://bepp.pigeonposse.com/guide/build/edge
		 */
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}
