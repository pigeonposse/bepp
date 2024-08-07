<script lang="ts">

	import {BadgeKey, Btn} from "$lib";
	export let title : string
	
</script>

<Btn 
	type={'dark'}
	on:click={async () =>{
		if($$restProps?.keys?.handle)await $$restProps.keys.handle()
	}}
	{...$$restProps}
>
	<slot/>
	<div class="w-full justify-between flex items-center">
		<span class="font-bold">{title}</span>
		{#if $$restProps?.keys?.value}
			<BadgeKey keys={$$restProps.keys.value}/>
		{/if}
	</div>
</Btn>
