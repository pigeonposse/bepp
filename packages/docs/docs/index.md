---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "BEPP"
  text: "A Cross-Browser Extension Builder"
  tagline: A tool for package your extension for multiple browsers quickly and easily (Including Safari)
  image:
      src: /logo.png
      alt: BEPP
  actions:
    - theme: brand
      text: Get started
      link: /guide
    - theme: alt
      text: View on GitHub
      link: https://pigeonposse.com

features:

  - title: CLI
    icon: 💻
    details: Command Line Interface (CLI) tools for efficient task management in the terminal.
    link: guide/lib

  - title: JS / NODE
    icon: 🚀
    details: Use bepp via JS.
    link: guide/lib

  - title: Github action
    icon: 🤖
    details: Use bepp via Github action.
    link: guide/gh-action

  - title: API
    icon: 📡 
    details: Use bepp via Api Rest
    link: guide/api

  - title: APP
    icon: 🌐
    details: Use bepp via Api Rest
    link: guide/app

  - title: Container (Docker)
    icon: 🐳
    details: Use bepp UI in a docker container
    link: guide/container


  - title: 'GUIDE: Build with Config file'
    icon: ⚙️
    details: Use a configuration file to build multiple browser extensions.
    link: guide/lib/build/config-file

  - title: 'GUIDE: Build Safari extension'
    icon: 🧭
    details: Build extensions for Safari using Chromium extensions.
    link: guide/lib/build/safari

  - title: 'GUIDE: Build Custom extension'
    icon: 🛠️
    details: Create custom extensions for different browsers according to the specific project needs.
    link: guide/lib/build/custom

# demo: /demo.gif

---
