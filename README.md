<!-- PIGEONPOSSE START MARK -->
<!--
██████╗ ██╗ ██████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██║██╔════╝ ██╔════╝██╔═══██╗████╗  ██║
██████╔╝██║██║  ███╗█████╗  ██║   ██║██╔██╗ ██║
██╔═══╝ ██║██║   ██║██╔══╝  ██║   ██║██║╚██╗██║
██║     ██║╚██████╔╝███████╗╚██████╔╝██║ ╚████║
╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
                                               
██████╗  ██████╗ ███████╗███████╗███████╗      
██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝      
██████╔╝██║   ██║███████╗███████╗█████╗        
██╔═══╝ ██║   ██║╚════██║╚════██║██╔══╝        
██║     ╚██████╔╝███████║███████║███████╗      
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝      
                                               
                                               
                                               
█████╗█████╗█████╗█████╗█████╗█████╗█████╗     
╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝     
                                               
                                               
                                               
██████╗ ███████╗██████╗ ██████╗                
██╔══██╗██╔════╝██╔══██╗██╔══██╗               
██████╔╝█████╗  ██████╔╝██████╔╝               
██╔══██╗██╔══╝  ██╔═══╝ ██╔═══╝                
██████╔╝███████╗██║     ██║                    
╚═════╝ ╚══════╝╚═╝     ╚═╝                    
                                                                   
                                                
REPOSITORY: https://github.com/pigeonposse/bepp
AUTHORS: 
	- Angelo (https://github.com/angelespejo)

DEVELOPED BY Angelo 🐦🌈

-->
<!-- PIGEONPOSSE END MARK -->

# BEPP - A Cross-Browser Extension Builder

<!-- PIGEONPOSSE START HEADER -->

[![HEADER](https://raw.githubusercontent.com/pigeonposse/bepp/main/docs/public/banner.png)](https://bepp.pigeonposse.com/)

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Github](https://img.shields.io/badge/Github-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigeonposse)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@pigeonposse)

[![License](https://img.shields.io/github/license/pigeonposse/bepp?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@bepp/bepp?color=blue&style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@bepp/bepp)
[![GitHub Marketplace](https://img.shields.io/github/v/release/pigeonposse/bepp?color=blue&style=for-the-badge&logo=github)](https://github.com/marketplace/actions/bepp-a-cross-browser-extension-builder)

A tool for package your extension for multiple browsers quickly and easily _(Including Safari)_

**BEPP** is a Cross-Browser Extension Builder, a tool for package your extension for multiple browsers quickly and easily.
This tool include support for browsers as Safari, Chrome, Firefox, Edge, Brave, etc.
<!-- PIGEONPOSSE END HEADER -->

<!-- PIGEONPOSSE START INDEX -->

- [Documentation](https://bepp.pigeonposse.com/)
- [Installation](https://bepp.pigeonposse.com/guide/getting-started#installation)
- [GitHub Action Documentation]( https://bepp.pigeonposse.com/guide/gh-action )
- [Api Documentation]( https://bepp.pigeonposse.com/guide/api )
- [App Documentation]( https://bepp.pigeonposse.com/guide/app )
- [Docker Documentation]( https://bepp.pigeonposse.com/guide/container )

Guides:
- [Init](https://bepp.pigeonposse.com/guide/init)
- [Build multiple extensions](https://bepp.pigeonposse.com/guide/build)
- [Build extensions with config file](https://bepp.pigeonposse.com/guide/build/config-file)
- [Build Safari extension](https://bepp.pigeonposse.com/guide/build/safari)

<!-- PIGEONPOSSE END INDEX -->

<!-- PIGEONPOSSE START CONTENT -->
[![SCHEMA](https://raw.githubusercontent.com/pigeonposse/bepp/main/docs/public/schema.png)](https://bepp.pigeonposse.com/)

## Installation _(CLI and Library)_

```bash
npm install @bepp/bepp 
# or
pnpm i @bepp/bepp
# or
yarn add @bepp/bepp 
```

## Preview

**Bepp** is easy and fast 🚀🌈
> Build 13 types of extensions _(including Safari)_ in **21s**

![demo](https://raw.githubusercontent.com/pigeonposse/bepp/main/docs/public/demo.gif)

## Github action

You can use bepp as a **GitHub action**.

- [Read more](https://bepp.pigeonposse.com/guide/gh-action)

## Example

```yaml
name: Build extensions
on:
  push:
    branches:
      - main
jobs:
  build:
    name: Build extensions with bepp
    runs-on: macos-latest # Must be macos for Safari extension build
    steps:

      - name: 🛎 Checkout
        uses: actions/checkout@v4
  
      - name: Build extension with BEPP
        uses: pigeonposse/bepp@v1.1.0
        ##########################################################################################
        # For custom config file input
        # Default looks for file in workspace path bepp.config.json, bepp.config.yaml, bepp.config.toml
        # More info for config file: https://bepp.pigeonposse.com/guide/build/config-file
        ##########################################################################################
        # with:
        #   file: './custom-bepp.config.json'
  
```

- [GH action documentation](https://bepp.pigeonposse.com/guide/gh-action)
- [Config file documentation](https://bepp.pigeonposse.com/guide/build/config-file)

<!-- PIGEONPOSSE END CONTENT -->

<!-- PIGEONPOSSE START ORG -->
## 👨‍💻 Development

**BEPP** is an open-source project and its development is open to anyone who wants to participate.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](https://github.com/pigeonposse/bepp/issues)
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](https://github.com/pigeonposse/bepp/pulls)
[![Read more](https://img.shields.io/badge/Read%20more-grey?style=for-the-badge)](https://bepp.pigeonposse.com/)

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](https://pigeonposse.com/?popup=donate)

## 📜 License

This software is licensed with **[GPL-3.0](/LICENSE)**.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](/LICENSE)

## 🐦 About us

*PigeonPosse* is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](https://github.com/pigeonposse)

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="https://github.com/angelespejo.png?size=72" alt="Angelo" style="border-radius:100%"/> | Angelo |   Author & Development   | [@Angelo](https://github.com/angelespejo) |
| <img src="https://github.com/alejomalia.png?size=72" alt="Alejo" style="border-radius:100%"/> | Alejo |   Logo Design   | [@Alejo](https://github.com/alejomalia) |
| <img src="https://github.com/PigeonPosse.png?size=72" alt="PigeonPosse" style="border-radius:100%"/> | PigeonPosse | Collective | [@PigeonPosse](https://github.com/PigeonPosse) |

<br>
<p align="center">

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Github](https://img.shields.io/badge/Github-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigeonposse)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@pigeonposse)

</p>
<!-- PIGEONPOSSE END ORG -->
