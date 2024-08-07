<script lang="ts">

    import { Accordion, AccordionItem } from 'flowbite-svelte'
    import type { IconDefinition } from '../icons/main';
    import Icon from "$lib/components/icons/main.svelte"

    import './style.css'

    /**
     * VARIABLES
     */
    export let title: string | undefined = undefined;
    export let icon: IconDefinition | undefined = undefined;
    export let type: "section" | "item" = "item"
    export let open: boolean = false;

</script>

{#if type === "item"}

    <AccordionItem 
        bind:open={open} 
        borderClass="border-none"
        borderBottomClass="border-none" 
        {...$$restProps}
        class="{open ? '!text-primary-300/70' : '!text-primary-400/70'} p-4 pt-3 font-bold text-md {$$restProps.class || ''}"
    >

        <span slot="header" class="relative flex gap-2 items-center"> 
            {#if icon}
                <Icon svg={icon} class=""/>
            {/if}
            {#if title}
                {title}
            {/if}

        </span>

        <slot/>

    </AccordionItem>

{:else if type === "section" }

    <Accordion 
        flush  
        {...$$restProps}
        class="w-full bg-primary-900/10 backdrop-blur-xl rounded-xl {$$restProps.class || ''}"
    >

        <slot/>
    
    </Accordion>

{/if}
