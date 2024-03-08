import { BuildBrowserSharedParams } from "../_shared/types";

export type BuildCustomParams = BuildBrowserSharedParams & {
    browserName?: string;
} 