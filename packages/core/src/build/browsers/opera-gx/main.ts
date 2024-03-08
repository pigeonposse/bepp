
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildOperaGXParams } from "./types";

export class BuildOperaGXCore extends BuildBrowserSharedCore {

    // necessary to obtain it outside of class
    props = {
        name: browserTypes.operagx, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    async create(values:BuildOperaGXParams){
        
        await this.buildBrowserWithProps(this.props, values)

    }

}

const core = new BuildOperaGXCore()

export default {
    props: core.props,
    build: core.create.bind(core),
}