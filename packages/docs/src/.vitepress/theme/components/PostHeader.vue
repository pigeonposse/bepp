<template >
	<section v-if="$frontmatter.category">
		<img :src="$frontmatter.image" alt="header image">
	
		<div>
			<span class="tag category">{{ $frontmatter.category }}</span>
			<span class="tag">{{  new Date($frontmatter.date).toDateString() }}</span>
		</div>
	</section>

</template>

<style scoped>
 div {
	margin: 15px 0;
	display: flex;
	gap:10px;
 }
 .tag {
	background-color: var(--vp-c-bg-soft);
	padding: 0 10px;
	border-radius: 20px;
	font-weight: 600;
    font-size: x-small;
}
.tag.category {
	background-color: var(--vp-c-brand-1);
}
</style>
