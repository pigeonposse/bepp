export const platform = {
	LINUX     : 'linux',
	MACOS     : 'macos',
	IOS       : 'ios',
	FREEBSD   : 'freebsd',
	DRAGONFLY : 'dragonfly',
	NETBSD    : 'netbsd',
	OPENBSD   : 'openbsd',
	SOLARIS   : 'solaris',
	ANDROID   : 'android',
	WINDOWS   : 'windows',
	UNKNOWN   : 'unknown',
} as const
export const writeType = {
	bin    : 'bin',
	json   : 'json',
	base64 : 'base64',
	text   : 'text',
} as const

export const zipFilesConversionType = {
	base64     : 'base64',
	uint8array : 'uint8array',
} as const
