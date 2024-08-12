import { joinUrl } from '../core/fs.mjs'

export const releaseBody = ( pkg, version ) => {
	
	return `<p><b>Releases for ${pkg.data.name} v${ version }</b></p>
<p>${ pkg.data.description }</p>

<p>Here you can download the library, the desktop app, the binaries of both the API and the library, etc</p>

📚 [DOCUMENTATION](${ pkg.data.extra.docsUrl})
  - [JS/CLI](${ joinUrl( pkg.data.extra.docsUrl, pkg.data.extra.docsPath.lib )})
  - [API](${ joinUrl( pkg.data.extra.docsUrl, pkg.data.extra.docsPath.api )})
  - [APP](${ joinUrl( pkg.data.extra.docsUrl, pkg.data.extra.docsPath.app )})
  - [CONTAINER](${ joinUrl( pkg.data.extra.docsUrl, pkg.data.extra.docsPath.app )})
  - [GITHUB ACTION](${ joinUrl( pkg.data.extra.docsUrl, pkg.data.extra.docsPath.gh )})
🧩 [CHANGELOG](${ joinUrl( pkg.data.repository.url, '/blob/main/packages/core/CHANGELOG.md' )})
📜 [LICENSE](${joinUrl( pkg.data.repository.url, '/blob/main/LICENSE' )})

`

}
