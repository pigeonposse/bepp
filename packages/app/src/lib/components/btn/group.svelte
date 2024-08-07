<script lang="ts" generics="IDS extends string = string">

	import type { ComponentProps } from "svelte";
	import Btn from "./main.svelte";
		
	export let btns: ( {id: IDS } & ComponentProps<Btn>)[] = []
	export let radio: boolean = false
	export let value: { [key: string]: boolean } = {};

	function handleClick(id: string) {
		if (radio) {
			for (const key in value) {
				value[key] = key === id;
			}
		} else 
			value[id] = !value[id];
		
	}

	$: {
		btns.forEach((btn) => {
			if(btn.disabled) value[btn.id] = false
			if (!(btn.id in value)) value[btn.id] = false
		});
	}

</script>

{#each btns as btn}

	<Btn 
		{...btn}
		type={value[btn.id] ? 'primary' : 'dark'}
		on:click={() => handleClick(btn.id)}
		bind:active={value[btn.id]}
	/>	

{/each}
