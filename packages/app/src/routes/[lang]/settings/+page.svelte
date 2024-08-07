<script lang="ts" >

    import {
		SelectLanguage, Option, Section
    } from "$lib";

	export let data
	const {t, locales, locale, core} = data
	const {system} = core
	
	let autostartValue:boolean
	let autoSupported:boolean = false

	async function autoIsSupported() {
		autoSupported = await system.autostartApp.isSupported()
	}

	async function changeAutostart(v:boolean){
		if(!autoSupported) return
		if(v)
			await system.autostartApp.enable()
		else 
			await system.autostartApp.disable()
	}

	autoIsSupported()
	// $: console.log({autoSupported, autostartValue, $locale, $locales})
	$: changeAutostart(autostartValue)

</script>


<Section 
	seo={{
		title: $t('common.settings'),
		description: $t('common.desc'),
	}}
	title={$t('common.settings')}
>
	<Option 
		title={$t('settings.lang.title')}
		config={false}
	>	
		<SelectLanguage {t} {locales} {locale} slot="value"/>
	</Option>

	{#if autoSupported}
		<Option 
			title={$t('settings.autostart.title')}
			config={false}
			bind:value={autostartValue}
		>
		<div slot="desc">
			{$t('settings.autostart.desc')}
			
		</div>
		</Option>		
	{/if}

</Section>
