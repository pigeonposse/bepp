# Init

The `init` feature is used to create a config file for building extensions.

## Prerequisites

- **__BEPP_ installation_** [_How to_](/guide/getting-started#installation)

## Usage

::: code-group

```bash
bepp init [options]
```

```js
/**
 * Init config file for build extensions.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/init
 */
import {init} from 'bepp'

init({/** options **/})

```

:::

## Options

<!--@include: ../partials/options-shared.md-->

### `y`

Overwrite file if it exists.

- **CLI option**: `-y`
- **JS key**: `y`
- **Type**: `boolean`

### `id`

Identification for build. Used in filename build.

- **CLI option**: `--id`
- **JS key**: `id`
- **Type**: `string`
- **Default**: `bepp`

### `input`

Input directory for Chromium extension.

- **CLI option**: `-i, --input`
- **JS key**: `input`
- **Type**: `string`

### `build`

List for browser builds.

- **CLI option**: `-b, --build`
- **JS key**: `build`
- **Type**: `( chrome | chrome-mv2 | chromium | chromium-mv2 | firefox | firefox-mv2 | yandex | yandex-mv2 | edge | edge-mv2 | safari | brave | opera | opera-gx )[]`

## Examples

::: code-group

```bash
bepp init -y --id bepp  -i /path/to/extension --build chrome firefox
```

```js
import {init} from 'bepp'

init({
    id: 'my-extension-name',
    input: '/path/to/extension',
    build: ['chrome', 'firefox']
})

```

:::

This command will create a config file for building an extension with the specified options.
