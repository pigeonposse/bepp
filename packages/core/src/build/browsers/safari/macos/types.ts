/**
 * SAFARI TYPES.
 *
 * @description Types for safari browser.
 */

import { BuildSafariMacosParams } from "../_shared/types";

// for use in metthod create in core
export type BuildSafariMv2Params = BuildSafariMacosParams
export type BuildSafariParams = BuildSafariMacosParams & {
    inputMv2?: string;
} 
