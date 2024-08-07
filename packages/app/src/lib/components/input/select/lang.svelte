<script lang="ts">

    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import type { Readable, Writable } from 'svelte/store';
	import { Select } from '$lib/components';

    export let t
    export let locales: Readable<string[]>
    export let locale: Writable<String>

    export let placeholder = ""
    
    const onChange = ({target}: Event ) => {
        if( target && 'value' in target && typeof target.value === 'string') {
            goto(`/${target.value}${route}`)
			locale.set(target.value)
		}
    }
    
    $: ({ route } = $page.data)

</script>

<select 
    {placeholder}
    on:change={onChange}
	class="bg-transparent border-0 py-0 text-[14px] mt-[-2px] pl-0"
    style="box-shadow:none !important"
>
    {#each $locales as lc}
        <option 
            value="{lc}"
            selected="{lc === $locale}"
        >   {$t(`lang.${lc}`)}
        </option>
    {/each}
</select>

<!-- <Select 
	{placeholder}
	items={$locales.map(lc => {
		return {
			name:$t(`lang.${lc}`),
			value:lc,
            selected:lc === $locale
		}
	})}
	bind:value={$locale}
></Select> -->
