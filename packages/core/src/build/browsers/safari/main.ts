
import { browserTypes, extTypes, manVersions } from "../../../_shared/types";
import { BuildBrowserSharedCore } from "../_shared/main";
import { BuildDmgParams, BuildSafariParams, DmgType, dmgTypes } from "./types";

export class BuildSafariCore extends BuildBrowserSharedCore {
    
    props = {
        name: browserTypes.safari, 
        target: extTypes.chromium, 
        man: manVersions[3]
    }

    defaultSafariParams = {
        dmgBundleId: `com.${this.id}.{{id}}`,
        dmgTitle: '{{id}} (Safari extension)',
        dmgIcon: undefined,
        dmgNoReadme: undefined,
        dmgReadmeFilename: 'README.md',
        dmgReadmePath: undefined,
    }

    protected requirementFileData(name:string){
        return `# ${name} (Safari Extension) [Unsigned macOS version]

## 🛠️ Steps to activate the extension

1. Move app to "/Applications" folder
2. Allow Unsigned Extensions in Safari App. How:

    1. Open Safari and choose Safari > Settings.
    2. Select the Advanced tab, then select the "Show Develop menu in menu bar" checkbox.
    3. Choose Develop > Allow Unsigned Extensions, enter your password, and click OK. If you are using Safari 17 or later, click the Developer tab in Safari Settings, and select the "Allow unsigned extensions" option. The Allow Unsigned Extensions setting resets when a user quits Safari, so you need to set it again the next time you launch Safari.
    4. Choose Safari > Settings and click the Extensions tab. This tab shows the localized description, display name, and version number for the selected Safari app extension. It also provides a more nuanced message about the permissions for the extension.
    5. Find your new extension in the list on the left, and enable it by selecting its checkbox.
    6. Close Safari Settings.

[More info](https://developer.apple.com/documentation/safariservices/safari_app_extensions/building_a_safari_app_extension#2957925)`

    }
    
    protected async createDMG({source, target, onError, onLog}: {
        source: string, 
        target: string,
        onError: (error: Error) => void,
        onLog: (data: string) => void
    } ) {

		const appdmgImported = await import('appdmg')
		const appdmg = appdmgImported.default

        return new Promise((resolve, reject) => {
	
			
            // @ts-ignore
            const DMG = appdmg({
                source: source,
                target: target,
            })
    		// @ts-ignore
            DMG.on('progress', (info ) => {
                // info.current is the current step
                // info.total is the total number of steps
                // info.type is on of 'step-begin', 'step-end'

                // 'step-begin'
                // info.title is the title of the current step

                // 'step-end'
                // info.status is one of 'ok', 'skip', 'fail'
                onLog(info.title)
            })
    
            DMG.on('finish', function () {
                // Cuando se completa la creación del DMG
                // console.log('DMG creado correctamente.');
                // @ts-ignore
                resolve();
            });
    
            DMG.on('error', function (err: Error) {
                // En caso de error
                // console.error('Error creando DMG:', err)
                onError(err)
                reject(err)
            });
        });
    }

    protected getSafariParams(values: BuildDmgParams ){
        const params = {
            ...values,
            dmgBundleId: values.dmgBundleId || this.defaultSafariParams.dmgBundleId,
            dmgTitle: values.dmgTitle || this.defaultSafariParams.dmgTitle,
            dmgIcon: values.dmgIcon || this.defaultSafariParams.dmgIcon,
            dmgNoReadme: values.dmgNoReadme || this.defaultSafariParams.dmgNoReadme,
            dmgReadmeFilename: values.dmgReadmeFilename || this.defaultSafariParams.dmgReadmeFilename,
            dmgReadmePath: values.dmgReadmePath || this.defaultSafariParams.dmgReadmePath,
        }
        const placeholderProps = { 
            id: params.id,
            browser: this.props.name,
            version: params.manifestProps.version || ''
        }
        params.dmgTitle = this.type.string.replacePlaceholders( params.dmgTitle, placeholderProps)
        params.dmgBundleId = this.type.string.replacePlaceholders( params.dmgBundleId, placeholderProps)
        return params
    }

    async buildDmg(params: BuildDmgParams, type: DmgType){
        
        const SAFARI_TEMP_PATH  = this.fs.join( params.output, '__temp_safari')

        try{

            params = this.getSafariParams(params)
            
            params.log.verbose({
                title: 'Debug Safari params',
                values: params
            })

            const logFuncts = {
                onError: (error: Error) => {
                    if(error && error.message) 
                        params.verbose ? params.log.verboseError(error.message) : params.log.failed(error.message)
                },
                onLog: (data: string) => {
                    if(data)
                        params.verbose ? params.log.verbose(data) : params.log.changeText(data)
                }
            }

            if ( type !== dmgTypes.ios && type !== dmgTypes.macos ) throw Error( 'Type incorrect. Must be "iOS" or "macOS".' )
        
            await this.fs.removeDirIfExist(SAFARI_TEMP_PATH)

            const PRODUCT_NAME                  = params.dmgTitle as string
            const CHROME_PATH                   = params.input
            const BUNDLE_ID                     = params.dmgBundleId
            const APPDMG_JSON                   = this.fs.getAbsolutePath( SAFARI_TEMP_PATH, 'appdmg.json' )
            const SAFARI_XCODEPROJECT_PATH      = this.fs.join( SAFARI_TEMP_PATH, PRODUCT_NAME, `${PRODUCT_NAME}.xcodeproj`)
            const SAFARI_APP_BUILD_PATH         = this.fs.join( SAFARI_TEMP_PATH, `app-${type}`)
            const SAFARI_APP_BUILD_RELEASE_PATH = this.fs.join( SAFARI_APP_BUILD_PATH, 'Build','Products','Release',`${PRODUCT_NAME}.app`)
            const SAFARI_APP_ICNS_PATH          = params.dmgIcon ? params.dmgIcon : this.fs.join(SAFARI_APP_BUILD_RELEASE_PATH,'Contents','Resources','AppIcon.icns')
            const SAFARI_DMG_NAME               = type === dmgTypes.macos ? `${params.filename}.dmg` : `${type.toLowerCase()}-${params.filename}.dmg`
            const SAFARI_DMG_OUTPUT             = this.fs.join(SAFARI_TEMP_PATH, SAFARI_DMG_NAME)

            params.log.changeText( '🚀 Converting chrome to safari extension' )
            
            const cmdConvertExt =`xcrun safari-web-extension-converter ${CHROME_PATH} \
                --project-location "${SAFARI_TEMP_PATH}" \
                --app-name "${PRODUCT_NAME}" \
                --bundle-identifier ${BUNDLE_ID} \
				--swift \
                --force \
                --no-prompt \
                --no-open
            `
            params.log.verbose({
                title: 'Converting chrome extensiom to safari extension',
                value: cmdConvertExt
            })

            await this.childProcess.execute( {
                cmd: cmdConvertExt,
                ...logFuncts
            })
        
            params.log.changeText( '🚀 Building safari app' )
            
            const cmdBuildApp = `xcodebuild -project "${SAFARI_XCODEPROJECT_PATH}" \
            -scheme "${PRODUCT_NAME} (${type})" \
            -configuration Release \
            -derivedDataPath "${SAFARI_APP_BUILD_PATH}"`
            
            params.log.verbose({
                title: 'Building safari app',
                value: cmdBuildApp
            })

            await this.childProcess.execute( {
                cmd:cmdBuildApp,
                ...logFuncts
             })


            // Create DMG
            params.log.changeText( '🚀 Creating DMG' )
            const dmgOpts = {
                title    : PRODUCT_NAME,
                icon     : this.fs.getAbsolutePath(SAFARI_APP_ICNS_PATH),
                // "background": "test-background.png",
                contents : [
                    { 
                        'x'    : 448, 
                        'y'    : 344, 
                        'type' : 'link', 
                        'path' : '/Applications', 
                    },
                    { 
                        'x'    : 192,
                        'y'    : 344, 
                        'type' : 'file', 
                        'path' :  this.fs.getAbsolutePath(SAFARI_APP_BUILD_RELEASE_PATH),
                    },
                ],
            }

            if(!params.dmgNoReadme){
                
                const README_DEFAULT_PATH =  this.fs.join( SAFARI_TEMP_PATH, 'safari-unsigned-info.md' )
                if(!params.dmgReadmePath) await this.fs.writeFile( README_DEFAULT_PATH, this.requirementFileData( params.id ) )

                const README_PATH               = params.dmgReadmePath || README_DEFAULT_PATH
                const README_ABSOLUTE_PATH      = this.fs.getAbsolutePath( README_PATH )
                const README_FILENAME           = params.dmgReadmeFilename

                dmgOpts.contents = [...dmgOpts.contents, { 
                    'x'    : 192,
                    'y'    : 172, 
                    'type' : 'file', 
                    'path' : README_ABSOLUTE_PATH,
                    // @ts-ignore
                    'name' : README_FILENAME,
                }]
            }

            params.log.verbose({
                title: 'DMG params',
                value: dmgOpts
            })

            await this.fs.writeFile( APPDMG_JSON, JSON.stringify( dmgOpts, null, 2 ) )
        
            // await this.childProcess.execute( {
            //     cmd:`appdmg ${APPDMG_JSON} ${SAFARI_DMG_OUTPUT}`,
            //     ...logFuncts
            // })

            await this.createDMG({
                source: APPDMG_JSON,
                target: SAFARI_DMG_OUTPUT,
                ...logFuncts
            })

            params.log.changeText( '🚀 Creating compress file' )
        
            const compressParams = {
                inputPath: this.fs.getAbsolutePath(SAFARI_DMG_OUTPUT), 
                outputPath: this.fs.getAbsolutePath(params.output),
                outputName: params.filename,
                format: params.compress
            }
            params.log.verbose({
                title: 'Compress params',
                values: compressParams
            })
            await this.fs.compress(compressParams)

            const compressFile = this.fs.getCompressOutputPath(params.output, params.filename, params.compress)
            params.log.succeed(`Successful building in: ${compressFile}`)

        }catch(e){
            throw e
        }finally{
            await this.fs.removeDirIfExist(SAFARI_TEMP_PATH)
        }

    }


    async create(values: BuildSafariParams){

        await this.buildBrowserConstructor<BuildSafariParams>({
            props: {
                inputPath: values.input, 
                values, 
                ...this.props
            },
            cb: async (params)=> {
                if(!this.isMacos()) throw Error('You must be on macOS to build a safari extension')
                await this.buildDmg(params, dmgTypes.macos)
            },
            onError: ({log, error}) => {
                log.failed(error)
            }
        })

    }

}

const core = new BuildSafariCore()

export default {
    props: core.props,
	/**
	 * Build Safari extension.
	 *
	 * @returns {Promise<void>}                    
	 * @see https://bepp.pigeonposse.com/guide/build/safari
	 */
    build: core.create.bind(core),
}
