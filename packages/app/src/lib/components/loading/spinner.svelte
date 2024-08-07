<script type="ts">

    import { Spinner } from 'flowbite-svelte';
	import './spinner.css'

</script>
<div
	class="spinner {$$restProps.class || ""}"
>
	<Spinner 
		color="primary" 
		size={8} 
		{...$$restProps}
	/>
</div>
