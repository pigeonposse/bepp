# Build _Opera_ extension

**Bepp** includes a functionality to package extensions for the [**Opera**](https://www.opera.com/) Browser using **Chromium** extensions with [**Manifest V2**](https://developer.chrome.com/docs/extensions/mv2). This feature streamlines the process, allowing developers to extend their **Chrome** extensions to [**Opera**](https://www.opera.com/) with ease.

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/lib#installation)

## Usage

::: code-group

```bash
bepp build-opera [options]
```

```js
/**
 * Build Opera extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/lib/build/opera
 */

import {opera, buildBrowser} from '@bepp/bepp'

opera.build({
    /** options **/
})

// Alternative:
buildBrowser('opera',{
    /** options **/
})
```

## Options

<!--@include: ../../partials/build-browser-chromium-input-m2.md-->
<!--@include: ../../../partials/build-browser-shared.md-->
<!--@include: ../../../partials/options-shared.md-->
