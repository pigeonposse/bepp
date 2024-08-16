<script lang="ts">

	import './main.css'
	import { Seo, Popover, faInfo, Btn } from "$lib"
	import type { ComponentProps } from "svelte";

	export let seo: ComponentProps<Seo> | undefined = undefined
	export let title: string | undefined = undefined
	export let logo: string | undefined = undefined

</script>

{#if seo}
	<Seo 
		pageTitle={"Bepp App"}
		titleType={'left'}
		{...seo}
	/>
{/if}

<main class="content" >
{#if title || $$slots.info}

	<section class="section__header">
		{#if title }
			<div class="flex flex-row items-center gap-4">
				{#if logo }
					<img 
						src={logo}
						alt="section logo"
						class="opacity-70"
						width="40px"
						height="40px"
						loading="lazy"
					/>
				{/if}
				<h1>{title}</h1>
			</div>
		{/if}
		{#if $$slots.info }
		
			<Btn 
				type="dark" 
				icon={faInfo} 
				disabled={true}
				class="text-xs py-1 px-2 !cursor-help"
			/>
			<Popover placement="left-start">
				<slot name="info"/>
			</Popover>
		{/if}
	</section>

{/if}

<section class="section__content">
	<slot />
</section>

</main>
