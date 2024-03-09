import { constructorLinks } from '../core/main.mjs'

const dataWebLinks = pkg => {

	return [
		{
			name : 'Web', color : 'grey', url : pkg.data.extra.collective.web, 
		},
		{
			name : 'About Us', color : 'grey', url : pkg.data.extra.collective.about,
		},
		{
			name : 'Donate', color : 'pink', url : pkg.data.funding.url,
		},
		{
			name : 'Github', logo : 'github', url : pkg.data.extra.collective.gh,
		},
		{
			name : 'Twitter', logo : 'twitter', url : pkg.data.extra.collective.social.twitter,
		},
		{
			name : 'Instagram', logo : 'instagram', url : pkg.data.extra.collective.social.instagram,
		},
		{
			name : 'Medium', logo : 'medium', url : pkg.data.extra.collective.social.medium,
		},
	]

}

export const collectiveImgLInks = pkg => constructorLinks( dataWebLinks( pkg ), 'img' )
