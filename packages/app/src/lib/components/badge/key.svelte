<script lang="ts">

	import Badge from "./main.svelte";
	import { commandSVG, optionSVG } from "../icons/main";
	import './key.css'

	export let keys: string[]

</script>
<Badge {...$$restProps}>
	<div class="badge__command">
		{#each keys as key}
		<span class="badge__command__key">
			{#if key === 'cmd' || key === 'command'}
				{@html commandSVG}
			{:else if key === 'opt' || key === 'option'}
				{@html optionSVG}
			{:else}
				{key.toUpperCase()}
			{/if}
		</span>
	{/each}
	</div>
</Badge>
