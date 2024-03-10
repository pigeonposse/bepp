
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildYandexMv2Params, BuildYandexParams } from "./types";

export class BuildYandexMV2Core extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.yandexMv2, 
        target: extTypes.chromium, 
        man: manVersions[2]
    }

    async create(values:BuildYandexMv2Params){
        
        await this.buildBrowserWithProps(this.props, values)
        
    }

}

export class BuildYandexCore extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.yandex, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    async create(values:BuildYandexParams){
        
        await this.buildBrowserWithProps(this.props, values)

        if(values.inputMv2){
            const coreMv2 = new BuildYandexMV2Core()
            await coreMv2.create({...values, input: values.inputMv2})
        }
    }

}

const core = new BuildYandexCore()
const coreMv2 = new BuildYandexMV2Core()

export default {
    props: core.props,
	/**
	 * Build Yandex extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/yandex
	 */
    build: core.create.bind(core),
    mv2: {
		/**
		 * Build Yandex extension (Manifest 2).
		 *
		 * @returns {Promise<void>}                    
		 * @see https://bepp.pigeonposse.com/guide/build/yandex
		 */
        build: coreMv2.create.bind(coreMv2),
        props: coreMv2.props
    },
}
