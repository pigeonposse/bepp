
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

		await Promise.all([
			this.buildBrowserWithProps(this.props, values),
			values.inputMv2 ? new BuildChromiumMV2Core().create({...values, input: values.inputMv2}) : Promise.resolve()
		]);
		
    }

}

const core = new BuildChromiumCore()
const coreMv2 = new BuildChromiumMV2Core()

export default {
    props: core.props,
	/**
	 * Build Chromium extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/chromium
	 */
    build: core.create.bind(core),
    mv2: {
		/**
		 * Build Chromium extension (manifest 2).
		 *
		 * @returns {Promise<void>}                    
		 * @see https://bepp.pigeonposse.com/guide/build/chromium
		 */
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}
