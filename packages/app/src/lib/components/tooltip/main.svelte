<script lang="ts">

    import './style.css'
	import type { ComponentProps } from 'svelte';
    import { Tooltip } from 'flowbite-svelte'
	import { BadgeKey } from '$lib';
    
    export let title: string 
	export let badge: ComponentProps<BadgeKey> | undefined = undefined

</script>
  
<Tooltip defaultClass="tooltip" {...$$restProps}>
	{title}
	{#if badge}
		<BadgeKey {...badge} />
	{/if}
</Tooltip>
