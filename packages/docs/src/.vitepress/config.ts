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
import { joinPath, joinUrl } from '@bepp/config/core'

const repoUrl = repository.url.endsWith('/') ? repository.url : repository.url +'/' ;
const guides = [
	{
		text: 'JS/Node library & CLI', 
		link: joinPath(extra.docsPath.lib,'/') 
	},
	{
		text: 'Application', 
		link: joinPath(extra.docsPath.app,'/') 
	},
	{ 
		text:'API', 
		link:  joinPath(extra.docsPath.api,'/') 
	},
	{ 
		text: 'Container (Docker)', 
		link:  joinPath(extra.docsPath.container,'/') },
	{
	  text: 'GitHub Action',
	  link: joinPath(extra.docsPath.gh,'/')
	},
]
const sidebar = [
	{
	  text: 'Introduction',
	  items: [
		{ text: 'What is BEPP?', link: joinPath(extra.docsPath.guide,'/') },
	  ]
	},
	{
	  text: 'Reference',
	  items: [
		{ text: 'Getting started', link: joinPath(extra.docsPath.lib,'/') },
		{ text: 'Init', link: joinPath(extra.docsPath.lib,'/init') },
		{ 
		  text: 'Build', 
		  link: joinPath(extra.docsPath.lib,'/build/'), 
		  collapsed: false, 
		  items: [
		  { text: 'Config file', link: joinPath(extra.docsPath.lib,'/build/config-file') },
		  { 
			  text: 'Browsers', 
			  collapsed: true, 
			  items: [
				{ text: 'Chromium', link: joinPath(extra.docsPath.lib, '/build/chromium') },
				{ text: 'Chrome', link: joinPath(extra.docsPath.lib, '/build/chrome') },
				{ text: 'Firefox', link: joinPath(extra.docsPath.lib, '/build/firefox') },
				{ text: 'Edge', link: joinPath(extra.docsPath.lib, '/build/edge') },
				{ text: 'Safari', link: joinPath(extra.docsPath.lib, '/build/safari') },
				{ text: 'Brave', link: joinPath(extra.docsPath.lib, '/build/brave') },
				{ text: 'Opera', link: joinPath(extra.docsPath.lib, '/build/opera') },
				{ text: 'Opera GX', link: joinPath(extra.docsPath.lib, '/build/opera-gx') },
				{ text: 'Yandex', link: joinPath(extra.docsPath.lib, '/build/yandex') },
				{ text: 'Custom', link:  joinPath(extra.docsPath.lib,'/build/custom') },
			  ]
		  },
		  { text: 'All', link: joinPath(extra.docsPath.lib,'/build/all') },
		] }
	  ]
	},
	...guides,
	{
	  text: 'Contribute',
	  items: [
		{ text: 'Report issues', link: bugs.url },
		{ text: 'Todo', link: joinPath(extra.docsPath.todo,'/v1') },
	  ]
	},
	{
		text: 'Articles, tutorials etc',
		link: joinPath(extra.docsPath.posts)
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
		pattern: joinUrl(repoUrl, 'edit/main/docs/:path'),
	},
	outline: 'deep',
    nav: [
      { text: 'Home', link: '/' },
      { 
		text: 'Guide', 
		activeMatch: '/^\/guide\//',
		items: guides,
		// link:  joinPath(extra.docsPath.guide),
	},
	  {
		text: 'Articles',
		activeMatch: '/^\/posts\//',
		link: joinPath(extra.docsPath.posts),
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
      	{ 
			icon: 'github', 
			link: repository.url 
		},
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
