# Build _Safari_ extension

<script>
 // At the moment it is the only way I know for a string with {{}} to be rendered with vitepress
 const appTitle = '{{id}} (Safari extension)'
 const appId = 'com.bepp.{{id}}'
</script>

![BANNER](/convert-chrome-to-safari.png)

**Bepp**'s _Safari_ extension packaging feature allows you to effortlessly adapt your **_Chromium_** extensions for **_Safari_**. This capability is specifically designed for straightforward **_Chrome_** extensions. It provides a seamless transition process, enabling you to leverage your existing **_Chrome_** extensions on **_Safari_** with ease.

::: info Important
Please note that this feature is currently in its **experimental** stage and is only supported on _macOS_.
:::

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)
- **macOS** (mac Operating System)
- **Xcode Command Line Tools**. _(installation: `xcode-select --install`)_

::: tip Info
If you don't have a **macOS** you can use our [GitHub action](/guide/gh-action)
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

import {safari, buildBrowser} from '@bepp/bepp'

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
<!--@include: ../../partials/build-browser-chromium-input-2.md-->
::: warning
It is not recommended to use this option.
:::

<!--@include: ../../partials/build-browser-shared.md-->

### `appId`

Bundle identifier for the generated app.

Customize the bundle ID used for macOS app. By default, it's set to `{{appId}}`, where `id` represents the identification string provided during the build process.

- **CLI option**: `--app-id`
- **Key in JavaScript**: `appId`
- **Type**: `string`
- **Default**: `{{appId}}`

### `appTitle`

Title for the generated app.

Set a custom title for macOS app. By default, it's set to `{{appTitle}}`, where `id` represents the identification string provided during the build process.

- **Option in CLI**: `--app-title`
- **Key in JavaScript**: `appTitle`
- **Type**: `string`
- **Default**: `{{appTitle}}`

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

### `onlyXcodeProject`

Packages only the xcode project.
This is useful in case you want to develop after converting from chromium to safari

- **Option in CLI**: `--only-xcode-project`
- **Key in JavaScript**: `onlyXcodeProject`
- **Type**: `boolean`
- **Default**: `false`

<!--@include: ../../partials/options-shared.md-->

## Examples

::: code-group

```bash
bepp build-safari \
 --input "/my/chromium/path" \
 --app-title "{{appTitle}}" \
 --id "my-extension-name"
```

```js
/**
 * Build Safari extension.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/build/safari
 */
import {safari, buildBrowser} from '@bepp/bepp'

safari.build({
    input: '/my/chromium/path',
    appTitle: '{{appTitle}}',
    id: 'my-extension-name'
})

// or

buildBrowser('safari',{
    input: '/my/chromium/path',
    appTitle: '{{appTitle}}',
    id: 'my-extension-name'
})
```

:::

## What does this?

::: info Documentation will be available soon
:::

## Useful Links

- [Assessing your Safari web extension's browser compatibility](https://developer.apple.com/documentation/safariservices/safari_web_extensions/assessing_your_safari_web_extension_s_browser_compatibility)
- [Browser compatibility for manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_compatibility_for_manifest.json)
