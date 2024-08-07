/**
 * Tailwind config.
 *
 * @description Tailwind config.
 * @see https://tailwindcss.com/docs/
 * @see https://flowbite.com/docs/
 */
const plugin = require( 'tailwindcss/plugin' )

const config = {
	content : [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
	],
	plugins : [
		require( 'flowbite/plugin' ),  
		plugin( function ( { matchUtilities, theme } ) {

			matchUtilities(
				{
					'text-shadow' : value => ( {
						textShadow : value, 
					} ), 
				},
				{
					values : theme( 'textShadow' ), 
				},
			)
		
		} ),
	],
	darkMode : 'class',
	theme    : {
		extend : {
			textShadow : {
				sm      : '0 1px 2px var(--tw-shadow-color)',
				DEFAULT : '0 2px 4px var(--tw-shadow-color)',
				lg      : '0 8px 16px var(--tw-shadow-color)',
			},
			boxShadow : {
				btn : '0 0 20px 2px var(--tw-shadow-color)',
			},
			colors : {
				/**
				 * Colors of interface.
				 *
				 * @see https://uicolors.app/create
				 * @see https://www.tints.dev/
				 */
				primary : { 
					'50'  : '#fbf4f9',
					'100' : '#f8ebf3',
					'200' : '#f3d7ea',
					'300' : '#ebb6d8',
					'400' : '#dd89be',
					'500' : '#d064a4',
					'600' : '#b84383',
					'700' : '#a1356d',
					'800' : '#862e5b',
					'900' : '#702b4e',
					'950' : '#43142c',
				},
				secondary : { 
					'50'  : '#f1faf9',
					'100' : '#dbf2f2',
					'200' : '#bbe4e6',
					'300' : '#8dd0d3',
					'400' : '#56b3ba',
					'500' : '#3fa2aa',
					'600' : '#347c86',
					'700' : '#2f666f',
					'800' : '#2e545c',
					'900' : '#2a484f',
					'950' : '#172e35',
				},
				tertiary : {
					'50'  : '#fbf5fe',
					'100' : '#f5ebfc',
					'200' : '#ecd6f8',
					'300' : '#dfb5f2',
					'400' : '#cd89e9',
					'500' : '#b55cd9',
					'600' : '#9a3cbd',
					'700' : '#812f9c',
					'800' : '#6b2880',
					'900' : '#5e276d',
					'950' : '#390d45',
				},
				gray : {
					50  : '#E6E6E6',
					100 : '#D9D9D9',
					200 : '#BFBFBF',
					300 : '#A6A6A6',
					400 : '#8C8C8C',
					500 : '#737373',
					600 : '#595959',
					700 : '#404040',
					800 : '#262626',
					900 : '#0D0D0D',
					950 : '#000000',
				},
			},
		},
	},
}

module.exports = config
