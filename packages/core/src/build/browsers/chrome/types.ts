import { BuildBrowserSharedParams } from "../_shared/types";

// for use in config in mv2 and mv3
export type BuildChromeSharedParams = BuildBrowserSharedParams 
// for use in metthod create in core
export type BuildChromeParams = BuildChromeSharedParams & {
    inputMv2?: string;
} 