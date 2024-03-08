

import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildOperaCore } from "./main";

export class BuildOperaCLI extends BuildBrowserSharedCLI {

    protected core = new BuildOperaCore()

    run(){
        
        this.baseBrowserConstructor({
            id: this.core.browsersIds.opera,
            name: 'Opera',
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}