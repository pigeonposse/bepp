<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
</script>

<template >
	<template v-if="frontmatter.category">
		<div class="aside-custom">
			<bold>{{ page.title }}</bold>

			<Badge type="info" :text="frontmatter.category" class="aside-badge"/>
			<div class="author-section">
				<!-- <span class="outline-title">Author</span> -->
				<a :href="frontmatter.author.url" target="_blank">
					<img :src="'https://github.com/' + frontmatter.author.github+'.png?size=72'" alt="author image" width="40">
					<span>{{ frontmatter.author.name }}</span>
				</a>
			</div>
		</div>
	</template>
</template>
<style scoped>
.aside-custom {
	display: flex;
    flex-direction: column;
}
.aside-custom bold {
	font-weight: 900;
	font-size: large;
}
.aside-custom .aside-badge {
	width: fit-content;
    margin: 10px 0 0 0;
}
.aside-custom .author-section {
	margin: 25px 0 25px 0;
}
.aside-custom .author-section > span{
	margin-bottom: 5px;
	font-weight: 600;
	font-size: small;
}
.aside-custom .author-section a {
	display: flex;
	align-items: center;
	gap: 10px;
}
.aside-custom .author-section img {
	border-radius: 100%;
	background-color: var(--vp-c-bg-soft);
}
.aside-custom .author-section a span {
	font-weight: 600;
}
</style>
