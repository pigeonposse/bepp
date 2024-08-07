<script lang="ts">

	import { DropZone, Section, Btn, faUpload, faSearch, BtnKey, type DropzoneValue } from "$lib"
	import { writable } from 'svelte/store';
	import Searcher from './search.svelte'
	import Converting from "./convert.svelte";
	import type { ComponentProps } from "svelte";
	import DropzoneContent from "./content.svelte";
	import BrowserBtns from "./browsers.svelte";
	import Errors from "./errors.svelte";

	export let data
  
	const { t, core, shortcuts } = data
	const {onlineStatus, system, api} = core
	const {extension} = api
	const {getting, extension: ext} = extension

	let searcherOpened: boolean = false
	let searchedSelectedExtension = writable<ComponentProps<Searcher>['selected']>(undefined)
	let dropzoneValue: FileList
	let browserTypes = {}

	async function validateFiles(files: DropzoneValue){
		
		if(!files) return false
		const data = await extension.getFileData(files)
		if(!data) return false
		await extension.get({value: data, from: 'local'} )
		return $getting.success
		
	}

	async function getInternetExtension(ext: typeof $searchedSelectedExtension){

		if( !ext || !('id' in ext && typeof ext.id === 'string')) return undefined
		
		await extension.get({value:ext, from: 'url'} )

	}

	async function executeConversion() {
		await extension.convert()
	}

	$: getInternetExtension($searchedSelectedExtension)
	$: if( $ext && browserTypes ) ext.selectedBrowsers.change(browserTypes)
	
  </script>
  

<Section 
	title={'Bepp App'}
	seo={{
		title: $t('common.convert'),
		description: $t('common.desc'),
	}}
	logo={'/logo.png'}
>
	<div slot="info">
		<span>{$t('home.info.1')}</span>
		<br>
		<span>{$t('home.info.2')}</span>
	</div>

	<div class="flex flex-col min-[450px]:flex-row gap-4 w-full [&>button]:w-full" >
		<BtnKey 
			icon={faSearch}
			title={$t('home.search.title')}
			keys={{
				value: shortcuts.search,
				handle:async () => {searcherOpened=!searcherOpened}
			}}
			disabled={!$onlineStatus}
			{...(!$onlineStatus ? {
				popover: {
					content: $t('common.offlineMsg'),
					placement: 'bottom'
				}
			}: {})}
		/>

		{#if $onlineStatus}
			<Searcher
				bind:open={searcherOpened}
				bind:selected={$searchedSelectedExtension}
				{data}
			/>	
					
		{/if}

		<BtnKey 
			icon={faUpload}
			title={$t('home.local.title')}
			keys={{
				value: shortcuts.filesystem,
			}}
			dropzone={{
				class: "",
				input: true,
				validate: validateFiles
			}}
		/>
	</div>

	<DropZone 
		input={$ext ? false : true}
		validate={validateFiles}
		bind:value={dropzoneValue}
		class="bg-primary-900/10 w-full h-full rounded-xl p-4 flex flex-col items-center relative justify-center gap-5 transition-colors duration-300 ease-in-out hover:bg-primary-900/30 backdrop-blur-xl border-2 border-transparent hover:border-primary-500/30 overflow-auto {$ext ? 'cursor-auto': 'cursor-pointer'}"
	>

		<DropzoneContent {data} />
		
	</DropZone>
	
	<BrowserBtns
		{data} 
		bind:value={browserTypes}
	/>

	<Btn 
		type={'primary'}
		on:click={executeConversion}
		class="w-full !py-4"
		disabled={!($ext && browserTypes && Object.values(browserTypes).includes(true))}
	>
		{$t('common.convert')}
	</Btn>

	<Converting 
		{data}
	/>

	<Errors {data}/>

</Section>

