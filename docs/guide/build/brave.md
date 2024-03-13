# Build _Brave_ extension

**Bepp** includes a functionality to package extensions for the [**Brave**](https://brave.com/) Browser using **Chromium** extensions with [**Manifest V3**](https://developer.chrome.com/docs/extensions/reference/manifest). This feature streamlines the process, allowing developers to extend their **Chrome** extensions to [**Brave**](https://brave.com/) with ease.

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)

## Usage

::: code-group

```bash
bepp build-brave [options]
```

```js
/**
 * Build Brave extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/brave
 */
import {brave, buildBrowser} from 'bepp'

brave.build({
    /** options **/
})

// Alternative:
buildBrowser('brave',{
    /** options **/
})
```

## Options

<!--@include: ../../partials/build-browser-chromium-input.md-->
<!--@include: ../../partials/build-browser-shared.md-->
<!--@include: ../../partials/options-shared.md-->
