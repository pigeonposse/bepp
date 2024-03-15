
import { BuildSafariCore } from "./main";
import { BuildSafariSharedCLI } from "../_shared/cli";

export class BuildSafariCLI extends BuildSafariSharedCLI {

    protected core = new BuildSafariCore()

    run(){
        this.baseBrowserConstructor({
            id: this.core.browsersIds.safari,
            name: 'Safari',
			man2: true,
            experimental: true,
            options: [
                ...this.getSharedOpts(
					this.core.defaultSafariParams.appId,
					this.core.defaultSafariParams.appTitle
				),
                {
                    type: 'string',
                    value: ['--dmg-icon'],
                    name: 'dmg-icon',
                    desc: 'Custom icon for DMG (macOS)'
                },
                {
                    type: 'boolean',
                    value: ['--dmg-no-readme'],
                    desc: 'Desactive readme file for DMG (macOS)',
                },
                {
                    type: 'string',
                    value: ['--dmg-readme-path'],
                    name: 'dmg-readme-path',
                    desc: 'Custom readme path for DMG (macOS)',
                },
                {
                    type: 'string',
                    value: ['--dmg-readme-filename'],
                    name: 'dmg-readme-filename',
                    desc: 'Change readme filename for DMG (macOS)',
                    defaultValue: this.core.defaultSafariParams.dmgReadmeFilename,
                }
            ],
            // @ts-ignore
            action: this.core.create.bind(this.core)
        })

    }

}
