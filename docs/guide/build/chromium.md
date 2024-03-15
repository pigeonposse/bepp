# Build _chromium_ extension

Package your [**chromium**](https://www.chromium.org/getting-involved/download-chromium/) extensions quickly. compatible for [**Manifest V3**](<https://developer.chrome.com/docs/extensions/reference/manifest>) and [**Manifest V2**](<https://developer.chrome.com/docs/extensions/mv2>)

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)

## Usage

::: code-group

```bash
bepp build-chromium [options]
```

```js
/**
 * Build Chromium extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/chromium
 */
import {chromium, buildBrowser} from '@bepp/bepp'

chromium.build({
    /** options **/
})

// Alternative:
buildBrowser('chromium',{
    /** options **/
})
```

## Options

<!--@include: ../../partials/build-browser-chromium-input.md-->
<!--@include: ../../partials/build-browser-chromium-input-2.md-->
<!--@include: ../../partials/build-browser-shared.md-->
<!--@include: ../../partials/options-shared.md-->
