<script lang="ts">
	
	import { Popup, Accordion, Btn, faStop, faPuzzlePiece, faChevronLeft, LoadingLogo } from "$lib";
	import Curiosities from "./curiosities.svelte"
	import type { LayoutData } from "../$types";
	import { afterUpdate, onDestroy } from 'svelte';
	export let data: LayoutData

	const {t, core} = data
	const {extension} = core.api
	const { conversion} = extension

	let logContainer: HTMLDivElement;
	let open:boolean = false

	afterUpdate(() => {
		if (logContainer) {
			logContainer.scrollTop = logContainer.scrollHeight;
		}
	});

	onDestroy(() => {
		extension.abortConvert()
	})

	function parseJSON(str: unknown): string {
		if(!str || typeof str !== 'string') return ''
		
		try {
			const parsed = JSON.parse(str);

			if( typeof parsed === 'object' && parsed !== null && 'data' in parsed ) return parsed.data
			else return str;
		} catch (error) {
			return str
		}
	}

	$: if( $conversion.loading) open = true

</script>

<Popup
	bind:open 
	closable={false}
>

<div class="flex flex-col items-center justify-center w-full h-full gap-4 py-4">
	<div class="flex flex-col w-full h-full gap-2 overflow-scroll">
		<div class="flex flex-col h-full w-full items-center justify-center gap-10 relative p-2">
			<LoadingLogo 
				width={'200px'}
				height={'200px'}
				stopped={!$conversion.loading}
				confetti={!$conversion.loading && $conversion.success}
			/>
			<h2 class="{$conversion.loading ? 'animate-gradient' : ''} font-extrabold text-4xl bg-gradient-to-r from-primary-600 to-secondary-500 inline-block text-transparent bg-clip-text">
				{#if $conversion.loading }
					{$t('home.convert.loading')}
				{:else if $conversion.success}
					{$t('home.convert.success')}
				{:else}
					{$t('home.convert.failed')}
				{/if}
			</h2>
		</div>
		<Accordion 
			type={'section'}
		>
			<Accordion 
				title={$t('home.convert.curiosities')}
				open={true}
				>
				<div class="mx-4 my-1 p-3 rounded-lg bg-primary-900/50 text-primary-200/50 max-h-20 overflow-y-scroll relative">
					<Curiosities 
						{data} 
					/>
				</div>
			</Accordion>
			<Accordion 
				title={$t('home.convert.log')}
			>
				<div 
					class="mx-4 my-1 p-3 rounded-lg bg-primary-900/50 text-primary-200/50 max-h-40 overflow-y-scroll"
					bind:this={logContainer}
				>
					{#if $conversion.log}
						{#each $conversion.log as log}
							{parseJSON(log)}
						{/each}
					{/if}
				</div>
			</Accordion>
		</Accordion>
	</div>
	<div class="flex flex-row gap-4 w-full [&_button]:w-full max-[400px]:flex-col">
		<Btn
			type="primary-soft"
			icon={$conversion.loading ? faStop : faChevronLeft}
			pulse={!$conversion.loading && !$conversion.success}
			on:click={ () => {
				if( $conversion.loading ) extension.abortConvert()
				open = false
			}}
		>
			{$conversion.loading ? $t('home.convert.btnStop') : $t('home.convert.btnBack')}
		</Btn>

		<Btn
			icon={faPuzzlePiece}
			disabled={$conversion.loading}
			pulse={!$conversion.loading && $conversion.success}
			on:click={ async () => {
				await extension.openOutputPath()
			}}
		>
			{$t('home.convert.btnView')}
		</Btn>
	</div>
</div>

</Popup>
