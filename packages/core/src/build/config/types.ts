import { CmdSharedOptions, browserTypes, manTypes } from "../../_shared/types";
import { BuildBrowserSharedParams } from "../browsers/_shared/types";
import { BuildBraveParams } from "../browsers/brave/types";
import { BuildChromeSharedParams } from "../browsers/chrome/types";
import { BuildChromiumSharedParams } from "../browsers/chromium/types";
import { BuildCustomParams } from "../browsers/custom/types";
import { BuildEdgeSharedParams } from "../browsers/edge/types";
import { BuildFirefoxSharedParams } from "../browsers/firefox/types";
import { BuildOperaGXParams } from "../browsers/opera-gx/types";
import { BuildOperaParams } from "../browsers/opera/types";
import { BuildSafariParams } from "../browsers/safari/types";
import { BuildYandexParams, BuildYandexSharedParams } from "../browsers/yandex/types";

export type BuildConfigParams = CmdSharedOptions & {
    file?: string
}

export type BuildTypeParams<TypeString,BrowserType extends BuildBrowserSharedParams> = {
    type: TypeString,
} & Partial<BrowserType>
type BrowserTypesMap = typeof browserTypes

export type BuildConfigSharedInput ={
	[manTypes.chromium]?: string
	[manTypes.chromiumMv2]?: string
	[manTypes.firefox]?: string
	[manTypes.firefoxMv2]?: string
}
export type BuildConfigShared = Omit<BuildBrowserSharedParams, 'input'> & {
	input?: BuildConfigSharedInput
}
export type BuildConfigBuild = (
	| BuildTypeParams<BrowserTypesMap['chrome'], BuildChromeSharedParams>
	| BuildTypeParams<BrowserTypesMap['chromeMv2'], BuildChromeSharedParams>
	| BuildTypeParams<BrowserTypesMap['chromium'], BuildChromiumSharedParams>
	| BuildTypeParams<BrowserTypesMap['chromiumMv2'], BuildChromiumSharedParams>
	| BuildTypeParams<BrowserTypesMap['firefox'], BuildFirefoxSharedParams>
	| BuildTypeParams<BrowserTypesMap['firefoxMv2'], BuildFirefoxSharedParams>
	| BuildTypeParams<BrowserTypesMap['safari'], BuildSafariParams>
	| BuildTypeParams<BrowserTypesMap['edge'], BuildEdgeSharedParams>
	| BuildTypeParams<BrowserTypesMap['edgeMv2'], BuildEdgeSharedParams>
	| BuildTypeParams<BrowserTypesMap['brave'], BuildBraveParams>
	| BuildTypeParams<BrowserTypesMap['opera'], BuildOperaParams>
	| BuildTypeParams<BrowserTypesMap['operagx'], BuildOperaGXParams>
	| BuildTypeParams<BrowserTypesMap['yandex'], BuildYandexParams>
	| BuildTypeParams<BrowserTypesMap['yandexMv2'], BuildYandexSharedParams>
	| BuildTypeParams<BrowserTypesMap['custom'], BuildCustomParams>
)[]
export type BuildConfig = {
    /**
     * Data for shared with your builds.
     *
     */
    shared?: BuildConfigShared
    /**
     * Set the browsers you want build.
     *
     */
    build?: BuildConfigBuild
}
