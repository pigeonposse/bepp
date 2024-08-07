<script lang="ts">

    export let description: string
    export let title: string | undefined= undefined
    export let pageTitle: string | undefined = undefined
    export let titleType: 'left' | 'right' = 'right'
	
    if(pageTitle) pageTitle = title ? titleType === 'right' ? `${title} | ${pageTitle}` :  `${pageTitle} | ${title}` : pageTitle

</script>

<svelte:head>

    <title>{pageTitle || title}</title>
    <meta name="description" content={description} />

</svelte:head>
