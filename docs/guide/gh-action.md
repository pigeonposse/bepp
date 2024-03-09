# Github action

::: info Documentation will be available soon.
:::

## Examples

```yaml
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
        uses: pigeonposse/bepp@1.0.4
        ##########################################################################################
        # For custom config file input
        # Default looks for file in workspace path bepp.config.json, bepp.config.yaml, bepp.config.toml
        # More info for config file: https:/bepp.pigeonposse.com/guide/build/config-file
        ##########################################################################################
        # with:
        #   file: './custom-bepp.config.json'


```
