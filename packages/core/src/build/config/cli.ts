
import { SuperCLI } from "../../_shared/cli";
import { BuildConfigCore } from "./main";

export class BuildConfigCLI extends SuperCLI {

    protected core = new BuildConfigCore()

    run(){

        this.CMDConstructor({
            cmd: {
                value: 'build',
                desc: 'Package extensions with a config file',
                infoPath: 'build/config-file'
            },
            options: [
                {
                    type: 'string',
                    value: ['-c', '--config'],
                    name: 'config-file-path',
                    desc: 'Path for config file'
                },
            ],
            action: this.core.create.bind(this.core),
        })


    }

}
