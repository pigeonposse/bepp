/**
 * Tailwind config.
 *
 * @description Tailwind config.
 * @see https://tailwindcss.com/docs/
 * @see https://postcss.org/docs/
 */

const tailwindcss  = require( 'tailwindcss' )
const autoprefixer = require( 'autoprefixer' )

module.exports = {
	plugins : [
		tailwindcss(),
		autoprefixer,
	],
}
