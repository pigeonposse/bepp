

import { extTypes } from "../../../_shared/types";
import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildCustomCore } from "./main";

export class BuildCustomCLI extends BuildBrowserSharedCLI {

    protected core = new BuildCustomCore()

    run(){
        
        this.baseBrowserConstructor({
            id: this.core.browsersIds.custom,
            name: 'Custom',
            browser: extTypes.all,
            options: [{
                type: 'array',
                value: ['-b', '--browser-name'],
                name: 'name',
                desc: 'Set the browser name to be used by the {{browser}} placeholder'
            }],
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}
