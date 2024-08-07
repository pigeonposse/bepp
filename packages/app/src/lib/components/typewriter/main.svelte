<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	
	export let texts: string[] = [];
	export let speed = 100;
	export let delay = 2000;
	export let stopWhenFinished = false; 
	export let stopped = false;
  
	let displayText = '';
	let index = 0;
	let textIndex = 0;
	let running = true;
  
	async function typeWriterEffect() {
	  while (running) {
		if (stopped) {
		  displayText = texts.join(' '); // Mostrar todo el texto cuando se detiene
		  break;
		}
	
		if (index < texts[textIndex].length) {
		  displayText += texts[textIndex][index];
		  index += 1;
		  await tick();
		  await new Promise(r => setTimeout(r, speed));
		} else {
		  if (stopWhenFinished && textIndex === texts.length - 1) {
			stopped = true;
			running = false;
		  } else {
			await new Promise(r => setTimeout(r, delay));
			index = 0;
			displayText = '';
			textIndex = (textIndex + 1) % texts.length;
		  }
		}
	  }
	}
  
	onMount(() => {
	  typeWriterEffect();
	});
  
	onDestroy(() => {
	  stopped = true;
	});
</script>
  
<span {...$$restProps}>{displayText}</span>
  