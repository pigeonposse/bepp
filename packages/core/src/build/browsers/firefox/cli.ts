

import { extTypes } from "../../../_shared/types";
import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildFirefoxCore } from "./main";

export class BuildFirefoxCLI extends BuildBrowserSharedCLI {

    protected core = new BuildFirefoxCore()

    run(){
        
        this.baseBrowserConstructor({
            id: this.core.browsersIds.firefox,
            name: 'Firefox',
            browser: extTypes.firefox,
            man2: true,
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })
    }

}