
// import type { BuildSafariIosParams } from "../_shared/types";
// import { BuildSafariSharedCore } from "../_shared/main";
// import { browserTypes, extTypes, manVersions } from "../../../../_shared/types";

// export class BuildSafariIOSCore extends BuildSafariSharedCore {
    
//     props = {
//         name: browserTypes.safariIos, 
//         target: extTypes.chromium, 
//         man: manVersions[3]
//     }

//     async create(values: BuildSafariIosParams){

// 		const buildSafariBrowserPromise = this.buildSafariIosBrowserWithProps(this.props, values);

// 		// Espera a que ambas promesas se resuelvan
// 		await Promise.all([buildSafariBrowserPromise]);

//     }

// }

// const core = new BuildSafariIOSCore()

// export default {
//     props: core.props,
// 	/**
// 	 * Build Safari IOS extension.
// 	 *
// 	 * @returns {Promise<void>}                    
// 	 * @see https://bepp.pigeonposse.com/guide/build/safari-ios
// 	 */
//     build: core.create.bind(core),
// }
