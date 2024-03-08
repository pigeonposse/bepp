
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildBraveParams } from "./types";

export class BuildBraveCore extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.brave, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    async create(values:BuildBraveParams){
        
        await this.buildBrowserWithProps(this.props, values)

    }

}

const core = new BuildBraveCore()

export default {
    props: core.props,
    build: core.create.bind(core),
}