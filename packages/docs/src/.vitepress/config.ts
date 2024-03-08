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

const repoUrl = repository.url.endsWith('/') ? repository.url : repository.url +'/' ;
const isDev = process.env.NODE_ENV !== 'production'
const srcDir = isDev ? '../../../docs' : './__temp__/docs'

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
  ignoreDeadLinks: true,
  head: [[
    'link', 
    { 
      rel: 'icon', 
      href: '/favicon.png' // use first "/" for child routes
    }
  ]],
  themeConfig: {
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
        text: 'Donate', 
        link: funding.url 
      },
    ],

    sidebar: [
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
			link: '/guide/build', 
			collapsed: true, 
			items: [
			{ text: 'With Config file', link: '/guide/build/config-file' },
			{ 
				text: 'Browsers', 
				collapsed: true, 
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
        text: 'About',
        items: [
          { text: 'License', link: repoUrl+ 'blob/main/LICENSE'},
          { text: 'More projects', link: extra.collective.web },
        ]
      }
    ],
    // socialLinks: extra.socialLinks as DefaultTheme.SocialLink[],
    socialLinks: [
      { icon: 'github', link: repository.url }
    ],

    footer: {
      message: `Released under the ${license} License.`,
      copyright: `Copyright © ${new Date().getFullYear()} PigeonPosse`,
    }

  }
})
