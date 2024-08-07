<script lang="ts">
	import { Toast } from 'flowbite-svelte';
	import {Icon, faTriangleExclamation} from '$lib'
	import { blur } from 'svelte/transition'
	import './main.css'
	import { onMount } from 'svelte';

	export let counter: number | undefined = undefined
	export let onClose: (() => Promise<void> )| undefined = undefined

	let toastStatus = true
	let isPaused = false;
	let remainingTime = counter; // To track remaining time on pause
	let startTime: number; // To track the start time of the timeout

	async function awaitDelay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function timeoutFunction() {
		if (!isPaused) {
			toastStatus = false;
			if (onClose) await onClose();
		}
	}
	async function timeout() {
		if (!counter) return;
		toastStatus = true;
		startTime = Date.now();
		await awaitDelay(counter);
		await timeoutFunction()
	}

	function pauseTimeout() {
		// console.log('pauseTimeout')
		if (!counter) return;
		if (!remainingTime) return;
		isPaused = true;
		const elapsedTime = Date.now() - startTime;
		remainingTime -= elapsedTime;
	}

	function resumeTimeout() {
		// console.log('resumeTimeout')
		if (!counter) return;
		isPaused = false;
		startTime = Date.now();
		setTimeout(async () => {
			await timeoutFunction()
		}, remainingTime);
	}

	onMount( async () => {
		await timeout()
	})


</script>

<Toast
	color="red"
	class="nots"
	defaultIconClass={'icon'}
	divClass=" "
	transition={blur}
	params={{ amount: 10 }}
	{...$$restProps}
	on:close={async () => {
		if(onClose) await onClose()
	}}
	on:mouseenter={pauseTimeout}
	on:mouseleave={resumeTimeout}
	bind:toastStatus
>
	<Icon svg={faTriangleExclamation} slot="icon"/>
	<slot/>
</Toast>
