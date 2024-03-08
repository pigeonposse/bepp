

import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildEdgeCore } from "./main";

export class BuildEdgeCLI extends BuildBrowserSharedCLI {

    protected core = new BuildEdgeCore()

    run(){

        this.baseBrowserConstructor({
            id: this.core.browsersIds.edge,
            name: 'Edge',
            man2: true,
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })


    }

}