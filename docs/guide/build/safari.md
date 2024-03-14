# Build _Safari_ extension

<script>
 // At the moment it is the only way I know for a string with {{}} to be rendered with vitepress
 const dmgTitle = '{{id}} (Safari extension)'
 const dmgBundleId = 'com.bepp.{{id}}'
</script>

**Bepp**'s _Safari_ extension packaging feature allows you to effortlessly adapt your **_Chromium_** extensions for **_Safari_**. This capability is specifically designed for straightforward **_Chrome_** extensions. It provides a seamless transition process, enabling you to leverage your existing **_Chrome_** extensions on **_Safari_** with ease.

::: info Important
Please note that this feature is currently in its **experimental** stage and is only supported on _macOS_.
:::

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)
- **macOS** (mac Operating System)
- **Xcode Command Line Tools**. _(installation: `xcode-select --install`)_

::: tip Note
info If you don't have a **macOS** you can use our [GitHub action](/guide/gh-action)
:::

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

Customize the bundle ID used for the DMG (Disk Image) file on macOS. By default, it's set to `{{dmgBundleId}}`, where `id` represents the identification string provided during the build process.

- **CLI option**: `--dmg-bundle-id`
- **Key in JavaScript**: `dmgBundleId`
- **Type**: `string`
- **Default**: `{{dmgBundleId}}`

### `dmgTitle`

Custom title for DMG (macOS)

Set a custom title for the DMG (Disk Image) file on macOS. By default, it's set to `{{dmgTitle}}`, where `id` represents the identification string provided during the build process.

- **Option in CLI**: `--dmg-title`
- **Key in JavaScript**: `dmgTitle`
- **Type**: `string`
- **Default**: `{{dmgTitle}}`

### `dmgIcon`

Custom icon for DMG (macOS)

Specify a custom icon to be used for the DMG (Disk Image) file on macOS.

- **Option in CLI**: `--dmg-icon`
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

- **Option in CLI**: `--dmg-readme-path`
- **Key in JavaScript**: `dmgReadmePath`
- **Type**: `string`

### `dmgReadmeFilename`

Change readme filename for DMG (macOS)

Define a custom filename for the readme file included in the DMG (Disk Image) file on macOS.

- **Option in CLI**: `--dmg-readme-filename`
- **Key in JavaScript**: `dmgReadmeFilename`
- **Type**: `string`
- **Default**: `README.md`

<!--@include: ../../partials/options-shared.md-->

## Examples

::: code-group

```bash
bepp build-safari \
 --input "/my/chromium/path" \
 --dmg-title "{{dmgTitle}}" \
 --id "my-extension-name"
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
    input: '/my/chromium/path',
    dmgTitle: '{{dmgTitle}}',
    id: 'my-extension-name'
})

// or

buildBrowser('safari',{
    input: '/my/chromium/path',
    dmgTitle: '{{dmgTitle}}',
    id: 'my-extension-name'
})
```

:::

## What does this?

::: info Documentation will be available soon
:::

## Useful Links

- [Assessing your Safari web extension's browser compatibility
](https://developer.apple.com/documentation/safariservices/safari_web_extensions/assessing_your_safari_web_extension_s_browser_compatibility)
