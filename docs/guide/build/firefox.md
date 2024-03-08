# Build _Firefox_ extension

**Bepp** includes a functionality to package extensions for the [**firefox**](https://www.mozilla.org/firefox) Browser using **Firefox** extensions with [**Manifest V3**](https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide). This feature streamlines the process, allowing developers to extend their **Chrome** extensions to [**firefox**](https://www.mozilla.org/firefox) with ease.
Additionally, compatibility with [**Manifest V2**](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/manifest.json) is also supported.

## Usage

::: code-group

```bash
bepp build-firefox [options]
```

```js
/**
 * Build Firefox extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/firefox
 */

import {firefox, buildBrowser} from 'bepp'

firefox.build({
    /** options **/
})

// Alternative:
buildBrowser('firefox',{
    /** options **/
})
```

## Options

<!--@include: ../../partials/build-browser-firefox-input.md-->
<!--@include: ../../partials/build-browser-firefox-input-2.md-->
<!--@include: ../../partials/build-browser-shared.md-->
<!--@include: ../../partials/options-shared.md-->
