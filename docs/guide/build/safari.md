# Build _Safari_ extension

**Bepp**'s _Safari_ extension packaging feature allows you to effortlessly adapt your **_Chromium_** extensions for **_Safari_**. This experimental capability is specifically designed for straightforward _Chrome_ extensions. It provides a seamless transition process, enabling you to leverage your existing _Chrome_ extensions on _Safari_ with ease. Please note that this feature is currently in its experimental stage and is only supported on macOS.

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)
- **macOS** (mac Operating System)
- **Xcode Command Line Tools**. _(installation: `xcode-select --install`)_

## Usage

::: code-group

```bash
bepp build-safari [options]
```

```js
/**
 * Build Safari extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/safari
 */

import {safari, buildBrowser} from 'bepp'

safari.build({
    /** options **/
})

// Alternative:
buildBrowser('safari',{
    /** options **/
})
```

## Options

<!--@include: ../../partials/build-browser-chromium-input.md-->
<!--@include: ../../partials/build-browser-shared.md-->

### `dmgBundleId`

Custom bundle ID for DMG (macOS)

Customize the bundle ID used for the DMG (Disk Image) file on macOS. By default, it's set to `com.bepp.{{id}}`, where `{{id}}` represents the identification string provided during the build process.

- **CLI option**: `--dmg-bundle-id <dmg-bundle-id>`
- **Key in JavaScript**: `dmgBundleId`
- **Type**: `string`
- **Default**: `com.bepp.{{id}}`

### `dmgTitle`

Custom title for DMG (macOS)

Set a custom title for the DMG (Disk Image) file on macOS. By default, it's set to `{{id}} (Safari extension)`, where `{{id}}` represents the identification string provided during the build process.

- **Option in CLI**: `--dmg-title <dmg-title>`
- **Key in JavaScript**: `dmgTitle`
- **Type**: `string`
- **Default**: `{{id}} (Safari extension)`

### `dmgIcon`

Custom icon for DMG (macOS)

Specify a custom icon to be used for the DMG (Disk Image) file on macOS.

- **Option in CLI**: `--dmg-icon <dmg-icon>`
- **Key in JavaScript**: `dmgIcon`
- **Type**: `string`

### `dmgNoReadme`

Deactivate readme file for DMG (macOS)

Disable the inclusion of the readme file in the DMG (Disk Image) file on macOS.

- **Option in CLI**: `--dmg-no-readme`
- **Key in JavaScript**: `dmgNoReadme`
- **Type**: `boolean`
- **Default**: `false`

### `dmgReadmePath`

Custom readme path for DMG (macOS)

Specify a custom path for the readme file to be included in the DMG (Disk Image) file on macOS.

- **Option in CLI**: `--dmg-readme-path <dmg-readme-path>`
- **Key in JavaScript**: `dmgReadmePath`
- **Type**: `string`

### `dmgReadmeFilename`

Change readme filename for DMG (macOS)

Define a custom filename for the readme file included in the DMG (Disk Image) file on macOS.

- **Option in CLI**: `--dmg-readme-filename <dmg-readme-filename>`
- **Key in JavaScript**: `dmgReadmeFilename`
- **Type**: `string`
- **Default**: `README.md`

<!--@include: ../../partials/options-shared.md-->

## Examples

```bash
bepp build-safari \
 --input "/my/chromium/path" \
 --dmg-title "{{id}} (Safari extension)" \
 --id "my-extension-name"
```

```js
import {safari, buildBrowser} from 'bepp'

safari.build({
    input: '/my/chromium/path',
    dmgTitle: '{{id}} (Safari extension)',
    id: 'my-extension-name'
})

// or

buildBrowser('safari',{
    input: '/my/chromium/path',
    dmgTitle: '{{id}} (Safari extension)',
    id: 'my-extension-name'
})
```

## What does this?

::: info Documentation will be available soon
:::

## Useful Links

- [Assessing your Safari web extension's browser compatibility
](https://developer.apple.com/documentation/safariservices/safari_web_extensions/assessing_your_safari_web_extension_s_browser_compatibility)
