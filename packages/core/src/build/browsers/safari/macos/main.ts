
import { browserTypes, extTypes, manVersions } from "../../../../_shared/types";
import { BuildSafariSharedCore } from "../_shared/main";
import { BuildSafariMv2Params, BuildSafariParams } from "./types"

export class BuildSafariMV2Core extends BuildSafariSharedCore {
    
    props = {
        name: browserTypes.safariMv2, 
        target: extTypes.chromium, 
        man: manVersions[2]
    }

    async create(values:BuildSafariMv2Params){
        
        await this.buildSafariBrowserWithProps(this.props, values)
        
    }

}

export class BuildSafariCore extends BuildSafariSharedCore {
    
    props = {
        name: browserTypes.safari, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    async create(values: BuildSafariParams){

		const buildSafariBrowserPromise = this.buildSafariBrowserWithProps(this.props, values);
		const coreMv2Promise = values.inputMv2 ? new BuildSafariMV2Core().create({...values, input: values.inputMv2}) : Promise.resolve();
	
		// Espera a que ambas promesas se resuelvan
		await Promise.all([buildSafariBrowserPromise, coreMv2Promise])

    }

}

const core = new BuildSafariCore()
const coreMv2 = new BuildSafariMV2Core()

export default {
    props: core.props,
	/**
	 * Build Safari extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/safari
	 */
    build: core.create.bind(core),
    mv2: {
		/**
		 * Build Safari extension (with chromium manifest 2).
		 *
		 * @returns {Promise<void>}                    
		 * @see https://bepp.pigeonposse.com/guide/build/safari
		 */
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}
