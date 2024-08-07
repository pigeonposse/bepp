<script lang="ts">

	import './style.css'
    import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import { faSearch } from '$lib/components/icons/main';
    import Icon from '$lib/components/icons/main.svelte'
	import { BadgeKey } from '$lib/components';

    export let onChange: (value: string) => Promise<void | undefined>
    export let onKeyFocus:boolean = false
	export let onFocus: boolean = true
    export let keys: string[] = ['cmd', 'k'];
    export let placeholder: string | undefined = undefined
    export let id: string | undefined = undefined
    export let value = ''
    export let urlParams: boolean = false

    let inputElement: HTMLInputElement
    let isFocused: boolean = false

    function handleKeyDown(event: KeyboardEvent) {
        if (onKeyFocus && keys.includes(event.key.toLowerCase())) {
            inputElement.focus();
        }
    }

    if (typeof window !== 'undefined') window.addEventListener('keydown', handleKeyDown);

    function handleFocus() {
        isFocused = true;
    }

    function handleBlur() {
        isFocused = false;
    }
    
    function updateUrlWithId() {
        if(!urlParams || !id) return
        const currentUrl = new URL(window.location.href)
        currentUrl.searchParams.set(id, value)
        goto(currentUrl.toString(), { replaceState: true, keepFocus: true });
    }
    
    onMount(() => {
        if(!urlParams || !id) return

        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get(id);
		
		// if(onFocusOnInit) inputElement?.focus()
		// console.log('onFocusOnMount',onFocusOnInit)
        if (tabParam ) {
            value = tabParam
            inputElement?.focus()
            if(onChange) onChange(value)
        }

    })

    onDestroy(() => {
        window?.removeEventListener('keydown', handleKeyDown)

        if(urlParams && id) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete(id);
            goto(currentUrl.toString(), { replaceState: true, keepFocus: true });
        }

    })

    $: if(onFocus) inputElement?.focus()

</script>
<div 
    {...$$restProps}
    class="search{isFocused ? ' focused' : '' }{$$restProps.class ? ' '+$$restProps.class : ''}"
>
	<Icon 
		svg={faSearch} 
		class="search__icon" 
	/>
	<input 
		type="text" 
		{placeholder}
		class="search__input"
		bind:value={value}
		bind:this={inputElement}
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:input={async (e) =>{
			if(onChange) await onChange(value)
			updateUrlWithId()
		}}
	/>

    {#if onKeyFocus}
        <BadgeKey {keys}/>
    {/if}
</div>
