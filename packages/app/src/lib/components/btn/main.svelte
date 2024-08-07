<script lang="ts">
    
    import './main.css'
	
	// @ts-ignore
	import Mousetrap from 'mousetrap'

    import { goto as gotoFunct } from '$app/navigation';
    import { onDestroy, onMount, type ComponentProps } from 'svelte'
    import {DropZone, Icon, Popover, Tooltip} from "$lib"

    export let icon: ComponentProps<Icon> | ComponentProps<Icon>['svg'] | undefined = undefined
    export let iconPosition: 'left' | 'right' = 'left'
    export let hover = false
    export let goto: undefined | string = undefined
    export let href: undefined | string = undefined
    export let type: 'none' | 'dark' | 'transparent' | 'primary' | 'primary-soft' | 'secondary' = "primary"
    export let active: boolean = false
    export let tooltip: ComponentProps<Tooltip> | undefined = undefined
	export let popover: ComponentProps<Popover> | undefined = undefined
	export let keys: {
		value: string[]
		handle: (() => Promise<void>) | undefined
	} | undefined = undefined
	export let pulse: boolean = false
	export let dropzone: ComponentProps<DropZone> | undefined = undefined
	
	let dropzoneInput: HTMLInputElement | undefined = undefined 
    function handleMouseEnter() {
        hover = true;
    }

    function handleMouseLeave() {
        hover = false;
    }

	async function handleGoTo() {
        if(goto) gotoFunct(goto) 
        if(href) {
			if(window.__TAURI__?.shell?.open) await window.__TAURI__.shell.open(href)
			else if (href.startsWith('http')) window.open(href)
		}
	}
	async function handleDropZone() {
		if(dropzone && dropzone.input && dropzoneInput) dropzoneInput.click()
	}

	// async function handleFunctionPrivate(event: KeyboardEvent) {
		
	// 	if(!keys?.value) return 
		
	// 	Mousetrap.bind(keys.value.join('+'), async () => {
	// 		if (keys.handle) await keys.handle();
	// 		await handleDropZone();
	// 		await handleGoTo();
	// 	})

    // }

	onMount(() => {
		if(!keys?.value) return 
		Mousetrap.bind(keys.value.join('+'), async () => {
			if (keys.handle) await keys.handle();
			await handleDropZone();
			await handleGoTo();
		})
	})
 
    onDestroy(() => {
		if(!keys?.value) return 
        Mousetrap.unbind(keys.value.join('+'));
    })

</script>

<button
    type="button"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:click={async () => await handleGoTo()}
    on:click
    on:mousemove
	disabled={href && !(window.__TAURI__?.shell?.open) && !href.startsWith('http') ? true : false}
    {...$$restProps}
    class="{type !== 'none' ? 'button ' + type : ''}{active ? ' active' : ''}{$$restProps.class ? ' '+$$restProps.class : ''}{dropzone ? ' !border-transparent': ''}{pulse ? ' pulse' : ''}"
>


    {#if icon && iconPosition === 'left'}
        <Icon 
            class="{$$slots.default ? iconPosition: ''}" 
            {...(typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon })}
        />
    {/if}
    <slot/>
    {#if icon && iconPosition === 'right'}
        <Icon 
            class="{$$slots.default ? iconPosition: ''}" 
            {...(typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon })}
        />
    {/if}
	{#if dropzone}
		<DropZone 
			bind:fileInput={dropzoneInput}
			{...dropzone} 
			class="w-full h-full absolute inset-0 overflow-visible rounded-full {dropzone.class ? ' '+dropzone.class : ''}" 
		/>
	{/if}
</button>

{#if tooltip}
    <Tooltip {...tooltip} />
{:else if popover }
	<Popover {...popover} />
{/if}
