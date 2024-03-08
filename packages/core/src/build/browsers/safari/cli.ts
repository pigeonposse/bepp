
import { BuildSafariCore } from "./main";
import { BuildBrowserSharedCLI } from "../_shared/cli";

export class BuildSafariCLI extends BuildBrowserSharedCLI {

    protected core = new BuildSafariCore()

    run(){
        this.baseBrowserConstructor({
            id: this.core.browsersIds.safari,
            name: 'Safari',
            experimental: true,
            options: [
                {
                    type: 'string',
                    value: ['--dmg-bundle-id'],
                    name: 'dmg-bundle-id',
                    desc: 'Custom bundle ID for DMG (macOS)',
                    defaultValue: this.core.defaultSafariParams.dmgBundleId,
                },
                {
                    type: 'string',
                    value: ['--dmg-title'],
                    name: 'dmg-title',
                    desc: 'Custom title for DMG (macOS)',
                    defaultValue: this.core.defaultSafariParams.dmgTitle,
                },
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
