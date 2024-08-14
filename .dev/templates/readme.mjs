import {
	imgUrl, joinUrl, 
}   from '../core/main.mjs'
import { collectiveImgLInks } from './links.mjs'
import { mark }               from './mark.mjs'

export const org = pkg => {

	const fundingURL = pkg.data.funding.url
	return `## 👨‍💻 Development

**${pkg.data.name.toUpperCase()}** is an open-source project and its development is open to anyone who wants to participate.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](${joinUrl( pkg.data.repository.url, '/issues' )})
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](${joinUrl( pkg.data.repository.url, '/pulls' )})
[![Read more](https://img.shields.io/badge/Read%20more-grey?style=for-the-badge)](${pkg.data.homepage})

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](${fundingURL})

## 📜 License

This software is licensed with **[${pkg.data.license}](/LICENSE)**.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](/LICENSE)

## 🐦 About us

*${pkg.data.extra.collective.name}* is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](${pkg.data.extra.collective.gh})

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="${pkg.data.author.url}.png?size=72" alt="${pkg.data.author.name}" style="border-radius:100%"/> | ${pkg.data.author.name} |   Author & Development   | [@${pkg.data.author.name}](${pkg.data.author.url}) |
| <img src="${pkg.data.contributors[0].url}.png?size=72" alt="${pkg.data.contributors[0].name}" style="border-radius:100%"/> | ${pkg.data.contributors[0].name} |   Logo Design   | [@${pkg.data.contributors[0].name}](${pkg.data.contributors[0].url}) |
| <img src="https://github.com/${pkg.data.extra.collective.name}.png?size=72" alt="${pkg.data.extra.collective.name}" style="border-radius:100%"/> | ${pkg.data.extra.collective.name} | Collective | [@${pkg.data.extra.collective.name}](https://github.com/${pkg.data.extra.collective.name}) |

<br>
<p align="center">

${collectiveImgLInks( pkg )}

</p>`

}

const markFunct = pkg => {

	return `<!--\n${mark( pkg )}\n-->`

}
const header    = pkg => {

	return `
[![HEADER](${joinUrl( pkg.data.extra.rawRepoUrl, '/main/docs/public/banner.png' )})](${pkg.data.homepage})

${collectiveImgLInks( pkg )}

${
	imgUrl( {
		name  : 'License', 
		color : 'green', 
		type  : `github/license/${pkg.data.extra.collective.id}/${pkg.data.name}`,
		url   : '/LICENSE',
	} )
}
[![Version](https://img.shields.io/npm/v/${pkg.data.extra.libraryId}?color=blue&style=for-the-badge&label=Version)](${pkg.data.extra.libraryUrl})

A tool for package your extension for multiple browsers quickly and easily _(Including Safari)_

**${pkg.data.name.toUpperCase()}** is a Cross-Browser Extension Builder, a tool for package your extension for multiple browsers quickly and easily.
This tool include support for browsers as Safari, Chrome, Firefox, Edge, Brave, etc.`

}

const index = pkg => {

	return `
- [Documentation](${pkg.data.homepage})
- [Installation](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.lib, '#installation' )})
- [Articles](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.posts )})

- [📙 JS/NODE Library Documentation](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.lib )})
- [💾 Bin Documentation](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.lib )})
- [🤖 GitHub Action Documentation]( ${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.gh )} )
- [🔌 Api Documentation]( ${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.api )} )
- [🖥️ App Documentation]( ${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.app )} )
- [🐳 Docker Documentation]( ${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.container )} )
`

}

const content = pkg => {

	return `[![SCHEMA](${joinUrl( pkg.data.extra.rawRepoUrl, '/main/docs/public/schema.png' )})](${pkg.data.homepage})

Library guides:
- [Init configuration](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.lib, '/init' )})
- [Build multiple extensions](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.lib,'/build' )})
- [Build extensions with config file](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.lib,'/build/config-file' )})
- [Build Safari extension](${joinUrl( pkg.data.homepage, pkg.data.extra.docsPath.lib, '/build/safari' )})
`

}

export const readme = pkg => {

	return {
		mark    : markFunct( pkg ),
		header  : header( pkg ),
		index   : index( pkg ),
		content : content( pkg ),
		org     : org( pkg ),
	}

}
