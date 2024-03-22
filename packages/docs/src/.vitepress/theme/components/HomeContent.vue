<template >
<section v-if="$frontmatter.demo">
	<h2>Preview</h2>
	<img :src="$frontmatter.demo"  alt="demo"/>
</section>
</template>
<style scoped>
h2 {
	font-size: xx-large;
	font-weight: 900;
	margin: 0 auto 25px auto;
	width: auto;
    display: flex;
    flex-direction: column;
}
section {
	max-width: 1152px;
	width: 100%;
	margin:60px auto 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
}
img {
	border: 1px solid var(--vp-c-bg-soft);
}
</style>
