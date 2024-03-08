### `id`

Identification for build. Used in filename build.
The `id` option allows you to provide an identification string for the build. This identifier is used in the filename during the build process.

- **CLI option**: `--id`
- **JS key**: `id`
- **Type**: `string`
- **Default**: `bepp`

### `output`

Specify the output directory where the packaged extension will be stored.

- **CLI option**: `-o,--output`
- **JS key**: `output`
- **Type**: `string`
- **Default**: `build/extensions`

### `compress`

Compression format for packaging
Choose the compression format for packaging the extension.

- **CLI option**: `-c,--compress`
- **JS key**: `compress`
- **Type**: `tar` `tgz` `gzip` `zip`
- **Default**: `zip`

### `filename`

Define the template for the filename of the packaged extension.

::: details Filename placeholders

The `filename` can include placeholders such:

- `version` takes the version number of the extension manifest.
- `id` takes the id set by the `id` option.
- `browser` takes the browser's identification name.
:::

- **CLI option**: `-f,--filename`
- **JS key**: `filename`
- **Type**: `string`
- **Default**: ```{{ id }}-{{browser}}-{{version}}```
