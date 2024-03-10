
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildChromeParams } from "./types";

export class BuildChromeMV2Core extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.chromeMv2, 
        target: extTypes.chromium, 
        man: manVersions[2]
    }

    async create(values:BuildChromeParams){
        
        await this.buildBrowserWithProps(this.props, values)
        
    }

}

export class BuildChromeCore extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.chrome, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    async create(values:BuildChromeParams){

        await this.buildBrowserWithProps(this.props, values)

        if(values.inputMv2){
            const coreMv2 = new BuildChromeMV2Core()
            await coreMv2.create({...values, input: values.inputMv2})

        }

    }

}

const core = new BuildChromeCore()
const coreMv2 = new BuildChromeMV2Core()

export default {
    props: core.props,
	/**
	 * Build Chrome extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/chrome
	 */
    build: core.create.bind(core),
    mv2: {
		/**
		 * Build Chrome extension (manifest 2).
		 *
		 * @returns {Promise<void>}                    
		 * @see https://bepp.pigeonposse.com/guide/build/chrome
		 */
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}
