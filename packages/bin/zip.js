const fs       = require( 'fs' )
const archiver = require( 'archiver' )
const path     = require( 'path' )

// Function to filter out invisible files
// eslint-disable-next-line no-useless-escape
const filter = file => !( /(^|\/)\.[^\/\.]/g ).test( file )

// Read directory and output directory path from command line arguments
const sourceDirectory = process.argv[2]
const outputDirectory = process.argv[3]

console.log( {
	name : 'Zip binary',
	data : {
		input  : sourceDirectory,
		output : outputDirectory,
	},
} )

// Check if directory paths are provided
if ( !sourceDirectory || !outputDirectory ) {

	console.error( 'Please provide both source directory and output directory paths as arguments.' )
	process.exit( 1 )

}

// Ensure that the output directory exists or create it if it doesn't
if ( !fs.existsSync( outputDirectory ) ) {

	fs.mkdirSync( outputDirectory, {
		recursive : true, 
	} )

}

// Read the source directory
fs.readdir( sourceDirectory, ( err, files ) => {

	if ( err ) {

		console.error( 'Error reading source directory:', err )
		return
	
	}

	// Filter out invisible files
	const visibleFiles = files.filter( filter )

	// Create a ZIP file for each visible file
	visibleFiles.forEach( file => {

		const sourceFilePath = path.join( sourceDirectory, file )

		// Create a ZIP file
		const zipName = `${file}.zip`
		const output  = fs.createWriteStream( path.join( outputDirectory, zipName ) )
		const archive = archiver( 'zip', {
			zlib : {
				level : 9,
			}, // Maximum compression level
		} )

		output.on( 'close', () => {

			console.log( `${zipName} created successfully` )
		
		} )

		archive.on( 'error', err => {

			console.error( `Error creating ${zipName}:`, err )
		
		} )

		// Add the file to the ZIP file
		archive.pipe( output )
		archive.file( sourceFilePath, {
			name : file, 
		} )

		// Finalize the ZIP file
		archive.finalize()
	
	} )

} )
