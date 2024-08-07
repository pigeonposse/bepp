/**
 * Vitepress config.
 *
 * @description Vitepress config.
 * @see https://vitepress.dev/reference/site-config
 * @see https://vitepress.dev/reference/default-theme-config
 */

import { defineConfig } from 'vitepress'
import { name, description, funding, extra, repository, bugs, license} from "../../../../package.json"
import MarkdownItTaskList from 'markdown-it-task-lists'
import {getReleases} from './get-releases'
import {srcDir, ghActionSVG,npmSVG } from './const'

const repoUrl = repository.url.endsWith('/') ? repository.url : repository.url +'/' ;

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
	{ text: 'App (web & desktop)', link: '/guide/app/index' },
	{ text: 'Api (lib & bin)', link: '/guide/api/index' },
	{ text: 'Container (Docker)', link: '/guide/container/index' },
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
			text: 'Download', 
			items: getReleases()
		},
      { 
        text: 'Donate', 
        link: funding.url 
      },
    ],

    sidebar: { 
		'/guide/': sidebar,
		'/todo/': sidebar,
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
	// @ts-ignore
	collectiveLinks : {
		...extra.collective.social,
		web: extra.collective.web,
		email: extra.collective.email
	},
	customFooter: {
		license,
		copy: {
			name: extra.collective.name,
			url: extra.collective.url
		}
	},
  },
  vite : {
	build: {
		target : 'node22',
	}
  }
})
