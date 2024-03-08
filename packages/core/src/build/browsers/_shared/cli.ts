import { SuperCLI } from "../../../_shared/cli"
import { CmdConstructor, ExtTypes, compressTypes, extTypes } from "../../../_shared/types"
import { BuildBrowserSharedCore } from "./main"

export class BuildBrowserSharedCLI extends SuperCLI {
    
    baseBrowserConstructor<T extends CmdConstructor['action'] >(
        {
            id, 
            name, 
            browser = extTypes.chromium, 
            man2 = false,
            experimental = false,
            action, 
            options = undefined
        }: {
            action : T
            options?: CmdConstructor['options'] 
            id: string, 
            name: string, 
            browser?: ExtTypes
            experimental?: boolean
            man2?: boolean
        }
    ) {
        
        const core = new BuildBrowserSharedCore()

        const extTypeName = browser == extTypes.chromium ? 'Chromium extension' : browser == extTypes.firefox ? 'Firefox extension' : 'Extension'

        this.CMDConstructor({
            cmd: {
                value: 'build-'+id,
                desc: `Package ${name} extension${experimental ? ' (Experimental)': ''}`,
                infoPath: 'build/'+id,
            },
            options: [
                {
                    type: 'string',
                    value: ['-i', '--input'],
                    name: 'input-path',
                    desc: `Input directory for ${extTypeName}`
                },
                ...(man2 ? [{
                    type: 'string' as const,
                    value: ['-i-2','--input-mv2'],
                    name: 'input-path',
                    desc: `Input directory for ${extTypeName} (manifest 2)`,
                }]: []),
                {
                    type: 'string',
                    value: ['--id'],
                    name: 'string',
                    desc: 'Identification for build. Used in filename build.',
                    defaultValue: core.defaultParams.id,
                },
                {
                    type: 'string',
                    value: ['-o', '--output'],
                    name: 'output-path',
                    desc: 'Output directory for packaged extensions',
                    defaultValue: core.defaultParams.output,
                },
                {
                    type: 'string',
                    value: ['-c', '--compress'],
                    name: 'compression-format',
                    desc: 'Compression format for packaging',
                    defaultValue: core.defaultParams.compress,
                    choices: Object.values(compressTypes)
                },
                {
                    type: 'string',
                    value: ['-f', '--filename'],
                    name: 'filename-template',
                    desc: 'Filename template for packaged extensions',
                    defaultValue: core.defaultParams.filename,
                },
                ...(options || [])
            ],
            action,
        })

    }


}
