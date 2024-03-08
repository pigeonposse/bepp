/**
 * TYPES.
 *
 * @description File for set core types.
 */

import type { Command } from '@commander-js/extra-typings'

/**
 * ****************************************************************************.
 * CONSTANTS
 * ****************************************************************************.
 */

export const compressTypes = {
	tar  : 'tar',
	tgz  : 'tgz',
	gzip : 'gzip',
	zip  : 'zip',
} as const 

export const compressionExtsTypes = {
	[compressTypes.tar]  : '.tar',
	[compressTypes.tgz]  : '.tar.gz',
	[compressTypes.gzip] : '.gz',
	[compressTypes.zip]  : '.zip',
} as const 
export const manVersions = {
	3    : '3',
	2    : '2',
	none : 'none',
} as const 
export const manTypes = {
	chromium    : 'chromium',
	chromiumMv2 : 'chromium-mv2',
	firefox     : 'firefox',
	firefoxMv2  : 'firefox-mv2',
}as const 
export const extTypes = {
	chromium : 'chromium',
	firefox  : 'firefox',
	all      : 'all',
} as const 

export const browserTypes = {
	chrome      : 'chrome',
	chromeMv2   : 'chrome-mv2',
	chromium    : 'chromium',
	chromiumMv2 : 'chromium-mv2',
	firefox     : 'firefox',
	firefoxMv2  : 'firefox-mv2',
	yandex      : 'yandex',
	yandexMv2   : 'yandex-mv2',
	edge        : 'edge',
	edgeMv2     : 'edge-mv2',
	safari      : 'safari',
	brave       : 'brave',
	opera       : 'opera',
	operagx     : 'opera-gx',
	custom      : 'custom',
} as const 

/**
 * ****************************************************************************.
 * TYPE UTILS
 * ****************************************************************************.
 */

export type ObjectValues<Values> = Values[keyof Values]
export type ObjectVKeys<Values> = keyof Values

/**
 * ****************************************************************************.
 * TYPES
 * ****************************************************************************.
 */

/**
 * Compression type.
 */
export type CompressTypes = ObjectValues<typeof compressTypes>

export type ManVersions = ObjectValues<typeof manVersions>
export type ExtTypes = ObjectValues<typeof extTypes>
export type BrowserTypes = ObjectValues<typeof browserTypes>
export type CompressFunct = {
    inputPath: string, 
    outputPath: string, 
    outputName: string, 
    format: CompressTypes
}
/**
 * Config Params.
 */
// export type ConfigParams = {
//     input: string
//     compress?: false | CompressTypes
//     name?: string
//     output?: string
// }

/**
 * Super CLI.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Program = Command<[], {}>

export type CmdSharedOptions = {
    verbose?: boolean,
    time?: boolean
    exit?: boolean
}

export type OptionSharedParams<DefaultValue> ={
    value: string[], 
    desc: string, 
    defaultValue?: DefaultValue, 
}

export type OptionBooleanParams = OptionSharedParams<boolean> 
export type OptionStringParams = OptionSharedParams<string> & {
    name: string,
    choices?: string[]
}
export type OptionArrayParams = OptionStringParams

type CmdSharedParams = {
    value: string, 
    desc: string, 
    infoPath?: string
}
export type CmdParams = CmdSharedParams
export type CmdParamsWithValue = CmdSharedParams & {
    name: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type CmdActionParam = ( args_0: {}, args_1: Command<[], {}> ) => void | Promise<void>
// eslint-disable-next-line @typescript-eslint/ban-types
export type CmdActionWithValueParam = ( args_0: string, args_1: {}, args_2: Command<[string], {}> ) => void | Promise<void>;
type CmdActionParamType<T> = T extends CmdParamsWithValue ? CmdActionWithValueParam : CmdActionParam

type CmdConstructorOption<T, U> = U & { type: T }
type CmdConstructorOpts = (
    CmdConstructorOption<'boolean',OptionBooleanParams> |
    CmdConstructorOption<'array',OptionArrayParams> |
    CmdConstructorOption<'string',OptionStringParams> 
)[]
type CmdConstructorGeneric<T> = {
    cmd: T
    options: CmdConstructorOpts
    action: CmdActionParamType<T>
}
export type CmdConstructor = 
    // CmdConstructorGeneric<CmdParamsWithValue> |
    CmdConstructorGeneric<CmdParams> 

export type CLIParams = {
    program: Program
}
