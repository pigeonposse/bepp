<script>
	import { Select } from "flowbite-svelte";

</script>
<Select 
	{...$$restProps} 
	class="!bg-primary-800/20 !border-primary-800/20"
>
	<slot/>
</Select>
