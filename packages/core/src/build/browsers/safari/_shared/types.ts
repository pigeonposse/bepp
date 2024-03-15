/**
 * SAFARI TYPES.
 *
 * @description Types for safari browser.
 */
import { ObjectValues } from "../../../../_shared/types";
import { BuildBrowserCallbackParams, BuildBrowserSharedParams } from "../../_shared/types";

/**
 * VALUES.
 */
export type BuildSafariSharedParams = BuildBrowserSharedParams & {
    appId?: string;
    appTitle?: string;
	onlyXcodeProject?: boolean
}
export type BuildSafariIosParams = BuildSafariSharedParams
export type BuildSafariMacosParams = BuildSafariSharedParams & {
    dmgIcon?: string;
    dmgNoReadme?: boolean;
    dmgReadmePath?: string;
    dmgReadmeFilename?: string;
}

/**
 * APP.
 */
export const appTypes = {
    ios: 'iOS',
    macos: 'macOS',
} as const 

export type AppType = ObjectValues<typeof appTypes>

/**
 * DMG.
 */
export type BuildDmgParams = BuildBrowserCallbackParams<BuildSafariMacosParams>
export type DmgOptions = {
    DMG_OUTPUT_PATH: string;
    TITLE: string;
    ICON: string;
    APP_SOURCE: string;
    README_PATH?: string;
	README_FILE_NAME?: string
    BG_IMG_PATH: string;
}
