# Build _Edge_ extension

**Bepp** includes a functionality to package extensions for the [**edge**](https://www.microsoft.com/edge) Browser using **Chromium** extensions with [**Manifest V3**](https://developer.chrome.com/docs/extensions/reference/manifest). This feature streamlines the process, allowing developers to extend their **Chrome** extensions to [**edge**](https://www.microsoft.com/edge) with ease.
Additionally, compatibility with [**Manifest V2**](<https://developer.chrome.com/docs/extensions/mv2>) is also supported.

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/lib#installation)

## Usage

::: code-group

```bash
bepp build-edge [options]
```

```js
/**
 * Build Edge extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/lib/build/edge
 */

import {edge, buildBrowser} from '@bepp/bepp'

edge.build({
    /** options **/
})

// Alternative:
buildBrowser('edge',{
    /** options **/
})
```

## Options

<!--@include: ../../../partials/build-browser-chromium-input.md-->
<!--@include: ../../partials/build-browser-chromium-input-2.md-->
<!--@include: ../../../partials/build-browser-shared.md-->
<!--@include: ../../../partials/options-shared.md-->
