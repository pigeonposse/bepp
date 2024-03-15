---
outline: 2
---
# What is BEPP?

![HEADER](/public/banner.png)

Bepp is a **Cross-Browser Extension Builder**, a tool for package your extension for multiple browsers quickly and easily.
This tool include support for browsers as [_Safari_](build/safari.md), [_Chrome_](build/chrome.md), [_Firefox_](build/firefox.md), [_Edge_](build/edge.md), [_Brave_](build/brave.md), _etc_.

## Installation

<!--@include: ../partials/installation.md-->

You can also use **BEPP** as a [_Github action_](https://github.com/marketplace/actions/bepp-a-cross-browser-extension-builder).

## Preview

Build **13** types of extensions (including **_Safari_**) in **21s**
> **Extensions built**: _chrome, chrome-mv2, chromium, chromium-mv2, firefox, firefox-mv2, edge, edge-mv2, opera, opera-gx, brave, safari, custom (vilvaldi)_

![Preview](/public/demo.gif)

## Usage

### init

Create a config file for build extension.
[Read more](init.md)

::: code-group

```bash
bepp init [options]
```

```js
/**
 * Init config file for build extensions.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/init
 */

import {init} from '@bepp/bepp'

init({/** options **/})

```

:::

### build

Build extensions in different ways.
[Read more](build.md)

#### Build with a config file

Configure and build extensions using a config file.
[Read more](build/config-file.md)

::: code-group

```bash
bepp build [options]
```

```js
/**
 * Build extensions with config file.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/config-file
 */

import {buildConfig} from '@bepp/bepp'

buildConfig({/** options **/})

```

:::

#### Build for a Specific browser

Create extensions tailored for specific browsers.
[Read more](build#build-for-a-specific-browser)
::: code-group

```bash
bepp build-chrome [options]    # Package Chrome extension
bepp build-firefox [options]   # Package Firefox extension
bepp build-safari [options]    # Package Safari extension (Experimental)
bepp build-chromium [options]  # Package Chromium extension
bepp build-edge [options]      # Package Edge extension
bepp build-brave [options]     # Package Brave extension
bepp build-opera [options]     # Package Opera extension
bepp build-opera-gx [options]  # Package Opera GX extension
bepp build-yandex [options]    # Package Yandex extension
bepp build-custom [options]    # Package Custom extension

```

```js
import {
  chrome, 
  firefox, 
  safari, 
  chromium, 
  edge, 
  brave, 
  opera,
  operaGx, 
  yandex, 
  custom 
} from '@bepp/bepp'

/**
 * Build browser extensions.
 * @description There are multiple ways to execute these functions.
 * @see https://bepp.pigeonposse.com/guide/build#build-for-a-specific-browser
 * @see https://bepp.pigeonposse.com/guide/build/all
 * @see https://bepp.pigeonposse.com/guide/build
 */
const run = () => {
 await chrome.build({
  /** options **/
 })
 await firefox.build({
  /** options **/
 })
 await safari.build({
  /** options **/
 })
 await chromium.build({
  /** options **/
 })
 await edge.build({
  /** options **/
 })
 await brave.build({
  /** options **/
 })
 await opera.build({
  /** options **/
 })
 await operaGx.build({
  /** options **/
 })
 await yandex.build({
  /** options **/
 })
 await custom.build({
  /** options **/
 })
}

try {
  run()
}catch(e){
  console.error(e)
}
```

:::
