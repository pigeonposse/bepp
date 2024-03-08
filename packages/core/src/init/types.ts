/**
 * TYPES.
 *
 * @description File for set types.
 */
import type {
	BrowserTypes, CmdSharedOptions, 
} from '../_shared/types'

export type InitParams = CmdSharedOptions & {
    id?: string;
    input?: string;
    build?: BrowserTypes[]
    y?: true;
} 
