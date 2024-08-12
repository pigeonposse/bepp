# Build _Chrome_ extension

**Bepp** includes a functionality to package extensions for the [**chrome**](https://www.google.com/chrome/) Browser using **Chromium** extensions with [**Manifest V3**](https://developer.chrome.com/docs/extensions/reference/manifest).
Additionally, compatibility with [**Manifest V2**](<https://developer.chrome.com/docs/extensions/mv2>) is also supported.

## Prerequisites

- **__BEPP_ installation_** [_How to_](../index.md#installation)

## Usage

::: code-group

```bash
bepp build-chrome [options]
```

```js
/**
 * Build Chrome extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/lib/build/chrome
 */

import {chrome, buildBrowser} from '@bepp/bepp'

chrome.build({
    /** options **/
})

// Alternative:
buildBrowser('chrome',{
    /** options **/
})
```

## Options

<!--@include: ../../../partials/build-browser-chromium-input.md-->
<!--@include: ../../partials/build-browser-chromium-input-2.md-->
<!--@include: ../../../partials/build-browser-shared.md-->
<!--@include: ../../../partials/options-shared.md-->
