# Build _Custom_ extension

**Bepp** includes a functionality to package extensions for **custom browser**. This feature streamlines the process and allows developers to extend their extensions to other browsers not available in **bepp** with ease.

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)

## Usage

::: code-group

```bash
bepp build-custom [options]
```

```js
/**
 * Build Custom extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/custom
 */

import {custom, buildBrowser} from 'bepp'

custom.build({
    /** options **/
})

// Alternative:
buildBrowser('custom',{
    /** options **/
})
```

## Options

<!--@include: ../../partials/build-browser-input-custom.md-->
<!--@include: ../../partials/build-browser-shared.md-->

### `browserName`

Specify browser name for use in `filename` option.

- **Option in CLI**: `--b` `--browser-name`
- **Key in JavaScript**: `browserName`
- **Type**: `string`

<!--@include: ../../partials/options-shared.md-->

## Examples

::: code-group

```bash
bepp build-custom \
 --input "/my/chromium/path" \
 --browser-name "vivaldi" \
 --id "my-extension-name"
```

```js
/**
 * Build Custom extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/custom
 */

import {custom, buildBrowser} from 'bepp'

custom.build({
    input: '/my/chromium/path',
    brwoserName: 'vivaldi',
    id: 'my-extension-name'
})

// Alternative:
buildBrowser('custom',{
    input: '/my/chromium/path',
    brwoserName: 'vivaldi',
    id: 'my-extension-name'
})
```
