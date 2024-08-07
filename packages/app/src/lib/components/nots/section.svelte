<script lang="ts">
	import './section.css'
	export let type: 'top' | 'bottom' = 'bottom'

</script>
<div 
	
	class="nots-section {type}"
	{...$$restProps}
>
<slot/>
</div>
