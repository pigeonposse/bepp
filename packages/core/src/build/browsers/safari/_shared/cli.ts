


import { CmdConstructor } from "_shared/types";
import { BuildBrowserSharedCLI } from "../../_shared/cli";

export class BuildSafariSharedCLI extends BuildBrowserSharedCLI {

	getSharedOpts(defaultId: string, defaulTitle: string){
		const res: CmdConstructor['options']  = [
			{
				type: 'string',
				value: ['--app-id'],
				name: 'app-id',
				desc: 'Bundle identifier for the generated app',
				defaultValue: defaultId,
			},
			{
				type: 'string',
				value: ['--app-title'],
				name: 'app-title',
				desc: 'Title for the generated app',
				defaultValue: defaulTitle,
			},
			{
				type: 'boolean',
				value: ['--only-xcode-project'],
				desc: 'This option packages only the xcode project, this is useful in case you want to develop after converting from chromium to safari',
			}
		]
		return res
	}

}
