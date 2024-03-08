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
      text: Documentation
      link: /guide/getting-started
    # - theme: alt
    #   text: API Examples
    #   link: /api-examples

features:

  - title: CLI
    icon: 💻
    details: Command Line Interface (CLI) tools for efficient task management in the terminal.
    link: guide/getting-started

  - title: JS / NODE
    icon: 🚀
    details: Use bepp via JS.
    link: guide/getting-started

  - title: Github action
    icon: 🤖
    details: Use bepp via Github action.
    link: guide/gh-action

  - title: Build with Config file
    icon: ⚙️
    details: Use a configuration file to build multiple browser extensions.
    link: guide/build/config-file

  - title: Build Safari extension
    icon: 🧭
    details: Build extensions for Safari using Chromium extensions.
    link: guide/build/safari

  - title: Build Custom extension
    icon: 🛠️
    details: Create custom extensions for different browsers according to the specific project needs.
    link: guide/build/custom


---


<div class="home-custom">

### Preview

![Preview](/public/demo.gif)

### Installation

<!--@include: ./partials/installation.md-->

</div>

<!-- <div class="home-custom">

![HEADER](images/banner.png)

```bash
bepp init [options]
```

</div> -->
