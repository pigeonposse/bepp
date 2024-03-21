/**
 * Vitepress config.
 *
 * @description Vitepress config.
 * @see https://vitepress.dev/reference/site-config
 * @see https://vitepress.dev/reference/default-theme-config
 */

import { defineConfig } from 'vitepress'
import { name, description, license, funding, extra, repository, bugs} from "../../../../package.json"
import MarkdownItTaskList from 'markdown-it-task-lists'

const isDev = process.env.NODE_ENV !== 'production'
export const srcDir = isDev ? '../../../docs' : './__temp__/docs'

const repoUrl = repository.url.endsWith('/') ? repository.url : repository.url +'/' ;
const npmSVG = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>npm</title><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/></svg>`
const ghActionSVG = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub Actions</title><path d="M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146zm9.353-.147l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001zM4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zm2.03-2.436L4 6.602V3.406l2.557 1.61zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zm-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zm9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm12 0c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zm-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z"/></svg>`
const sidebar = [
	{
	  text: 'Introduction',
	  items: [
		{ text: 'Getting started', link: '/guide/getting-started' },
	  ]
	},
	{
	  text: 'Reference',
	  items: [
		{ text: 'Init', link: '/guide/init' },
		{ 
		  text: 'Build', 
		  link: '/guide/build/index', 
		  collapsed: false, 
		  items: [
		  { text: 'With Config file', link: '/guide/build/config-file' },
		  { 
			  text: 'Browsers', 
			  collapsed: false, 
			  items: [
				  { text: 'Chromium', link: '/guide/build/chromium' },
				  { text: 'Chrome', link: '/guide/build/chrome' },
				  { text: 'Firefox', link: '/guide/build/firefox' },
				  { text: 'Edge', link: '/guide/build/edge' },
				  { text: 'Safari', link: '/guide/build/safari' },
				  { text: 'Brave', link: '/guide/build/brave' },
				  { text: 'Opera', link: '/guide/build/opera' },
				  { text: 'Opera GX', link: '/guide/build/opera-gx' },
				  { text: 'Yandex', link: '/guide/build/yandex' },
				  { text: 'Custom', link: '/guide/build/custom' },
			  ]
		  },
		  { text: 'All', link: '/guide/build/all' },
		] }
	  ]
	},
	{
	  text: 'Github Action',
	  link: '/guide/gh-action' 
	},
	{
	  text: 'Contribute',
	  items: [
		{ text: 'Report issues', link: bugs.url },
		{ text: 'Todo', link: '/todo/v1' },
	  ]
	},
	{
		text: 'Articles, tutorials etc',
		link: '/posts' 
	},
	{
	  text: 'About',
	  items: [
		{ text: 'License', link: repoUrl+ 'blob/main/LICENSE'},
		{ text: 'More projects', link: extra.collective.web },
	  ]
	}
  ]
export default defineConfig({

  title: `${name} - A Cross-Browser Extension Builder`,
  titleTemplate: `:title - ${name} Documentation`,
  description,
  lang: 'en',
  markdown: {
    config: (md) => {
        md.use(MarkdownItTaskList)
    }
  },
  cacheDir: '../__cache__',
  outDir: '../dist',
  srcDir,
  cleanUrls: true,
//   ignoreDeadLinks: true,
  head: [[
    'link', 
    { 
      rel: 'icon', 
      href: '/favicon.png' // use first "/" for child routes
    }
  ]],
  themeConfig: {
	// ...posts,
    logo: '/logo.png', // use first "/" for child routes
    siteTitle: name.toUpperCase(),
    search: {
      provider: 'local'
    },
	editLink: {
		pattern: repoUrl+ 'edit/main/docs/:path',
	},
	outline: 'deep',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
	  {
		text: 'Articles',
		link: '/posts',
	  },
      { 
        text: 'Donate', 
        link: funding.url 
      },
    ],

    sidebar: { 
		'/guide/': sidebar,
		'/todo/': sidebar
	},
    // socialLinks: extra.socialLinks as DefaultTheme.SocialLink[],
    socialLinks: [
		{ 
			icon: {svg: npmSVG}, 
			link: extra.libraryUrl 
		},
		{ 
			icon: {svg: ghActionSVG}, 
			link: extra.ghActionUrl 
		},
      	{ icon: 'github', link: repository.url },
    ],

    footer: {
      message: `Released under the ${license} License.`,
      copyright: `Copyright © ${new Date().getFullYear()} PigeonPosse`,
    }

  }
})
