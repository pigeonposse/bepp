<script lang="ts" >

    import {
		Section,
		Btn,
		faBook,
		PostContent,
		faFileZipper,
    } from "$lib";

	export let data
	const {t, core} = data
	const {mainPkg, window} = core
	const {list: routes} = window.routes

</script>


<Section 
	seo={{
		title: $t('common.info'),
		description: $t('common.desc'),
	}}
	title={$t('common.info')}
>
<PostContent>
	<h2>{$t('info.subtitle')}</h2>
	<img
		src="/banner.png"
		alt="bepp banner"
		width="100%"
		height="100px"
		loading="lazy"
	/>
	<p>
		{$t('info.desc.1')}
	</p>
	<p>
		{$t('info.desc.2')}
		<br>
		{$t('info.desc.3')}
	</p>

	<div class="section">
		<Btn 
			id={$routes.home.id}
			goto={ $routes.home.path}
			icon={faFileZipper}
		>{$t('common.convert')}</Btn>
		<Btn 
			id={$routes.home.id}
			href={ mainPkg.extra.docsUrl}
			icon={faBook}
			type={'primary-soft'}
		>{$t('common.documentation')}</Btn>
	</div>
</PostContent>

</Section>
