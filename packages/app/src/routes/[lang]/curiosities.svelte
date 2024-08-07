<script lang="ts">
    
	import { onMount } from 'svelte'
    import { Btn, Typewriter, faUpRightFromSquare } from "$lib/components"
	import type { GeneralLayoutData } from "../+layout"

    export let data: GeneralLayoutData

    const { core, locale } = data;
    const { facts: webFacts } = core.api
	const { conversion } = core.api.extension
    
	let facts: Awaited<ReturnType<typeof webFacts.getRandom>> = undefined
	let stopped = false
	let onChange = false
	let speed = 50
	async function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
	
    async function getRandomFact() {
		stopped = false
		await delay(500)
        facts = await webFacts.getRandom({ 
			lang: $locale
		})
    }
	async function changefact() {
		onChange = true
		await delay(2000)
		facts = undefined
		getRandomFact()
		onChange = false
	}
	
    onMount(() => {
		getRandomFact()
    })

	$: if (!$conversion.loading) speed = 1
    $: if (!onChange && stopped && $conversion.loading) changefact()

</script>


{#if facts}
	<Btn
		type={'none'}
		href={facts.link}
		class={'p-2 text-[10px]'}
		icon={faUpRightFromSquare}
	/>
	<Typewriter
		texts={[facts.phrase]}
		stopWhenFinished={true}
		speed={speed}
		class="opacity-80 w-full text-primary-200/70"
		bind:stopped={stopped}
	/>
{:else}
	<span>...</span>
{/if}

