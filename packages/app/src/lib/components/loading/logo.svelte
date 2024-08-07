<script lang="ts">
	
	import Confetti from "../confetti/main.svelte";
	import './logo.css'
	export let stopped: boolean = false
	export let src: string = '/logo.png'
	export let height: string = "50px"
	export let width: string = "50px"
	export let confetti: boolean = true

</script>

<div 
	{...$$restProps}
	class="logo {stopped ? 'stop' : 'start'} {$$restProps.class || ''}" 
>

	<img 
		{src}
		{height}
		{width}
		alt="Loading logo background fixed" 
		class="logo__bg"
	/>
	{#if stopped && confetti }
		<div class="logo__confetti">
			<Confetti/>
		</div>
	{/if}
	<img 
		{src}
		{height}
		{width}
		alt="Loading logo" 
		class="logo__image"
	/>
</div>
