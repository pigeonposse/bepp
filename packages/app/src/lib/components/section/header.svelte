<script lang="ts" >

    import './header.css'

    import {
	  	Btn
	} from "$lib";
	import Icon from "$lib/components/icons/main.svelte"

	import type { ComponentProps } from 'svelte';

	type HeaderBtnShared = {
		title: string
		goto?: string
		href?: string
		keys?: string[]
		class?: string
	}
	type HeaderBtnImg = HeaderBtnShared & {
		imgSrc?: string
		imgAlt?: string
	}
	type HeaderBtnIcon = HeaderBtnShared & {
		id: string
		icon: ComponentProps<Icon> | ComponentProps<Icon>['svg'] | undefined
	}
	type HeaderBtn = HeaderBtnImg | HeaderBtnIcon

	export let currRouteID: string | undefined = undefined
	export let version: string | undefined = undefined
	export let btns: HeaderBtn[] | undefined = undefined
	// export let btnsTop: HeaderBtn[] | undefined = undefined
	// export let btsBottom: HeaderBtn[] | undefined = undefined


</script>

<header class="header">
	<div class="header__top">

	</div>
	<nav>
		<ul>

			{#if btns} 
			{#each btns as btn}
				<li>
					{#if 'imgSrc' in btn}
						<Btn 
							href="{btn.href}" 
							goto="{btn.goto}" 
							type={'none'}
							tooltip={{
								title: btn.title,
								placement: 'right',
								...( btn.keys ? {
									badge: {
										keys: btn.keys,
									}
								}: {}),
							}}
							keys={btn.keys ? { value: btn.keys, handle: undefined } : undefined}
							disabled={ 'id' in btn && btn.id == currRouteID}
							active={ 'id' in btn && btn.id == currRouteID}
							class="image {btn.class ? btn.class : ''}"
						>
							<img 
								src={btn.imgSrc}
								alt={btn.imgAlt} 
								height="50px"
							/>
						</Btn>
					{:else}
						<Btn 
							href="{btn.href}" 
							goto="{btn.goto}" 
							type={'dark'}
							icon={'icon' in btn ? btn.icon : undefined}
							tooltip={{
								title: btn.title,
								placement: 'right',
								...( btn.keys ? {
									badge: {
										keys: btn.keys,
									}
								}: {}),
							}}
							keys={btn.keys ? { value: btn.keys, handle: undefined } : undefined}
							disabled={ 'id' in btn && btn.id == currRouteID}
							active={ 'id' in btn && btn.id == currRouteID}
							class="{btn.class ? btn.class : ''}"
						/>
					{/if}
				</li>
			{/each}	
			{/if}

		</ul>
	</nav>

	<div class="header__bottom">
		{#if version}
			v{version}
		{/if}
	</div>		


</header>
