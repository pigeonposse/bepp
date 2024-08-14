---
date: 2024-03-21
title: How to allow unsigned safari extensions in macOS
description: How to allow and open unsigned safari extensions in macOS
image: '/posts/banner/allow-unsigned-safari-extensions-in-macos--banner.png'
author: 
  name: Angelo
  github: angelespejo
  url: https://github.com/angelespejo
category: tutorial
outline: 2
---

# How to open **Unsigned** _Safari_ extensions on _macOS_

::: details Index
[[toc]]
:::

## Introduction

Hello again _amigos_ 🌟,

I am [Ángel](https://github.com/angelespejo), one of the members of the [**PigeonPosse** collective](https://github.com/pigeonposse), and today I intend to explain how to allow _**unsigned Safari extensions on macOS**_.

For this demonstration I will use an extension called [**supe8**](https://github.com/pigeonposse/super8/tree/main/packages/exts). Extension that I already used in [convert a chrome extension to safari](./convert-chrome-to-safari.md).

If you wish, you can use this same extension and follow the steps one by one. [Download extension](https://github.com/pigeonposse/super8/releases/latest/)

## 1. Download _Safari_ extension

![Download](/posts/super8-safari-extension--github-download.png){data-zoomable}

## 2. Decompress extension

![TGZ](/posts/super8-safari-extension--open-tgz.png){data-zoomable}

## 3. Open DMG

![DMG OPENED](/posts/super8-safari-extension--dmg.png){data-zoomable}

## 4. Drag the app to the `Applications` folder

In the DMG window, drag the app to the Applications folder

![DMG open](/posts/super8-safari-extension--dmg-open.png){data-zoomable}

::: tip Info
If you open an extension built with **bepp**, by default it will come with a **readme file** that explains the activation process.

File content:

![DMG open](/posts/super8-safari-extension--dmg-readme.png){data-zoomable}

:::

## 5. Go to lauchpad and click app

![Launchpad](/posts/super8-safari-extension--app-launchpad.png){data-zoomable}

## 6. Allow _Safari_ extension app

An alert appears when I open the _Safari_ extension app:

![alert](/posts/super8-safari-extension--macos-permisions.png){data-zoomable}

Go to `settings` and click on `privacy and security` then allow _macOS_ to open **application**.

![settings](/posts/super8-safari-extension--macos-settings-privacy.png){data-zoomable}

You can read more about this on the Apple support page. [Read more](https://support.apple.com/guide/mac-help/mh40616/mac)

## 7. Open _Safari_ extension app

![Open App](/posts/super8-safari-extension--open-app+dock.png){data-zoomable}

Once you open the app and click the button to open _Safari_, it is normal that your extension does not appear, for it to appear you will have to follow the next step.

## 8. Allow unsigned extensions in _Safari_

1. Open Safari and choose `Safari` > `Settings`.
2. Select the `Advanced` tab, then select the `Show Develop menu in menu bar` checkbox.

![dev options](/posts/super8-safari-extension-safari-settings-allow-developer-options.png){data-zoomable}

3. Choose `Develop` > `Allow Unsigned Extensions`, enter your password, and click `OK`.

::: tip Info
If you are using _Safari 17 or later_, click the Developer tab in Safari Settings, and select the "Allow unsigned extensions" option. The Allow Unsigned Extensions setting resets when a user quits Safari, so you need to set it again the next time you launch Safari.
:::

![Unsigned](/posts/super8-safari-extension--safari-settings-prerequisits.png){data-zoomable}

[Apple documentation](https://developer.apple.com/documentation/safariservices/safari_app_extensions/building_a_safari_app_extension#2957925)

## 9. Activate extension in _Safari_ settings

1. Choose `Safari` > `Settings` and click the `Extensions` tab. This tab shows the localized description, display name, and version number for the selected Safari app extension. It also provides a more nuanced message about the permissions for the extension.
2. Find your new extension in the list on the left, and enable it by selecting its checkbox.
3. Close Safari Settings.

![Activate](/posts/super8-safari-extension--safari-settings-activate.png){data-zoomable}

## 10. Extension is activated

![Preview](/posts/super8-safari-extension--extension-preview.gif){data-zoomable}

### Extension popup

![extension popup](/posts/super8-safari-extension--extension-popup.png){data-zoomable}

### Extension options page

![extension options](/posts/super8-safari-extension--extension-options.png){data-zoomable}

### Extension content

![extension content](/posts/super8-safari-extension--extension-content.png){data-zoomable}

---

That's all friends, thank you very much for reading.

Ángel 🐦🌈
