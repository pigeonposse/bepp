<script lang="ts">
	
	import './main.css'
	import { createEventDispatcher } from 'svelte'
	import type { DropzoneValidate, DropzoneValue } from './types';

	export let multiple: boolean = false;
	export let input: boolean = false;
	export let dragOver: boolean = false;
	export let accept: string | undefined = undefined;
	export let fileInput: HTMLInputElement | undefined = undefined;
	export let value: DropzoneValue = undefined;
	export let validate: DropzoneValidate | undefined = undefined;
		
	export let accepted: boolean = true

	const dispatch = createEventDispatcher()

	function handleDragOver(event: DragEvent): void {
	  event.preventDefault();
	  dragOver = true;
	}
  
	function handleDragLeave(event: DragEvent): void {
	  event.preventDefault();
	  dragOver = false;
	}

	async function setValue(files: DropzoneValue ) {

		if(validate) {
			const validation = await validate(files)
	
			if(!validation) {
				value = undefined
				return 
			}
		}

		value = files

		dispatch('filesDropped', { files });

	}

	async function handleDrop(event: DragEvent): Promise<void> {
	  	event.preventDefault();
	 	dragOver = false;
	  	const files = event.dataTransfer?.files
		await setValue(files)
		// console.log('handleDrop',{event, files, value})
	}

	async function handleFileSelect(event: Event): Promise<void> {
	  const inputElement = event.target as HTMLInputElement;
	  if (!inputElement || !inputElement.files) return
  
	  const files = inputElement.files;
	  await setValue(files)
	//   console.log('handleFileSelect',{event, inputElement, files, value})
	}
  
	function triggerFileInput(): void {
	  if (input && fileInput) {
		fileInput.click();
	  }
	}

</script>
  
<div
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
	on:click={triggerFileInput}
	role="presentation"
	{...$$restProps}
	class="dropzone {dragOver ? 'drag-over' : ''} {accepted? 'correct' : 'incorrect'} {$$restProps.class ? ' '+$$restProps.class : ''}"
  >
	<slot />
	{#if input}
	  <input
		type="file"
		{multiple}
		{accept}
		bind:this={fileInput}
		on:change={handleFileSelect}
	  />
	{/if}
</div>
  