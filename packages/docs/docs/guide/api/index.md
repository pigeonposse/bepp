# BEPP Api 

The `bepp API` is used by the bepp application, but it can be downloaded and used independently in your own project.

## Installation

You can download the own binary for your operating system or use it from your js project

::: code-group

```bash [npm]
npm install @bepp/api 
```

```bash [pnpm]
pnpm i @bepp/api
```

```bash [yarn]
yarn add @bepp/api 
```

```bash [bin]
# Downlad bin with gh command.
# os: alpine|macos|linux|win
# arch: arm64|x64
gh release download --repo pigeonposse/bepp --pattern 'bepp-api-[os]-[arch].zip'

```

:::

- [Download binaries](https://github.com/pigeonposse/bepp/releases/latest/)
- [Go to npm](https://www.npmjs.com/package/@bepp/api)

## Usage

::: code-group

```js [js]
/**
 * Build bepp server with node.
 * 
 * @see https://bepp.pigeonposse.com/
 * @see https://bepp.pigeonposse.com/guide/api/
 */
import {app} from '@bepp/api'
import http from 'http';

const startServer = async () => {
  try {
    const server = http.createServer(app.fetch);
	const port = 13128

    server.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });

    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please choose a different port.`);
        process.exit(1); // Exit the process with an error code
      } else {
        console.error(`Server error: ${err.message}`);
        process.exit(1); // Exit the process with an error code
      }
    });

  } catch (err) {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1); // Exit the process with an error code
  }
};

// Start the server
startServer();

```

```bash [bin]
# example in linux
./bepp-api-linux-x64 --port=13128
```
:::
## Documentation

The documentation of the api is available once the project has been raised in the `/docs` path.
You can also see an explanation of the routes here:

- [docs](/guide/api/schema)
