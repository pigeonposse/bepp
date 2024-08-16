/**
 * Export fa.
 *
 * @description Export individual icons for a ligthweigth build.
 * @see https://www.npmjs.com/package/svelte-fa
 * @see https://fontawesome.com/search?o=r&m=free
 */

export { default as commandSVG } from './command.svg?raw'
export { default as optionSVG } from './option.svg?raw'
export { default as dragAndDropSVG } from './drag-and-drop.svg?raw'
export { default as operaGxSVG } from './opera-gx.svg?raw'
export { default as yandexSVG } from './yandex.svg?raw'

export { Fa } from 'svelte-fa'
export {
	faSafari, 
	faChrome, 
	faBrave, 
	faEdge, 
	faOpera, 
	faFirefoxBrowser, 
} from '@fortawesome/free-brands-svg-icons'
export {
	faSearch, 
	faStop, 
	faPuzzlePiece, 
	faChevronLeft,
	faUpload,
	faCircleHalfStroke,
	faTriangleExclamation,
	faInfo,
	faGear,
	faHome,
	faBug,
	faUpRightFromSquare,
	faFileZipper,
	faBook,
	faHeart,
	faClose,
	faGlobe,
} from '@fortawesome/free-solid-svg-icons'

export type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
