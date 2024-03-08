import { BuildBrowserSharedParams } from "../_shared/types";

// for use in config in mv2 and mv3
export type BuildEdgeSharedParams = BuildBrowserSharedParams
// for use in metthod create in core
export type BuildEdgeMv2Params = BuildEdgeSharedParams
export type BuildEdgeParams = BuildEdgeSharedParams & {
    inputMv2?: string;
} 