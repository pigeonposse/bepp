# BEPP GitHub Action

![HEADER](/banner/bepp-githubaction-banner.png)

Package your extensions using the official GitHub Action `bepp`.
This is perfect for when you don't have access to a macOS operating system but still want to package your extension for Safari.

- [What is Bepp?](/guide/)
- [Build with a Bepp config file](../lib/build/config-file)
- [GitHub Action Documentation](https://docs.github.com/actions)

## Usage

To use the GitHub Action, you'll need to understand how extension building works through a configuration file called `bepp`.

You can read more about this [here](../lib/build/config-file).

::: code-group

```yaml [.github/workflows/build.yml]
name: Build extensions
on:
  push:
    branches:
      - main
jobs:
  build:
    name: Build extensions with bepp
    runs-on: macos-latest # Must be macos for Safari extension build
    steps:

      - name: 🛎 Checkout
        uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Build extension with BEPP
        uses: pigeonposse/bepp@v1
        ##########################################################################################
        # For custom config file input
        # Default looks for file in workspace path bepp.config.json, bepp.config.yaml, bepp.config.toml
        # More info for config file: https:/bepp.pigeonposse.com/guide/lib/build/config-file
        ##########################################################################################
        # with:
        #   file: './custom-bepp.config.json'
    

     - name: View builds
       runs: ls -ls build/extensions # this is the default output for builds, you can change output folder in bepp config file.
    
     # Do something with builds..

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

## inputs

The following are optional as `step.with` keys

### `file`

Path for config file.

If this option is not specified, the relative path will automatically be searched for configuration files with the following names: `bepp.config.json`, `bepp.config.yaml`, `bepp.config.toml`

- **type**: string

## Examples

::: info Examples will be available soon.
:::
