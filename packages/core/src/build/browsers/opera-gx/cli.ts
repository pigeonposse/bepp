

import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildOperaGXCore } from "./main";

export class BuildOperaGXCLI extends BuildBrowserSharedCLI {

    protected core = new BuildOperaGXCore()

    run(){
        
        this.baseBrowserConstructor({
            id: this.core.browsersIds.operagx,
            name: 'Opera GX',
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}