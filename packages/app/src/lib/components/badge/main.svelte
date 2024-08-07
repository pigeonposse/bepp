<script lang="ts">
	import type { ComponentProps } from 'svelte';

    
    import './style.css'
	import { Tooltip, Btn } from '$lib';
    export let type: "purple" | "red" | "green" | "blue" | "yellow" | "gray" | "primary" | "secondary" = "primary"
    export let tooltip: ComponentProps<Tooltip> | undefined = undefined
	export let btn: ComponentProps<Btn> | undefined = undefined
	
</script>

{#if btn}
	<Btn
		type="none"
		{...btn}
		{...$$restProps} 
		class="badge btn {type} {$$restProps.class || ''}"
	>
		<slot/>
	</Btn>
{:else}
	<span 
		{...$$restProps} 
		class="badge {type} {$$restProps.class || ''}"
	>
		<slot/>
	</span>
{/if}

{#if tooltip}
    <Tooltip {...tooltip} />
{/if}
