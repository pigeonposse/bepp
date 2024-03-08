

import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildBraveCore } from "./main";

export class BuildBraveCLI extends BuildBrowserSharedCLI {

    protected core = new BuildBraveCore()

    run(){

        this.baseBrowserConstructor({
            id: this.core.browsersIds.brave,
            name: 'Brave',
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}