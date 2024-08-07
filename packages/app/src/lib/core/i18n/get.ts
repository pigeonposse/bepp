/**
 * Lang index.
 *
 * @description Lang index.
 */

import lang from '../../../_locales/lang.json'

export type i18nLangId = keyof typeof lang
export type i18nTranslation = {[key in i18nLangId]: {lang: typeof lang}}

export const translations: i18nTranslation = {
	ca : {
		lang,
	},
	es : {
		lang,
	},
	en : {
		lang,
	},
} 

export const loaders = [
	// en
	{
		locale : 'en',
		key    : 'home',
		loader : async () => ( await import( '../../../_locales/en/home.json' ) ).default,
	},
	{
		locale : 'en',
		key    : 'common',
		loader : async () => ( await import( '../../../_locales/en/common.json' ) ).default,
	},
	{
		locale : 'en',
		key    : 'error',
		loader : async () => ( await import( '../../../_locales/en/error.json' ) ).default,
	},
	{
		locale : 'en',
		key    : 'info',
		loader : async () => ( await import( '../../../_locales/en/info.json' ) ).default,
	},
	{
		locale : 'en',
		key    : 'settings',
		loader : async () => ( await import( '../../../_locales/en/settings.json' ) ).default,
	},
	// es
	{
		locale : 'es',
		key    : 'home',
		loader : async () => ( await import( '../../../_locales/es/home.json' ) ).default,
	},
	{
		locale : 'es',
		key    : 'common',
		loader : async () => ( await import( '../../../_locales/es/common.json' ) ).default,
	},
	{
		locale : 'es',
		key    : 'error',
		loader : async () => ( await import( '../../../_locales/es/error.json' ) ).default,
	},
	{
		locale : 'es',
		key    : 'info',
		loader : async () => ( await import( '../../../_locales/es/info.json' ) ).default,
	},
	{
		locale : 'es',
		key    : 'settings',
		loader : async () => ( await import( '../../../_locales/es/settings.json' ) ).default,
	},
	// ca
	{
		locale : 'ca',
		key    : 'home',
		loader : async () => ( await import( '../../../_locales/ca/home.json' ) ).default,
	},
	{
		locale : 'ca',
		key    : 'common',
		loader : async () => ( await import( '../../../_locales/ca/common.json' ) ).default,
	},
	{
		locale : 'ca',
		key    : 'error',
		loader : async () => ( await import( '../../../_locales/ca/error.json' ) ).default,
	},
	{
		locale : 'ca',
		key    : 'info',
		loader : async () => ( await import( '../../../_locales/ca/info.json' ) ).default,
	},
	{
		locale : 'ca',
		key    : 'settings',
		loader : async () => ( await import( '../../../_locales/ca/settings.json' ) ).default,
	},
]
const getDefaultLocale: i18nLangId = 'en'

export const defaultLocale = getDefaultLocale

export { lang }

