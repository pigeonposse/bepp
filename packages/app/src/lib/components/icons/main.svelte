<script lang="ts">

    import { Fa, type IconDefinition } from '$lib/components/icons/main'
    export let svg: IconDefinition | string 

</script>

{#if typeof svg === 'string'}
    <span 
        {...$$restProps}
        class="h-[1em] w-[1em] icon{$$restProps.class ? ' '+$$restProps.class : ''}"
    >
        {@html svg}
    </span>
{:else}
    <Fa 
        icon={svg} 
        {...$$restProps}
        class="icon {$$restProps.class ? ' '+$$restProps.class : ''}" 
    />
{/if}
