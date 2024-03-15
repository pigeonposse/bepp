# Build _Yandex_ extension

**Bepp** includes a functionality to package extensions for the [**Yandex**](https://browser.yandex.com/) Browser using **Chromium** extensions with [**Manifest V3**](https://developer.chrome.com/docs/extensions/reference/manifest). This feature streamlines the process, allowing developers to extend their **Chrome** extensions to [**Yandex**](https://browser.yandex.com/) with ease.
Additionally, compatibility with [**Manifest V2**](<https://developer.chrome.com/docs/extensions/mv2>) is also supported.

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)

## Usage

::: code-group

```bash
bepp build-yandex [options]
```

```js
/**
 * Build yandex extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/yandex
 */

import {yandex, buildBrowser} from '@bepp/bepp'

yandex.build({
    /** options **/
})

// Alternative:
buildBrowser('yandex',{
    /** options **/
})
```

## Options

<!--@include: ../../partials/build-browser-chromium-input.md-->
<!--@include: ../../partials/build-browser-chromium-input-2.md-->
<!--@include: ../../partials/build-browser-shared.md-->
<!--@include: ../../partials/options-shared.md-->
