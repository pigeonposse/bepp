
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildOperaParams } from "./types";

export class BuildOperaCore extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.opera, 
        target: extTypes.chromium, 
        man: manVersions[2]
    }

    async create(values:BuildOperaParams){
        await this.buildBrowserWithProps(this.props, values)

    }

}

const core = new BuildOperaCore()

export default {
    props: core.props,
	/**
	 * Build Opera extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/opera
	 */
    build: core.create.bind(core),
}
