import { BuildBrowserSharedParams } from "../_shared/types";

// for use in config in mv2 and mv3
export type BuildFirefoxSharedParams = BuildBrowserSharedParams 
// for use in metthod create in core
export type BuildFirefoxMv2Params = BuildFirefoxSharedParams
export type BuildFirefoxParams = BuildFirefoxSharedParams & {
    inputMv2?: string;
} 