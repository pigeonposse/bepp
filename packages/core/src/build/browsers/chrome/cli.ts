

import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildChromeCore } from "./main";

export class BuildChromeCLI extends BuildBrowserSharedCLI {

    protected core = new BuildChromeCore()

    run(){

        this.baseBrowserConstructor({
            id: this.core.browsersIds.chrome,
            name: 'Chrome',
            man2: true,
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}