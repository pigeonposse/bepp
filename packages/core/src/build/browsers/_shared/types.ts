import { SpinnerFunct } from "../../../_shared/logger";
import { BrowserTypes, ExtTypes, ManVersions } from "../../../_shared/types";
import { BuildSharedParams } from "../../_shared/types";

export type BuildBrowserSharedParams = BuildSharedParams & {
    input: string;
}
export type BuildBrowserProps = {
    name: BrowserTypes, 
    target: ExtTypes 
    man: ManVersions
}

export type BuildBrowserRequiredSharedParams = Omit<Required<BuildBrowserSharedParams>, 'input'>
export type BuildBrowserConstructorProps<T = BuildBrowserSharedParams> = {
    name: string
    target: ExtTypes
    inputPath?: string
    values: T,
    man: ManVersions
}
export type BuildBrowserOnErrorParams<T> = T & BuildBrowserRequiredSharedParams & {
    error: string
    log: SpinnerFunct,
}
export type BuildBrowserCallbackParams<T> =  T & BuildBrowserRequiredSharedParams & {
    log: SpinnerFunct,
    input: string
    manifestPath: string
    manifestProps: any
}
// export type BuildBrowserCallback = (args : BuildBrowserCallbackParams) => void
// export type BuildBrowserOnError= (args : BuildBrowserOnErrorParams) => void

export type buildBrowserConstructor<T> = {
    props: BuildBrowserConstructorProps<T>,
    cb: (args : BuildBrowserCallbackParams<T>) => Promise<void>,
    onError: (args : BuildBrowserOnErrorParams<T>) => void,
}