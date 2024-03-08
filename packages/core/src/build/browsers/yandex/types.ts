import { BuildBrowserSharedParams } from "../_shared/types";

// for use in config in mv2 and mv3
export type BuildYandexSharedParams = BuildBrowserSharedParams
// for use in metthod create in core
export type BuildYandexMv2Params = BuildYandexSharedParams
export type BuildYandexParams = BuildYandexSharedParams & {
    inputMv2?: string;
} 