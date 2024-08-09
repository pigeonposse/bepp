import {
	joinPath, 
	pkg, 
} from './fs.mjs'

const workspaceDir     = pkg.dir
const workspacePkg     = joinPath( workspaceDir, 'package.json' )
const packagesDir      = joinPath( workspaceDir, 'packages' )
const documentationDir = joinPath( workspaceDir, 'docs' )
const todoDir          = joinPath( documentationDir, 'todo' )
const devDir           = joinPath( workspaceDir, '.dev' )

const coreDir = joinPath( packagesDir, 'core' )
const corePkg = joinPath( coreDir, 'package.json' )

const beppDir = joinPath( packagesDir, 'bepp' )
const beppPkg = joinPath( beppDir, 'package.json' )

const appDir = joinPath( packagesDir, 'app' )
const appPkg = joinPath( appDir, 'package.json' )

const docsDir = joinPath( packagesDir, 'docs' )
const docsPkg = joinPath( docsDir, 'package.json' )

const apiDir = joinPath( packagesDir, 'api' )
const apiPkg = joinPath( apiDir, 'package.json' )

const confDir = joinPath( packagesDir, '_config' )
const confPkg = joinPath( confDir, 'package.json' )

const extsDir       = joinPath( confDir, 'exts-examples' )
const extsOutputDir = joinPath( confDir, 'dist' )

export const paths = {
	workspaceDir,
	workspacePkg,
	packagesDir,
	documentationDir,
	todoDir,
	devDir,
	coreDir,
	corePkg,
	beppDir,
	beppPkg,
	confDir,
	confPkg,
	appDir,
	appPkg,
	apiDir,
	apiPkg,
	docsDir,
	docsPkg,
	extsDir,
	extsOutputDir,
}
