

import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildChromiumCore } from "./main";

export class BuildChromiumCLI extends BuildBrowserSharedCLI {

    protected core = new BuildChromiumCore()

    run(){
        
        this.baseBrowserConstructor({
            id: this.core.browsersIds.chromium,
            name: 'Chromium',
            man2: true,
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}