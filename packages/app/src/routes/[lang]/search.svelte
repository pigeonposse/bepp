<script lang="ts">
	
	import { Btn, InputSearch, Popup,Badge, Icon, faPuzzlePiece,faGlobe, LoadingSpinner } from "$lib/components";
	import type { LayoutData } from "../$types";
 
	export let data: LayoutData
	export let open:boolean = false
	export let closeOnSelect = true
	export let selected: SelectedValue | undefined = undefined

	type NonUndefined<T> = T extends undefined ? never : T
	type SelectedArray = Awaited<ReturnType< typeof extension.search>>
	type SelectedValue = NonUndefined<SelectedArray>[number]

	const { t } = data;
	const {extension} = data.core.api
	
	let searchValue:string
	let searchResults: SelectedArray = undefined;
	let isSearching = false

	async function searchExtensions(value: string) {
		isSearching = true
		const res = await extension.search({
			value
		})
		searchResults =res
		isSearching = false
	}
	async function selectResult(result: SelectedValue ) {
		selected = result
		if(closeOnSelect) open = false
	}

	// $: console.log({searchExtension:selected})

</script>
<Popup bind:open>
<div class="flex flex-col gap-4 overflow-hidden h-full">

	<InputSearch 
		onChange={searchExtensions} 
		placeholder={$t('home.search.placeholder')}
		bind:value={searchValue}
	/>

	{#if searchResults && searchResults.length > 0}

		<div class="flex flex-col gap-2 overflow-y-scroll">
			{#if isSearching}
				<LoadingSpinner size={4}/>
			{/if}
			{#each searchResults as result}
				{#if result !== null }
				<Btn 
					type={'none'}
					on:click={async () => await selectResult(result)}
					class="border border-primary-900/30 bg-primary-700/20 backdrop-blur-xl p-2 rounded-xl flex flex-row items-center justify-start gap-4"
				>	
					<img 
						src={'iconURL' in result ? result.iconURL : '/logo.png'} 
						alt="img" 
						width="100" 
						class="rounded-xl bg-primary-700/20 backdrop-blur-2xl p-2 max-[450px]:w-10"
					>	
					
					<div class="flex flex-col justify-between h-full w-full items-start overflow-x-scroll break-words">
					
						{#if result && 'title' in result && typeof result.title == 'string'}
							<h4 class="font-extrabold">{result.title}</h4>
						{/if}
						{#if result.id }
							<span class="font-light italic text-primary-300/20">ID: {result.id}</span>
						{/if}

						<Badge>{result.store}</Badge>		
					</div>
					<Btn
						type="none"
						icon={faGlobe}
						href={result.url}
						class="absolute top-3 right-4 opacity-50 text-primary-100 hover:opacity-90"
					/>
				</Btn> 
				{/if}
			{/each}
		</div>
		<div class="text-xs opacity-20 p-2 flex flex-col items-center">
			<span>{$t('home.search.results')}: {searchResults.length}</span>
		</div>
	{:else if isSearching}
		<LoadingSpinner/>
	{:else}
	
		<div class="flex flex-col gap-4 h-full w-full items-center justify-center text-primary-300 opacity-10 backdrop-blur-2xl">
			<Icon svg={faPuzzlePiece} class="!w-[150px] !h-[150px]"/> 

			<p class="font-bold text-xl text-center flex flex-col items-center">
				{#if searchValue !== ''}
					<span>{$t('home.search.none')}</span>
					<span class="italic text-primary-300/90 font-light">{searchValue}</span>
				{:else}
					{$t('home.search.desc')}
				{/if}
			</p>
		</div>
	{/if}
</div>
</Popup>
