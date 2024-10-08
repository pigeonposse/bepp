# Build extensions with a config file

This `bepp` feature allows you to create multi-browser extensions using one configuration file.

## Prerequisites

- **__BEPP_ installation_** [_How to_](../index.md#installation)

## Usage

::: code-group

```bash
bepp build [options]
```

```js
/**
 * Build extensions with config file.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/lib/build/config-file
 */

import {buildConfig} from '@bepp/bepp'

buildConfig({/** options **/})

```

:::

## Options

### `config`

Specify configuration for your build.

If this option is not specified, the relative path will automatically be searched for configuration files with the following names: `bepp.config.json`, `bepp.config.yaml`, `bepp.config.toml`.

- **Option in CLI**: `-c` `--config`
	- **Type**: `string`
	- **Description**: The path to the configuration file. When using the CLI, this should be a string representing the path to the configuration file.

- **Key in JavaScript**: `config`
	- **Type**: `string|BuildConfig`
	- **Description**: When using JavaScript, the `config` key can be either a string representing the path to the configuration file or an object containing the [configuration settings](#configuration-options) directly.


## Configuration Options
The configuration options determine how `bepp` will package extensions. You can specify these configuration options in two ways:

- **Configuration File**: You can define the options in a configuration file, such as `bepp.config.json`, `bepp.config.yaml`, `bepp.config.toml`.

- **JavaScript Configuration**: You can also configure the options directly in a JavaScript file by using the buildConfig function.

Below, each available configuration option is described, using TypeScript syntax to illustrate the data types that can be used and what these options do:

```typescript
type BuildConfig = {
    /**
     * Data for shared with your builds.
     * @description In this option, the values are added that will be shared by all the extensions typed in the `build` option.
     */
    shared?: {
		/**
		 * Determines whether verbose output should be enabled.
		 */
		verbose?: boolean;
		/**
		 * Determines whether execution time should be printed.
		 */
		time?: boolean;
		/**
		 * Determines whether the process should exit on error.
		 */
		exit?: boolean;
		/**
		 * Identification for the build. Used in filename build.
		 */
		id?: string;
		/**
		 * Output directory for packaged extensions.
		 */
		output?: string;
		/**
		 * Compression format for packaging.
		 */
		compress?: "tar" | "tgz" | "gzip" | "zip";
		/**
		 * Filename template for packaged extensions.
		 */
		filename?: string;
		/**
		 * Input configuration for the build.
		 */
		input?: {
			/**
			 * Directory for Chromium extension
			 */
			chromium: string;
			/**
			 * Directory for Chromium MV2 extension
			 */
			'chromium-mv2': string;
			/**
			 * Directory for Firefox extension
			 */
			firefox: string;
			/**
			 * Directory for Firefox MV2 extension
			 */
			'firefox-mv2': string;
		}	
	}
    /**
     * Set the browsers you want build.
     * @description An array where configurations for the desired browsers to build will be added. 
     */
    build?: ({
		/**
		 * The `type` key will contain the browser ID.
		 * @type `chrome` | `chrome-mv2` | `chromium` | `chromium-mv2` | `firefox` | `firefox-mv2` | `yandex` | `yandex-mv2` | `edge` | `edge-mv2` | `safari` | `brave` | `opera` | `opera-gx`
		 */
		type: string;
		/**
		 * For each browser type, corresponding options can be added. These options are specified in the documentation section for each browser.
		 * @see https://bepp.pigeonposse.com/guide/lib/build#build-for-a-specific-browser
		 */
		...
  	})[]
}
```

::: details Example of configuration file

::: code-group

```json [bepp.config.json]
{
  "shared": {
    "id": "bepp",
    "input": {
      "chromium": "~/exts/chromium",
      "chromium-mv2": "~/exts/chromium-mv2",
      "firefox": "~/exts/firefox",
      "firefox-mv2": "~/exts/firefox-mv2"
    }
  },
  "build": [
    { "type": "chrome" },
    { "type": "chrome-mv2" },
    { "type": "chromium" },
    { "type": "chromium-mv2" },
    { "type": "firefox" },
    { "type": "firefox-mv2" },
    { "type": "edge" },
    { "type": "edge-mv2" },
    { "type": "opera-gx" },
    { "type": "opera" },
    { "type": "safari" },
    { "type": "brave" },
    { "type": "yandex" },
    { "type": "yandex-mv2" },
    {
      "type": "custom",
      "browserName": "vivaldi",
      "input": "~/exts/chromium"
    }
  ]
}

```

```toml [bepp.config.toml]

[shared]
  id = "bepp"
  
  [shared.input]
    chromium = "~/exts/chromium"
    chromium-mv2 = "~/exts/chromium-mv2"
    firefox = "~/exts/firefox"
    firefox-mv2 = "~/exts/firefox-mv2"

[[build]]
  type = "chrome"
[[build]]
  type = "chrome-mv2"
[[build]]
  type = "chromium"
[[build]]
  type = "chromium-mv2"
[[build]]
  type = "firefox"
[[build]]
  type = "firefox-mv2"
[[build]]
  type = "edge"
[[build]]
  type = "edge-mv2"
[[build]]
  type = "opera-gx"
[[build]]
  type = "opera"
[[build]]
  type = "safari"
[[build]]
  type = "brave"
[[build]]
  type = "yandex"
[[build]]
  type = "yandex-mv2"
[[build]]
  type = "custom"
  browserName = "vivaldi"
  input = "~/exts/chromium"


```

```yaml [bepp.config.yaml]

shared:
  id: bepp
  input:
    chromium: "~/exts/chromium"
    chromium-mv2: "~/exts/chromium-mv2"
    firefox: "~/exts/firefox"
    firefox-mv2: "~/exts/firefox-mv2"
build:
  - type: chrome
  - type: chrome-mv2
  - type: chromium
  - type: chromium-mv2
  - type: firefox
  - type: firefox-mv2
  - type: edge
  - type: edge-mv2
  - type: opera-gx
  - type: opera
  - type: safari
  - type: brave
  - type: yandex
  - type: yandex-mv2
  - type: custom
    browserName: vivaldi
    input: "~/exts/chromium"

```

:::

## Examples

### Using the CLI

Build multiple extensions in parallel using the CLI.

::: code-group

```bash cli
## It is not necessary to specify the configuration file if it is equal to ./bepp.config.json or ./bepp.config.yaml or ./bepp.config.toml
bepp build
# or
bepp build -c ./bepp.config.json
```

```json [bepp.config.json]
{
  "shared": {
    "id": "bepp",
    "input": {
      "chromium": "~/exts/chromium",
      "chromium-mv2": "~/exts/chromium-mv2",
      "firefox": "~/exts/firefox",
      "firefox-mv2": "~/exts/firefox-mv2"
    }
  },
  "build": [
    { "type": "chrome" },
    { "type": "chrome-mv2" },
    { "type": "chromium" },
    { "type": "chromium-mv2" },
    { "type": "firefox" },
    { "type": "firefox-mv2" },
    { "type": "edge" },
    { "type": "edge-mv2" },
    { "type": "opera-gx" },
    { "type": "opera" },
    { "type": "safari" },
    { "type": "brave" },
    { "type": "yandex" },
    { "type": "yandex-mv2" },
    {
      "type": "custom",
      "browserName": "vivaldi",
      "input": "~/exts/chromium"
    }
  ]
}

```

:::

### Using JS

Build multiple extensions in parallel using only Javascript.

```js
/**
 * Build Multiple extensions.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/lib/build/config-file
 */

import {buildConfig} from '@bepp/bepp'

buildConfig({
  config: {
    shared: {
      id: "bepp",
      input: {
        chromium: "~/exts/chromium",
        "chromium-mv2": "~/exts/chromium-mv2",
        firefox: "~/exts/firefox",
        "firefox-mv2": "~/exts/firefox-mv2"
      }
    },
    build: [
      { type: "chrome" },
      { type: "chrome-mv2" },
      { type: "chromium" },
      { type: "chromium-mv2" },
      { type: "firefox" },
      { type: "firefox-mv2" },
      { type: "edge" },
      { type: "edge-mv2" },
      { type: "opera-gx" },
      { type: "opera" },
      { type: "safari" },
      { type: "brave" },
      { type: "yandex" },
      { type: "yandex-mv2" },
      {
        type: "custom",
        browserName: "vivaldi",
        input: "~/exts/chromium"
      }
    ]
  }
})

```

### Using JS and a config file

Build multiple extensions in parallel using Javascript and a configuration file.

::: code-group

```js [index.js]

/**
 * Build Multiple extensions.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/lib/build/config-file
 */

buildConfig({
  config: './bepp.config.json'
})
```

```json [bepp.config.json]
{
  "shared": {
    "id": "bepp",
    "input": {
      "chromium": "~/exts/chromium",
      "chromium-mv2": "~/exts/chromium-mv2",
      "firefox": "~/exts/firefox",
      "firefox-mv2": "~/exts/firefox-mv2"
    }
  },
  "build": [
    { "type": "chrome" },
    { "type": "chrome-mv2" },
    { "type": "chromium" },
    { "type": "chromium-mv2" },
    { "type": "firefox" },
    { "type": "firefox-mv2" },
    { "type": "edge" },
    { "type": "edge-mv2" },
    { "type": "opera-gx" },
    { "type": "opera" },
    { "type": "safari" },
    { "type": "brave" },
    { "type": "yandex" },
    { "type": "yandex-mv2" },
    {
      "type": "custom",
      "browserName": "vivaldi",
      "input": "~/exts/chromium"
    }
  ]
}

```

:::
