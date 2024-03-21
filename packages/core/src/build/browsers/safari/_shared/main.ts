
import { BuildBrowserSharedCore } from "../../_shared/main";
import { BuildBrowserProps } from "../../_shared/types";
import { BuildDmgParams, DmgOptions, AppType, appTypes, BuildSafariMacosParams, BuildSafariIosParams } from "./types"
// @ts-ignore
import bgURL from '@assets/dmg-bg-c.png?url'

export class BuildSafariSharedCore extends BuildBrowserSharedCore {

    defaultSafariParams = {
        appId: `com.${this.id}.{{id}}`,
        appTitle: '{{id}} (Safari extension)',
        dmgIcon: undefined,
        dmgNoReadme: undefined,
        dmgReadmeFilename: 'README.md',
        dmgReadmePath: undefined,
		onlyXcodeProject: false
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

- [More info](http://pigeonposse.com/posts/how-to-open-unsigned-safari-extensions)
- [More Apple info](https://developer.apple.com/documentation/safariservices/safari_app_extensions/building_a_safari_app_extension#2957925)`

    }
    
	protected async command_createDMG(scriptPath: string, options: DmgOptions){
		// @ts-ignore
		const CREATE_DMG_SCRIPT = scriptPath
		const {
			DMG_OUTPUT_PATH,
			TITLE,
			ICON,
			APP_SOURCE,
			README_PATH,
			README_FILE_NAME,
			BG_IMG_PATH
		} = options;
	
		let command;
		if (README_PATH) {
			command = `bash ${CREATE_DMG_SCRIPT} \
				--volname "${TITLE}" \
				--volicon "${ICON}" \
				--background "${BG_IMG_PATH}" \
				--window-size 660 400 \
				--icon-size 80 \
				--text-size 12 \
				--add-file "${README_FILE_NAME}" "${README_PATH}" 330 120 \
				--app-drop-link 448 240 \
				--icon "${TITLE}.app" 192 240 \
				--hide-extension "${TITLE}.app" \
				"${DMG_OUTPUT_PATH}" \
				"${APP_SOURCE}"`;
		} else {
			command = `bash ${CREATE_DMG_SCRIPT} \
				--volname "${TITLE}" \
				--volicon "${ICON}" \
				--background "${BG_IMG_PATH}" \
				--window-size 660 400 \
				--icon-size 80 \
				--text-size 12 \
				--app-drop-link 448 200 \
				--icon "${TITLE}.app" 192 200 \
				--hide-extension "${TITLE}.app" \
				"${DMG_OUTPUT_PATH}" \
				"${APP_SOURCE}"`;
		}
        return command

	}
    protected getSafariParams(props: BuildBrowserProps, values: BuildDmgParams ){
        const params = {
            ...values,
            appId: values.appId || this.defaultSafariParams.appId,
            appTitle: values.appTitle || this.defaultSafariParams.appTitle,
            dmgIcon: values.dmgIcon || this.defaultSafariParams.dmgIcon,
            dmgNoReadme: values.dmgNoReadme || this.defaultSafariParams.dmgNoReadme,
            dmgReadmeFilename: values.dmgReadmeFilename || this.defaultSafariParams.dmgReadmeFilename,
            dmgReadmePath: values.dmgReadmePath || this.defaultSafariParams.dmgReadmePath,
			onlyXcodeProject: values.onlyXcodeProject || this.defaultSafariParams.onlyXcodeProject,
        }
        const placeholderProps = { 
            id: params.id,
            browser: props.name,
            version: params.manifestProps.version || ''
        }
        params.appTitle = this.type.string.replacePlaceholders( params.appTitle, placeholderProps)
        params.appTitle = this.type.string.replacePlaceholders( params.appTitle, placeholderProps)
        return params
    }

	protected async buildDmg(props: BuildBrowserProps, params: BuildDmgParams, type: AppType){
        
        const SAFARI_TEMP_PATH  = this.fs.join( params.output, '__temp-'+props.name+'-'+type)

        try{

            params = this.getSafariParams(props,params)
            
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

            if ( type !== appTypes.ios && type !== appTypes.macos ) throw Error( 'Type incorrect. Must be "iOS" or "macOS".' )
        
            await this.fs.removeDirIfExist(SAFARI_TEMP_PATH)

            const PRODUCT_NAME                  = params.appTitle as string
            const CHROME_PATH                   = params.input
            const APP_ID                        = params.appId
			const SAFARI_XCODEPROJECT_DIR_PATH  = this.fs.join( SAFARI_TEMP_PATH, PRODUCT_NAME)
            const SAFARI_XCODEPROJECT_PATH      = this.fs.join( SAFARI_XCODEPROJECT_DIR_PATH, `${PRODUCT_NAME}.xcodeproj`)
            const SAFARI_APP_BUILD_PATH         = this.fs.join( SAFARI_TEMP_PATH, `app-${type}`)
            const SAFARI_APP_BUILD_RELEASE_PATH = this.fs.join( SAFARI_APP_BUILD_PATH, 'Build','Products','Release',`${PRODUCT_NAME}.app`)
            const SAFARI_APP_ICNS_PATH          = params.dmgIcon ? params.dmgIcon : this.fs.join(SAFARI_APP_BUILD_RELEASE_PATH,'Contents','Resources','AppIcon.icns')

			const typeFlag = type === appTypes.macos ? '--macos-only' : '--ios-only'
            params.log.changeText( '🚀 Converting chrome to safari extension' )
            
            const cmdConvertExt =`xcrun safari-web-extension-converter ${CHROME_PATH} \
			    ${typeFlag} \
                --project-location "${SAFARI_TEMP_PATH}" \
                --app-name "${PRODUCT_NAME}" \
                --bundle-identifier ${APP_ID} \
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
	
			if(!params.onlyXcodeProject){
				params.log.changeText( '🚀 Building safari app' )
				
				let cmdBuildApp = `xcodebuild -project "${SAFARI_XCODEPROJECT_PATH}" \
				-scheme "${PRODUCT_NAME}" \
				-configuration Release \
				-derivedDataPath "${SAFARI_APP_BUILD_PATH}"`
				
				// if(type !== appTypes.macos ) cmdBuildApp += '\n -sdk iphoneos'

				params.log.verbose({
					title: 'Building safari app',
					value: cmdBuildApp
				})

				await this.childProcess.execute( {
					cmd:cmdBuildApp,
					...logFuncts
				})
			}

			let SAFARI_OOTPUT: string
			
			if(type === appTypes.macos && !params.onlyXcodeProject) {

				// Create DMG
				params.log.changeText( '🚀 Creating DMG' )
				const SAFARI_DMG_OUTPUT             = this.fs.join(SAFARI_TEMP_PATH, `${params.filename}.dmg`)
				const BG_IMG_PATH = this.fs.join( SAFARI_TEMP_PATH, 'bg.png' )
				await this.fs.createImageFromBase64(bgURL, BG_IMG_PATH)
				
				const DMG_CMD_PARAMS: DmgOptions = {
					DMG_OUTPUT_PATH: SAFARI_DMG_OUTPUT,
					TITLE: PRODUCT_NAME,
					ICON: this.fs.getAbsolutePath(SAFARI_APP_ICNS_PATH),
					APP_SOURCE: this.fs.getAbsolutePath(SAFARI_APP_BUILD_RELEASE_PATH),
					README_PATH: undefined,
					README_FILE_NAME: params.dmgReadmeFilename,
					BG_IMG_PATH,
				}

				if(!params.dmgNoReadme){
					
					const README_DEFAULT_PATH = this.fs.join( SAFARI_TEMP_PATH, 'safari-unsigned-info.md' )
					if(!params.dmgReadmePath) await this.fs.writeFile( README_DEFAULT_PATH, this.requirementFileData( params.id ) )

					const README_PATH               = params.dmgReadmePath || README_DEFAULT_PATH
					const README_ABSOLUTE_PATH      = this.fs.getAbsolutePath( README_PATH )

					DMG_CMD_PARAMS.README_PATH = README_ABSOLUTE_PATH
	
				}
				const DMG_SCRIPT = {
					path: this.fs.join( SAFARI_TEMP_PATH, 'create-dmg.sh' ),
					// @ts-ignore
					content: DMG_SCRIPT_CONTENT
				}
				
				await this.fs.writeFile( DMG_SCRIPT.path, DMG_SCRIPT.content )
				const DMG_CMD = await this.command_createDMG(DMG_SCRIPT.path, DMG_CMD_PARAMS)

				params.log.verbose({
					title: 'DMG params',
					value: DMG_CMD_PARAMS
				})
			
				await this.childProcess.execute( {
					cmd: DMG_CMD,
					...logFuncts
				})
				SAFARI_OOTPUT = this.fs.getAbsolutePath(SAFARI_DMG_OUTPUT)
			}else if(type === appTypes.macos && params.onlyXcodeProject) {
				SAFARI_OOTPUT = SAFARI_XCODEPROJECT_DIR_PATH
			}else {

				SAFARI_OOTPUT = this.fs.getAbsolutePath(SAFARI_APP_BUILD_RELEASE_PATH)

			}

            params.log.changeText( '🚀 Creating compress file' )
        
            const compressParams = {
                inputPath: SAFARI_OOTPUT, 
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

	protected async buildSafariBrowserWithProps(props: BuildBrowserProps, values: BuildSafariMacosParams){

        await this.buildBrowserConstructor<BuildSafariMacosParams>({
            props: {
                inputPath: values.input, 
                values, 
                ...props
            },
            cb: async (params)=> {
                if(!this.isMacos()) throw Error('You must be on macOS to build a safari extension')
                await this.buildDmg(props, params, appTypes.macos)
            },
            onError: ({log, error}) => {
                log.failed(error)
            }
        })

	}

	protected async buildSafariIosBrowserWithProps(props: BuildBrowserProps, values: BuildSafariIosParams){

        await this.buildBrowserConstructor<BuildSafariIosParams>({
            props: {
                inputPath: values.input, 
                values, 
                ...props
            },
            cb: async (params)=> {
                if(!this.isMacos()) throw Error('You must be on macOS to build a safari extension')
                await this.buildDmg(props, params, appTypes.ios)
            },
            onError: ({log, error}) => {
                log.failed(error)
            }
        })

	}
}

