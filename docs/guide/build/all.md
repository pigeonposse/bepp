# Build Extensions for Multiple Browsers Using JavaScript

This **Bepp** feature is exclusively available for `js` and allows packaging extensions for multiple browsers. For packaging extensions for multiple browsers using the `bin`, refer to the [config file](config-file.md).

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)

## Usage

```js
/**
 * Build multiple extensions.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/all
 */

import { buildAllBrowsers } from '@bepp/bepp'

buildAllBrowsers({
    /** options **/
})

```

## Options

Options is an object parameter where the keys represent the browser IDs, and the values are the configurations specific to each browser.

Available browser IDs: `chrome` | `chrome-mv2` | `chromium` | `chromium-mv2` | `firefox` | `firefox-mv2` | `yandex` | `yandex-mv2` | `edge` | `edge-mv2` | `safari` | `brave` | `opera` | `opera-gx`

To know more about the configuration of each browser, read more [here](../build.md#build-for-a-specific-browser)

## Examples

```js
/**
 * Build multiple extensions.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/all
 */

import { buildAll } from '@bepp/bepp'

buildAllBrowsers({
    safari: {
        input: 'my/chromium/path'
    },
    brave: {
        input: 'my/chromium/path'
    },
    custom: {
        input: 'my/chromium/path',
        browserName: 'vivaldi'
    }
})
```
