<script lang="ts">

	import { operaGxSVG, BtnGroup, yandexSVG, faSafari, faChrome, faBrave, faEdge, faOpera, faFirefoxBrowser} from "$lib"
	import type { ComponentProps } from "svelte";
	import type { LayoutData } from "../$types";
	import type { ExtsGetResponse } from "@bepp/api";
	
	export let data: LayoutData
  
	const {  platform, core } = data
	const { system, api} = core
	const {extension} = api
	
	// export let extension: LayoutData['core']['api']['extension']
	
	// export let browserDisabled: keyof ExtsGetResponse['browsersAllowed'] | undefined = undefined
	// export let type: ExtsGetResponse['type']
	// export let manifestVersion: ExtsGetResponse['manifestVersion']
	export let value: ComponentProps<BtnGroup>['value'] = {}
		
	type Btns = ComponentProps<BtnGroup<keyof ExtsGetResponse['browsersAllowed']>>['btns']

	const checkBtns = (extension: ExtsGetResponse | undefined) => {
		const manSuffix = extension?.manifestVersion !== 2 ?
				'' :
				'-mv2'
	
		let res: Btns = []
		if(platform === system.platform.MACOS){
			res.push({
				id: 'safari',
				icon: faSafari,
				tooltip: {title: 'Safari'},
				disabled: extension?.type !== 'chromium' || extension?.manifestVersion !== 3,
			})
		}
		res = [
			...res,
			{
				id: `chrome${manSuffix}` as const,
				icon: faChrome,
				tooltip: {title: 'Chrome'},
				disabled: extension?.type !== 'chromium' || (extension?.browsersAllowed.chrome === false &&  extension?.browsersAllowed["chrome-mv2"] === false),
			},
			{
				id: `edge${manSuffix}`,
				icon: faEdge,
				tooltip: {title: 'Edge'},
				disabled: extension?.type !== 'chromium' || (extension?.browsersAllowed.edge === false &&  extension?.browsersAllowed["edge-mv2"] === false),
			},
			{ 
				id: 'brave',
				icon: faBrave,
				tooltip: {title: 'Brave'},
				disabled: extension?.type !== 'chromium' || extension?.browsersAllowed.brave === false,
			},
			{
				id: 'opera-gx',
				icon: operaGxSVG,
				tooltip: {title: 'Opera GX'},
				disabled: extension?.type !== 'chromium' || extension?.browsersAllowed["opera-gx"] === false,
				class:'[&_svg]:stroke-primary-100 [&_svg]:scale-125 opacity-90'
			},
			{ 
				id: 'opera',
				icon: faOpera,
				tooltip: {title: 'Opera'},
				disabled: extension?.type !== 'chromium' || extension?.browsersAllowed.opera === false || extension?.manifestVersion !== 2,
			},
			{
				id: `yandex${manSuffix}`,
				icon: yandexSVG,
				tooltip: {title: 'Yandex'},
				disabled: extension?.type !== 'chromium' || (extension?.browsersAllowed.yandex === false &&  extension?.browsersAllowed["yandex-mv2"] === false),
			},
			{
				id: `firefox${manSuffix}`,
				icon: faFirefoxBrowser,
				tooltip: {title: 'Firefox'},
				disabled: extension?.type !== 'firefox' || (extension?.browsersAllowed.firefox === false &&  extension?.browsersAllowed["firefox-mv2"] === false),
			},
		] 

		return res 
	}
	const {extension: ext} = extension
</script>


<div class="flex justify-between [&>button]:w-full gap-2 max-[450px]:overflow-x-scroll scrollbar_hide">
	<BtnGroup
		bind:value={value}
		btns={ checkBtns( $ext )}
	/>

</div>
