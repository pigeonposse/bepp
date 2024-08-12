---
date: 2024-03-20
title: Convert a Chrome extension to Safari extension
description: Convert a Chrome extension to Safari (easy and fast)
image: '/convert-chrome-to-safari-banner.png'
author: 
  name: Angelo
  github: angelespejo
  url: https://github.com/angelespejo
category: tutorial
outline: 2
---

# Convert a Chrome Extension to Safari Extension _(easy and fast)_

::: details Index
[[toc]]
:::

## Introduction

Hola _Amigos_ 🌟,

I'm [Ángel](https://github.com/angelespejo), one of the members of the [**PigeonPosse** collective](https://github.com/pigeonposse), and today I want to share with you how to convert a **Chrome** extension to **Safari** easily and quickly using [Bepp](https://bepp.pigeonposse.com).

**Bepp** is an _open-source_ tool designed to facilitate the creation of cross-platform extensions for modern web browsers, including _Safari_, _Chrome_, _Firefox_, _Edge_, _Brave_, etc. With **Bepp**, you can package your extension for 13 or more types of browsers by simply filling out a configuration file.

> The idea behind **Bepp** is for developers to focus solely on developing the extension, leaving the process of converting to other browsers to the tool itself. [Read more](https://bepp.pigeonposse.com/guide)

![HEADER](/schema.png)

Although **Bepp** can do much more, in this post, we'll focus only on **converting Chrome to Safari**.

## Requirements

- macOS (mac Operating System)

::: tip Info
If you don't have **macOS**, you can use our [GitHub action](https://github.com/marketplace/actions/bepp-a-cross-browser-extension-builder).
:::

## Installation

Before we begin, we need to install `Bepp`. This can be done in three different ways:

1. **Installation in a Node environment:** Simply run one of the following commands in your terminal depending on the package manager you use:

```bash
# using npm
npm install @bepp/bepp
# using pnpm
pnpm i @bepp/bepp
# using yarn
yarn add @bepp/bepp
```

2. **Download the binary:** Download the Bepp binary. Compatible with `Windows`, `Linux`, and `macOS`. [Download](https://github.com/pigeonposse/bepp/releases/latest)

3. **Using a GitHub Action:** Integrate Bepp into your GitHub workflows using our available action. [Read more](https://bepp.pigeonposse.com/guide/lib#installation)

## Configuration File

Once you have **Bepp** installed, you'll need to create a [**configuration file**](https://bepp.pigeonposse.com/guide/lib/build/config-file#file) for your extension. This file specifies the details of your extension, such as the _name_, _input_ path, _target platforms_, _etc_. You can use a `YAML`, `TOML`, or `JSON` file for this.

My example will use a `yaml` file and an extension called [**supe8**](https://github.com/pigeonposse/super8/tree/main/packages/exts).
The idea of using **super8** is that apart from being an _opern-source_ project, it is a fairly complete extension: it contains a **popup**, an **options page**, a **context menu** , **injects js** into the content and has **translations** to other languages. That is, it is perfect to see how the conversion works perfectly with a complex extension. [check **super8** code](https://github.com/pigeonposse/super8/tree/main/packages/exts)

config file:

```yaml
# ./bepp.config.yml

##########################################################################
# Data for shared with your builds.
# @see https://bepp.pigeonposse.com/guide/lib/build/config-file#shared
##########################################################################
shared: 
  id: 'Super8' # name/id of your extension
  input: 
    chromium: 'build/chromium-mv3/' # input of your man 3 extension path
  output: 'dist' # [optional] output path for your built extensions

##########################################################################
# Set the browsers you want build.
# @see https://bepp.pigeonposse.com/guide/lib/build/config-file#build
##########################################################################
build: 
  - type: safari # tells bepp to build your safari extension

##########################################################################
```

### Additional Configuration

There are more fields to further customize your `build`. If you want more information, you can read more [here](https://bepp.pigeonposse.com/guide/lib/build/config-file) or run:

```bash
# for help in the build:
bepp help build
# for help only for Safari build:
bepp help build-safari
```

## Execution

Once the **configuration file** is set up, you'll need to execute **Bepp** to convert your extension from _Chrome_ to _Safari_. You can do this easily by running:

```bash
bepp build
```

## GitHub Action Integration

You can integrate **Bepp** into your GitHub workflows and upload the built extensions to GitHub.

Example:

```yaml
# .github/workflows/build.yml

name: Release extensions
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Set number for release version'
        type: string
        required: true
jobs:
  build:
    name: Release extensions with Bepp
    runs-on: macos-latest # Must be macOS for Safari extension build
    steps:

      - name: 🛎 Checkout
        uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 🚀 Build extension with Bepp GH
        uses: pigeonposse/bepp@v1.2.3
        ##########################################################################################
        # For custom config file input
        # Default looks for file in workspace path bepp.config.json, bepp.config.yaml, bepp.config.toml
        # More info for config file: https://bepp.pigeonposse.com/guide/lib/build/config-file
        ##########################################################################################
        # with:
        #   file: './custom-bepp.config.json'
   
      ##########################################################################################
      # Alternative build with node
      ##########################################################################################
    #   - name: 🚀 Build extension with Bepp intalled in node_modules
    #     run: pnpm install && pnpm exec bepp build

      - name: Create GitHub release
        uses: ncipollo/release-action@v1
        with:
          tag: "${{  github.event.inputs.version }}"
          name: 'Super8 v${{ github.event.inputs.version }}'
          draft: false
          prerelease: false
          allowUpdates: true
          artifacts: "dist/*" # This should be the path where the extensions are built.
          body: "releases for v{{  github.event.inputs.version }}""


```

## Result

Once the conversion is done we will have our extension ready. Below I put images of the **super8 safari extension** created and the process to activate it.

### Open compressed extension

![TGZ](/super8-safari-extension--open-tgz.png)

### Open DMG

![DMG OPENED](/super8-safari-extension--dmg.png)

### In the DMG window, drag the app to the `Applications` folder

![DMG open](/super8-safari-extension--dmg-open.png)

### Go to lauchpad

![Launchpad](/super8-safari-extension--app-launchpad.png)

### Open safari extension app

![Open App](/super8-safari-extension--open-app+dock.png)

### In safari settings, allow unsigned extension

![Unsigned](/super8-safari-extension--safari-settings-prerequisits.png)

::: warning
Maybe this option does not appear, to make it appear you can read more about this in:
[how to open unsigned safari extensions in macos](./how-to-open-unsigned-safari-extensions.md)
:::

### Now you can activate extension in safari settings

![DMG OPENED](/super8-safari-extension--safari-settings-activate.png)

### Extension in use

![Preview](/super8-safari-extension--extension-preview.gif)

#### Extension popup

![extension popup](/super8-safari-extension--extension-popup.png)

#### Extension options page

![extension options](/super8-safari-extension--extension-options.png)

#### Extension content

![extension content](/super8-safari-extension--extension-content.png)

As you can see, everything works perfectly. ✨

## Conclusion

With **Bepp**, the process of converting a _Chrome_ extension to _Safari_ is greatly simplified. You no longer have to worry about the technical details or the differences between platforms; **Bepp** takes care of everything for you.

We hope this guide has been helpful and that you can make the most of this tool in your web browser extension development projects.

## Notes

- This post explains how **bepp** works in version [1.2.3](https://www.npmjs.com/package/@bepp/bepp/v/1.2.3), any future version could be subject to change.
- To date, **bepp** only converts extensions for unsigned _safari_. Read more about [how to open unsigned safari extensions in macos](./how-to-open-unsigned-safari-extensions.md)

---

Remember that **Bepp** is open source, and we are open to _suggestions_ and _pull requests_.

- [GitHub](https://github.com/pigeonposse/bepp)
- [Issues](https://github.com/pigeonposse/bepp/issues)
- [Pull Requests](https://github.com/pigeonposse/bepp/pulls)

---

Thank you very much for reading.

Ángel 🐦🌈
