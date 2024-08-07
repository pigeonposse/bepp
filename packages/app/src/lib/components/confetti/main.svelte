<script lang="ts">

 	import { Confetti } from "svelte-confetti"
	export let type: 'bg' | 'logo' = 'logo'

</script>

{#if type === 'bg'}

	<Confetti 
		rounded
		size={8}
		amount={100}
		noGravity
		duration={6000}
		fallDistance="0px"
		x={[-6, 6]} 
		y={[-6, 6]} 
		infinite
		colorArray={[
			'white',
			'var(--theme-primary)',
			'var(--theme-secondary)',
			'var(--theme-tertiary)',
			'var(--theme-fourth)',
		]}
		{...$$restProps}
	/>

{:else}
	<Confetti 
		rounded
		size={8}
		amount={100}
		fallDistance="0px"
		x={[-1.5, 1.5]} 
		y={[-1.5, 1.5]} 
		colorArray={[
			'white',
			'var(--theme-primary)',
			'var(--theme-secondary)',
			'var(--theme-tertiary)',
			'var(--theme-fourth)',
		]}
		{...$$restProps}
	/>

{/if}
