import {
	joinPath, getArch, exec,
	zipFilesInDirectory
} from './core.mjs'
import { target } from './const.mjs'
import { exec as execPkg }   from '@yao-pkg/pkg'
import esbuild from 'esbuild';

/**
 * Creates binaries for different platforms based on the architecture.
 * 
 * This function performs the following steps:
 * 1. Determines the architecture of the system.
 * 2. Builds the project using `esbuild`.
 * 3. Transpiles the build using `ncc`.
 * 4. Packages the transpiled output using `pkg`.
 * 5. Zips the final binaries.
 * 
 * @param {Object} params - The parameters for creating the binaries.
 * @param {string} params.binName - The name of the binary file to be created.
 * @param {string} params.projectDir - The root directory of the project.
 * @param {string} params.inputFile - The input file for the build process.
 * @param {'all'|'cjs'|'bin'} params.build - The build Result [all|cjs|bin]
 * @returns {Promise<void>} - A promise that resolves when the binary creation process is complete.
 */
export const createBins = async ({ binName, projectDir, inputFile, build = 'all'}) => {
	const start = performance.now()
	const stop = () => console.log(`\n[createBins] Total time: ${((performance.now() - start) / 1000).toFixed(2)} seconds.`)
	const arch = await getArch()

	const projectBuild = joinPath( projectDir, 'build' )
	const projectBuildBin = joinPath( projectBuild,'bin' )
	const projectBuildZip = joinPath( projectBuild,'zip' )
	const projectBuildCjs = joinPath( projectBuild,'cjs' )
	const projectBuildCjsFile = joinPath( projectBuildCjs,'node.cjs' )

	/**
     * Generates the target platforms based on the architecture.
     * 
     * @param {string} arch - The architecture ('arm64' or 'x64').
     * @returns {string[]} - An array of target platform strings.
     */
	const getTargets = arch => ( [
		`${target}-alpine-${arch}`,
		`${target}-linux-${arch}`,
		`${target}-linuxstatic-${arch}`,
		`${target}-macos-${arch}`,
		`${target}-win-${arch}`,
	] )
	
	const targets = arch === 'arm64' ? 
		[
			...getTargets( 'arm64' ),
			...getTargets( 'x64' ),
		] : 
		getTargets( 'x64' )

	// ESBUILD
	await esbuild.build({
        entryPoints: [inputFile],
        bundle: true,
        format: 'cjs',
        platform: 'node',
		target,
        outfile: projectBuildCjsFile,
    }).catch((err) => {
        console.error('Error during esbuild:', err);
        process.exit(1);
    })

	// NCC
	const nccCommand = `ncc build ${projectBuildCjsFile} -o ${projectBuildCjs} -m -C`;
	await exec(nccCommand)

	if (build === 'cjs') {
        stop();
        return
    }

	// PKG
	await execPkg( [
		joinPath( projectBuildCjs,'index.cjs' ),
		'--targets', targets.join( ',' ),
		'--output', joinPath( projectBuildBin, binName ),
		'--compress', 'GZip', 
		// '--debug',
	] )
	
    if (build === 'bin') {
        stop();
        return
    }

	// ZIP
	await zipFilesInDirectory(
		projectBuildBin,
		projectBuildZip,
	)

	stop()
	
}
