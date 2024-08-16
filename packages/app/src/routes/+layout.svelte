<script lang="ts" >

    import './layout.css'
	import { onMount } from 'svelte'
	export let data

	const {t, shortcuts, core} = data
	const {mainPkg, pkg, window, api} = core
	const {conversion} = api.extension
	const {list: routes, currRouteID } = window.routes
	
	let lib: undefined | typeof import( "$lib/index.js" )
	let error = false
	let LoadingLogo:  undefined | typeof import( "$lib" ).LoadingLogo
	let Confetti:  undefined | typeof import( "$lib" ).Confetti
	let Header: undefined | typeof import( "$lib" ).Header

	onMount( async () => {

		try {
			
			lib = await import( "$lib" )
			LoadingLogo = lib.LoadingLogo
			Confetti = lib.Confetti
			Header = lib.Header

			await data.core.initInBrowser()
			await data.core.init()

		}catch(e){
			await core.log.error({
				id: core.data.logID.layoutMountError,
				data: e || 'No error displayed'
			})
			error = true
		}

	})

</script>

{#if lib}

<div class="fixed inset-0 blur-[200px] opacity-40">

	<svelte:component this={LoadingLogo} 
		stopped={!$conversion.loading}
		src="/logo.png" 
		width={'100%'}
		height={'100%'}
	/>
	
</div>

<div class="fixed inset-0 blur-[10px] flex flex-col items-center justify-center">
	<svelte:component this={Confetti}  type="bg"/>
</div>
<div 
    class="page" 
>

	<svelte:component this={Header} 
		version={pkg.version}
		currRouteID={$currRouteID}
		btns={[
			{
				id: $routes.info.id,
				goto: $routes.info.path,
				title: $t('common.info'),
				icon: lib.faInfo,
				keys: shortcuts.info
			},
			{
				id: $routes.settings.id,
				goto: $routes.settings.path,
				title: $t('common.settings'),
				icon: lib.faGear,
				keys: shortcuts.settings
			},
			{
				id: $routes.home.id,
				goto: $routes.home.path,
				title: mainPkg.extra.productName,
				imgSrc: '/logo.png',
				imgAlt: 'Logo',
				keys: shortcuts.converter
			},
			{
				id: 'docs',
				href: mainPkg.extra.docsUrl,
				title: $t('common.documentation'),
				icon: lib.faBook,
			},
			{
				id: 'funding',
				href: mainPkg.funding.url,
				title: $t('common.donate'),
				icon: lib.faHeart,
				class: "[&_svg]:hover:animate-pulse"
			},
		]}
	/>

	<slot />

</div>

{:else}
	<div class="page">
		{#if error}
			<div>Fatal error: Layout is not loaded</div>
		{:else}
			<div>Loading...</div>
		{/if}
	</div>
{/if}

