# Build _Opera GX_ extension

**Bepp** includes a functionality to package extensions for the [**Opera GX**](https://www.opera.com/) Browser using **Chromium** extensions with [**Manifest V3**](https://developer.chrome.com/docs/extensions/reference/manifest). This feature streamlines the process, allowing developers to extend their **Chrome** extensions to [**Opera GX**](https://www.opera.com/) with ease.

## Prerequisites

- **__BEPP_ installation_** [_How to_](../index.md#installation)

## Usage

::: code-group

```bash
bepp build-opera-gx [options]
```

```js
/**
 * Build Opera GX extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/lib/build/opera-gx
 */

import {operaGx, buildBrowser} from '@bepp/bepp'

operaGx.build({
    /** options **/
})

// Alternative:
buildBrowser('opera-gx',{
    /** options **/
})
```

## Options

<!--@include: ../../../partials/build-browser-chromium-input.md-->
<!--@include: ../../../partials/build-browser-shared.md-->
<!--@include: ../../../partials/options-shared.md-->
