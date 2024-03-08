import { SuperCore } from "../../_shared/main";
import { browserTypes, compressTypes } from "../../_shared/types";
import { BuildRequiredSharedParams } from "./types";

export class BuildSharedCore extends SuperCore {
    readonly browsersIds = browserTypes
    globalBuildDefaultParams: BuildRequiredSharedParams = {
        ...this.globalDefaultParams,
        id: this.id,
        output: this.fs.join('build', 'extensions'),
        compress: compressTypes.zip,
        filename: '{{id}}-{{browser}}-{{version}}',
    }

}