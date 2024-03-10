
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildCustomParams } from "./types";

export class BuildCustomCore extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.custom, 
        target: extTypes.all, 
        man: manVersions.none
    }

    async create(values:BuildCustomParams){
        
        // @ts-ignore
        this.props.name = values.browserName || this.props.name

        await this.buildBrowserWithProps(this.props, values)


    }

}

const core = new BuildCustomCore()

export default {
    props: core.props,
	/**
	 * Build Custom extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/custom
	 */
    build: core.create.bind(core),
}
