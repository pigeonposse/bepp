import { BrowserTypes, browserTypes } from "../../_shared/types";
import chrome from "./chrome/main";
import chromium from "./chromium/main";
import firefox from "./firefox/main";
import edge from "./edge/main";
import safari from "./safari/macos/main";
// import safariIos from "./safari/ios/main";
import brave from "./brave/main";
import custom from "./custom/main";
import operaGx from "./opera-gx/main";
import opera from "./opera/main";
import yandex from "./yandex/main";

type BrowserArgs<T> =  T extends keyof typeof allBrowsers ? Parameters<typeof allBrowsers[T]['build']>[0] : never

const allBrowsers = {
    [browserTypes.safari]: {...safari, mv2: undefined},
	[browserTypes.safariMv2]: safari.mv2,
	// [browserTypes.safariIos]: safariIos,
    [browserTypes.chrome]: {...chrome, mv2: undefined},
    [browserTypes.chromeMv2]: chrome.mv2,
    [browserTypes.firefox]: {...firefox, mv2: undefined},
    [browserTypes.firefoxMv2]: firefox.mv2,
    [browserTypes.chromium]: {...chromium, mv2: undefined},
    [browserTypes.chromiumMv2]: chromium.mv2,
    [browserTypes.edge]: {...edge, mv2: undefined},
    [browserTypes.edgeMv2]: edge.mv2,
    [browserTypes.yandex]: {...yandex, mv2: undefined},
    [browserTypes.yandexMv2]: yandex.mv2,
    [browserTypes.brave]:brave,
    [browserTypes.opera]: opera,
    [browserTypes.operagx]: operaGx,
    [browserTypes.custom]: custom
}


/**
 * Build extension for a specific browser.
 *
 * @returns {Promise<void>}                    
 * @see https://bepp.pigeonposse.com/guide/build
 */
const buildBrowser = async <T extends BrowserTypes>(
    type: T,
    args: BrowserArgs<T>
) => {
    
    if (!(type in allBrowsers)) throw new Error(`Invalid browser type "${type}"`)

    await allBrowsers[type].build(args)


}

/**
 * Build multiple extensions using object.
 *
 * @returns {Promise<void>}                    
 * @see https://bepp.pigeonposse.com/guide/build/all
 */
const buildAllBrowsers = async <T extends BrowserTypes>(
    args: {[key in T]: BrowserArgs<T>},
) => {
    for (const key in args) {
        if (Object.prototype.hasOwnProperty.call(args, key)) {
            await buildBrowser(key, args[key])
        }
    }
}

export {
    chrome,
    chromium,
    firefox,
    edge,
    safari,
	// safariIos,
    brave,
    custom,
    operaGx,
    opera,
    yandex,
    buildAllBrowsers,
    buildBrowser,
    allBrowsers
}

// buildAll({
//     chrome: {
//         input: 'jj'
//     },
//     custom: {
//         input: 'j',
//         browserName: 'dd'
//     }
// })
// buildBrowser('bravee', {}); // Error en typescript, invalid browser name
// buildBrowser('safari', { dmgIcon: 'true' }); // Correcto en TypeScript
// buildBrowser('brave', { inputMv2: 'true' }); // Error en TypeScript [no funciona]
