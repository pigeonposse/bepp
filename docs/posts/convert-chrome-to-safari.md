---
date: 2024-21-03
title: Convert a Chrome Extension to Safari
description: Convert a Chrome extension to Safari (easy and fast)
image: '/chrome-to-safari.png'
author: 
  name: Ángel Espejo
  gravatar: cd98740b9cdd458c9353bb01faeac089
  link: https://github.com/angelespejo
category: Tutorial
lastUpdated: true
---

![banner](/chrome-to-safari.png)

# Convert a Chrome Extension to Safari (easy and fast) <Badge type="info" :text="$frontmatter.category" />

::: details Index
[[toc]]
:::

## Introduction

Hola Amigos 🌟,

I'm [Ángel](https://github.com/angelespejo), one of the members of the [**PigeonPosse** collective](https://github.com/pigeonposse), and today I want to share with you how to convert a **Chrome** extension to **Safari** easily and quickly using [Bepp](https://bepp.pigeonposse.com).

**Bepp** is an open-source tool designed to facilitate the creation of cross-platform extensions for modern web browsers, including _Safari_, _Chrome_, _Firefox_, _Edge_, _Brave_, etc. With **Bepp**, you can package your extension for 13 or more types of browsers by simply filling out a configuration file.

> The idea behind **Bepp** is for developers to focus solely on developing the extension, leaving the process of converting to other browsers to the tool itself. [Read more](https://bepp.pigeonposse.com/guide/getting-started)

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

3. **Using a GitHub Action:** Integrate Bepp into your GitHub workflows using our available action. [Read more](https://bepp.pigeonposse.com/guide/getting-started#installation)

## Configuration File

Once you have **Bepp** installed, you'll need to create a **configuration file** for your extension. This file specifies the details of your extension, such as the name, input path, target platforms, etc. You can use a `YAML`, `TOML`, or `JSON` file for this. My example will use a `yaml` file:

```yaml
# ./bepp.config.yml
shared: 
  id: 'My extension name'
  input: 
    chrome: 'my-extension/path/' 
  output: 'dist'
build: 
  - type: safari
```

### Additional Configuration

There are more fields to further customize your `build`. If you want more information, you can read more [here](https://bepp.pigeonposse.com/guide/build/config-file) or run:

```bash
# for help in the build:
bepp help build
# for help only for Safari build:
bepp help build-safari
```

## Execution

Once the **configuration file** is set up, you'll need to execute Bepp to convert your extension from _Chrome_ to _Safari_. You can do this easily by running:

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
        uses: pigeonposse/bepp@v1.1.0
        ##########################################################################################
        # For custom config file input
        # Default looks for file in workspace path bepp.config.json, bepp.config.yaml, bepp.config.toml
        # More info for config file: https://bepp.pigeonposse.com/guide/build/config-file
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
          name: 'v${{ github.event.inputs.version }}'
          draft: false
          prerelease: false
          allowUpdates: true
          artifacts: "dist/*" # This must be the path where extension builds are
          body: "releases for v {{  github.event.inputs.version }}""


```

## Conclusion

With **Bepp**, the process of converting a _Chrome_ extension to _Safari_ is greatly simplified. You no longer have to worry about the technical details or the differences between platforms; **Bepp** takes care of everything for you.

We hope this guide has been helpful and that you can make the most of this tool in your web browser extension development projects.

Remember that **Bepp** is open source, and we are open to _suggestions_ and _pull requests_.

- [GitHub](https://github.com/pigeonposse/bepp)
- [Issues](https://github.com/pigeonposse/bepp/issues)
- [Pull Requests](https://github.com/pigeonposse/bepp/pulls)

---

Thank you very much for reading.

Ángel 🐦🌈
