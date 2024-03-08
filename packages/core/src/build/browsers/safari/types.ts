import { ObjectValues } from "../../../_shared/types";
import { BuildBrowserCallbackParams, BuildBrowserSharedParams } from "../_shared/types";

export type BuildSafariParams = BuildBrowserSharedParams & {
    dmgBundleId?: string;
    dmgTitle?: string;
    dmgIcon?: string;
    dmgNoReadme?: boolean;
    dmgReadmePath?: string;
    dmgReadmeFilename?: string;
}
export type BuildDmgParams = BuildBrowserCallbackParams<BuildSafariParams>

export const dmgTypes = {
    ios: 'iOS',
    macos: 'macOS',
} as const 

export type DmgType = ObjectValues<typeof dmgTypes>