import { CmdSharedOptions, CompressTypes } from "../../_shared/types";

export type BuildSharedParams = CmdSharedOptions & {
    id?: string;
    output?: string;
    compress?: CompressTypes;
    filename?: string;
}
export type BuildRequiredSharedParams = Required<BuildSharedParams>