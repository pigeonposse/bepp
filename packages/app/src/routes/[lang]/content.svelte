<script lang="ts">

	import { Icon, Btn, Badge, faClose, dragAndDropSVG, LoadingSpinner} from "$lib"

	import type { LayoutData } from "../$types";

	export let data: LayoutData

	const { t } = data
	const {getting, extension: ext} = data.core.api.extension

	// $: console.log({getExtension: $ext})

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

{#if $getting.loading }
	<LoadingSpinner/>
{:else if $ext }

	<Btn
		type={'dark'}
		icon={faClose}
		on:click={(e) => {
			e.stopPropagation()
			ext.reset()
		}}
		class="!absolute top-2 right-2"
		tooltip={{
			title:$t('home.content.remove'), 
			placement: 'left'
		}}
	/>
	<h3 class="font-extrabold text-xl md:text-4xl text-center">{$ext.title}</h3>
	<img 
		src={$ext.iconURL || '/logo.png'} 
		alt="img" 
		width="40%" 
		class="rounded-xl bg-primary-700/20 backdrop-blur-2xl p-2"
	>
	<div class="flex flex-row gap-2">
		{#if $ext.from === 'url'}
			<Badge 
				btn={{
					href: $ext.data.url
				}}
			> {$t('home.content.from')}: {capitalizeFirstLetter($ext.data.store)} {$t('home.content.store')}</Badge>	
		{:else if $ext.from === 'local'}
			<Badge
				btn={{
					href: $ext.data.path
				}}
			> {$t('home.content.from')}: {$t('home.content.system')}</Badge>	
		{/if}
		<Badge>{$ext.type}</Badge>		
		<Badge> {$t('home.content.manifest')} {$ext.manifestVersion}</Badge>
	</div>

{:else}
	<div class="flex flex-col items-center h-full justify-center [&_path]:fill-primary-400/20 text-primary-400/20">
		<Icon svg={dragAndDropSVG} class=" !w-20 !h-20"/>
		<span class="items-center flex">{$t('home.local.dropzoneDesc')}</span>
	</div>
{/if}
