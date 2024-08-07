/**
 * Tailwind config.
 *
 * @description Tailwind config.
 * @see https://tailwindcss.com/docs/
 * @see https://postcss.org/docs/
 */

const tailwindcss  = require( 'tailwindcss' )
const autoprefixer = require( 'autoprefixer' )
// const prefixer     = require( 'postcss-prefix-selector' )

module.exports = {
	plugins : [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		// prefixer( {
		// 	prefix : '.dark',
		// 	transform( prefix, selector, prefixedSelector ) {

		// 		if ( selector.match( /^(html|body)/ ) ) return selector
		// 		if( selector.startsWith( '.dark' ) ) return selector.replace( '.dark', '' )
		// 		else return prefixedSelector

		// 	},
		// } ),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
	],
}
