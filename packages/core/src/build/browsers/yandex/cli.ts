

import { BuildBrowserSharedCLI } from "../_shared/cli";
import { BuildYandexCore } from "./main";

export class BuildYandexCLI extends BuildBrowserSharedCLI {

    protected core = new BuildYandexCore()

    run(){
        this.baseBrowserConstructor({
            id: this.core.browsersIds.yandex,
            name: 'Yandex',
            man2: true,
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}
