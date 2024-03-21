---
date: 2024-21-03
title: Convertir una extensión de _Chrome_ a Safari
description: Convertir una extensión de Chrome a Safari (fácil y rápido)
image: '/chrome-to-safari.png'
author: 
  name: Ángel Espejo
  gravatar: cd98740b9cdd458c9353bb01faeac089
  link: https://github.com/angelespejo
category: tutorial
---

![banner](/chrome-to-safari.png)

# Convertir una extensión de _Chrome_ a _Safari_ (fácil y rápido) <Badge type="info" :text="$frontmatter.category" />

::: details Índice
[[toc]]
:::

## Introducción

Hola, amigos 🌟,

Soy [Ángel](https://github.com/angelespejo), uno de los miembros del [colectivo PigeonPosse]([Ángel](https://github.com/pigeonposse), y hoy quiero compartir con ustedes cómo convertir una extensión de **Chrome** a **Safari** de manera fácil y rápida utilizando [Bepp](https://bepp.pigeonposse.com).

**Bepp** es una herramienta de código abierto diseñada para facilitar la creación de extensiones multiplataforma para navegadores web modernos, incluyendo _Safari_, _Chrome_, _Firefox_, _Edge_, _Brave_, etc. Con **Bepp**, puedes empaquetar tu extensión para 13 o más tipos de navegadores con solo rellenar un archivo de configuración.

> La idea detrás de **Bepp** es que el desarrollador se preocupe solo de desarrollar la extensión y que el proceso de conversión a otros navegadores lo gestione la propia herramienta. [Leer más](https://bepp.pigeonposse.com/guide/getting-started)

![HEADER](/schema.png)

Aunque **Bepp** puede hacer mucho más, en este post nos centraremos solo en la **conversión de Chrome a Safari**.

## Requisitos

- macOS (mac Operating System)

::: tip Info
Si no tienes **macOS**, puedes usar nuestra [acción de GitHub](https://github.com/marketplace/actions/bepp-a-cross-browser-extension-builder).
:::

## Instalación

Antes de empezar, deberemos instalar `Bepp`. Esto se puede hacer de tres formas distintas:

1. **Instalación en un entorno Node:** Simplemente ejecuta uno de los siguientes comandos en tu terminal dependiendo del gestor de paquetes que utilices:

```bash
# using npm
npm install @bepp/bepp
# using pnpm
pnpm i @bepp/bepp
# using yarn
yarn add @bepp/bepp
```

2. **Descargar el binario:** Descarga el binario de Bepp. Compatible con `Windows`, `Linux` y `macOS`. [Descargar](https://github.com/pigeonposse/bepp/releases/latest)

3. **Utilizando una GitHub Action:** Integra Bepp en tus flujos de trabajo de GitHub utilizando nuestra acción disponible. [Leer más](https://bepp.pigeonposse.com/guide/getting-started#installation)

## Archivo de configuración

Una vez tengas **Bepp** instalado, necesitarás crear un **archivo de configuración** para tu extensión. Este archivo especifica los detalles de tu extensión, como el nombre, la ruta de entrada, las plataformas de destino, etc. Puedes utilizar un archivo `YAML`, `TOML` o `JSON` para esto.
Mi ejemplo será con un archivo `yaml`:

```yaml
# ./bepp.config.yml
shared: 
  id: 'My extension name'
  input: 
    chrome: 'my-extension/path/' 
  output: 'dist'
build: 
  - type: safari
```

### Configuración adicional

Hay más campos para personalizar aún más tu `build`. Si quieres más información, puedes leer más [aquí](https://bepp.pigeonposse.com/guide/build/config-file) o ejecutar:

```bash
# para ayuda en el build:
bepp help build
# para ayuda solo del build de Safari:
bepp help build-safari
```

## Ejecución

Una vez configurado el **archivo de configuración**, tendrás que ejecutar Bepp para convertir tu extensión de _Chrome_ a _Safari_. Esto lo puedes hacer de forma sencilla ejecutando:

```bash
bepp build
```

## Integración con GitHub Action

Puedes integrar **Bepp** en tus flujos de trabajo de GitHub y subir las extensiones construidas a GitHub.

Ejemplo:

```yaml
# .github/workflows/build.yml

name: Release extensions
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Set number for release version'
        type: string
        required: true
jobs:
  build:
    name: Release extensions with Bepp
    runs-on: macos-latest # Must be macOS for Safari extension build
    steps:

      - name: 🛎 Checkout
        uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 🚀 Build extension with BEPP GH
        uses: pigeonposse/bepp@v1.1.0
        ##########################################################################################
        # For custom config file input
        # Default looks for file in workspace path bepp.config.json, bepp.config.yaml, bepp.config.toml
        # More info for config file: https://bepp.pigeonposse.com/guide/build/config-file
        ##########################################################################################
        # with:
        #   file: './custom-bepp.config.json'
   
      ##########################################################################################
      # Alternative build with node
      ##########################################################################################
    #   - name: 🚀 Build extension with BEPP intalled in node_modules
    #     run: pnpm install && pnpm exec bepp build

      - name: Create GitHub release
        uses: ncipollo/release-action@v1
        with:
          tag: "${{  github.event.inputs.version }}"
          name: 'v${{ github.event.inputs.version }}'
          draft: false
          prerelease: false
          allowUpdates: true
          artifacts: "dist/*" # This must be the path where extension builds are
          body: "releases for v {{  github.event.inputs.version }}""


```

## Conclusión

Con **Bepp**, el proceso de conversión de una extensión de _Chrome_ a _Safari_ se simplifica enormemente. Ya no tienes que preocuparte por los detalles técnicos o las diferencias entre las plataformas; **Bepp** se encarga de todo por ti.

Esperamos que esta guía te haya sido útil y que puedas aprovechar al máximo esta herramienta en tus proyectos de desarrollo de extensiones para navegadores web.

Recuerdo que **bepp** es de codigo abierto y estamos abiertos a _sugerencias_ y _pull request_.

- [github](https://github.com/pigeonposse/bepp)
- [issues](https://github.com/pigeonposse/bepp/issues)
- [pull requests](https://github.com/pigeonposse/bepp/pulls)

---

Muchas gracias por leer.

Ángel 🐦🌈
