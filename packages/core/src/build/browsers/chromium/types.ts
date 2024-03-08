import { BuildBrowserSharedParams } from "../_shared/types";

// for use in config in mv2 and mv3
export type BuildChromiumSharedParams = BuildBrowserSharedParams 
// for use in metthod create in core
export type BuildChromiumMv2Params = BuildChromiumSharedParams
export type BuildChromiumParams = BuildChromiumSharedParams & {
    inputMv2?: string;
} 