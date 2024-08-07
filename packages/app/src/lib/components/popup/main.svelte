<script lang="ts">

	import Button from "$lib/components/btn/main.svelte"
    import { faClose } from '$lib/components/icons/main';
	import './main.css'

	export let open: boolean = false
    export let type: 'full' | 'content' = 'content'
	export let closable = true
</script>
{#if open}

<div 
	{...$$restProps}
	class="popup popup__type__{type} transition_general {closable ? 'closable' : ''} {open ? 'open' : 'hidden' } {$$restProps.class || ''}"
>

	{#if closable}
		<Button 
			type="transparent"
			icon={faClose}
			on:click={() => {open = false}}
			class="popup__close"
		/>
	{/if}

    <div class="popup__container">

        {#if "header" in $$slots}
            <div>
                <slot name="header" />
            </div>
        {/if}

        <slot/>

        {#if "footer" in $$slots}
            <div>
                <slot name="footer" />
            </div>
        {/if}
    </div>
    
</div>	
{/if}

