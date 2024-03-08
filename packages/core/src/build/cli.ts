
import { SuperCLI }         from '../_shared/cli'
import { BuildConfigCLI }   from './config/cli'
import { BuildSafariCLI }   from './browsers/safari/cli'
import { BuildChromiumCLI } from './browsers/chromium/cli'
import { BuildEdgeCLI }     from './browsers/edge/cli'
import { BuildBraveCLI }    from './browsers/brave/cli'
import { BuildOperaCLI }    from './browsers/opera/cli'
import { BuildOperaGXCLI }  from './browsers/opera-gx/cli'
import { BuildChromeCLI }   from './browsers/chrome/cli'
import { BuildFirefoxCLI }  from './browsers/firefox/cli'
import { BuildCustomCLI }   from './browsers/custom/cli'
import { BuildYandexCLI }   from './browsers/yandex/cli'

export class BuildCLI extends SuperCLI {

	run(){

		const args = { program: this.program }

		const config   = new BuildConfigCLI( args )
		const safari   = new BuildSafariCLI( args )
		const chrome   = new BuildChromeCLI( args )
		const firefox  = new BuildFirefoxCLI( args )
		const chromium = new BuildChromiumCLI( args )
		const edge     = new BuildEdgeCLI( args )
		const brave    = new BuildBraveCLI( args )
		const yandex   = new BuildYandexCLI( args )
		const opera    = new BuildOperaCLI( args )
		const operaGX  = new BuildOperaGXCLI( args )
		const custom   = new BuildCustomCLI( args )

		config.run()
		chrome.run()
		firefox.run()
		safari.run()
		chromium.run()
		edge.run()
		brave.run()
		opera.run()
		operaGX.run()
		yandex.run()
		custom.run()

	}

}
