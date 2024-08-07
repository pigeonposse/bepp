<script lang="ts">

    import { Popover } from 'flowbite-svelte'
    import { blur } from 'svelte/transition'
    import './style.css'
    
    /**
     * VARIABLES
     */
    export let id: string | undefined= undefined
    export let content: string | undefined= undefined

</script>

<Popover  
    {...(id ? {triggeredBy: '#'+id} : {})}
    transition={blur} 
    params={{duration: 500}}
    {...$$restProps}
    class={`popover ${$$restProps.class || ''}`}
>
	{#if content}
		{@html content}
	{/if}
    <slot/>
</Popover>
