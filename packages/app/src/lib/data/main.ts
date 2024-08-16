export const appShortcuts = {
	info : [
		'option', 'i',
	],
	settings : [
		'option', 's',
	],
	converter : [
		'option', 'b',
	],
	search : [
		'option', 'k',
	],
	filesystem : [
		'option', 'f',
	],
} 
export const appBin = {
	beppServer : 'bin/bepp-server',
} as const

export const logID = {
	layoutInitError  : 'layout-init-error',
	layoutMountError : 'layout-mount-error',
	serverInvoke     : 'server-invoke',
	serverError      : 'server-error',
	serverData       : 'server-data',
	pageError        : 'page-error',
} as const
