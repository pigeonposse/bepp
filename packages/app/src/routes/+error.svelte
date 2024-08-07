<script lang="ts">
    
    import { page } from '$app/stores'
    import { Btn, Seo, faBug, faHome, Section } from '$lib';


	export let data

    const { status, error } = $page
	const { t, core } = data
	const { window, mainPkg } = core
	const {list: routes} = window.routes
	// console.log({id: 'errorPage', error})
</script>

<Seo
    title={$t('common.description.message')}
    description="{$t('common.error.title')} {$t('common.description.message')}"
    titleType="left"
/>

<Section 
	seo={{
		title: $t('common.description.message'),
		description: `${$t('common.error.title')}} ${$t('common.description.message')}`,
	}}
>
<div class="flex flex-col h-full items-center justify-center">

<section class="text-center">
	<h1 class="font-bold text-2xl sm:text-3xl md:text-5xl text-primary-500">{$t('error.title')}</h1>
	<p class="font-bold text-2xl sm:text-3xl md:text-5xl text-primary-100">{$t(`error.${status}`, { default: $t('error.default') })}</p>	
</section>

{#if error && 'message' in error}
	<p>{$t('error.reference')}: <span class="opacity-80 italic">{error.message}</span></p>
{/if}

<img 
	src="/error.gif"
	class="object-cover h-[150px] w-[150px] rounded-full mt-4 opacity-70 mb-10" 
	alt="Error gif" 
	width="150px"
	height="150px"
/>
<section class="flex flex-row gap-4">
	<Btn 
		goto={$routes.home.path}
		icon={faHome}
	>
		{$t('common.goHome')}
	</Btn>
	<Btn 
		type="primary-soft"
		href={mainPkg.bugs.url}
		icon={faBug}
	>
		{$t('common.issues')}
	</Btn>
</section>
</div>
</Section>


