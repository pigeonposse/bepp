<script lang="ts" >

    import './layout.css'

    import {
	  faBook,
	  faHeart,
	  faGear,
	  Header,
	  faInfo,
	  Confetti,
	  LoadingLogo
	} from "$lib"

	export let data
	
	const {t, shortcuts, core} = data
	const {mainPkg, pkg, window, api} = core
	const {conversion} = api.extension
	const {list: routes, currRouteID } = window.routes

	data.core.initInBrowser()

</script>
<div class="fixed inset-0 blur-[200px] opacity-40">

	<LoadingLogo
		stopped={!$conversion.loading}
		src="/logo.png" 
		width={'100%'}
		height={'100%'}
	/>
	
</div>

<div class="fixed inset-0 blur-[10px] flex flex-col items-center justify-center">
	<Confetti type="bg"/>
</div>
<div 
    class="page" 
>

	<Header 
		version={pkg.version}
		currRouteID={$currRouteID}
		btns={[
			{
				id: $routes.info.id,
				goto: $routes.info.path,
				title: $t('common.info'),
				icon: faInfo,
				keys: shortcuts.info
			},
			{
				id: $routes.settings.id,
				goto: $routes.settings.path,
				title: $t('common.settings'),
				icon: faGear,
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
				icon: faBook,
			},
			{
				id: 'funding',
				href: mainPkg.funding.url,
				title: $t('common.donate'),
				icon: faHeart,
				class: "[&_svg]:hover:animate-pulse"
			},
		]}
	/>

	<slot />

</div>
