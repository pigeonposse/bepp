<script setup>
import ArticleCard from "./PostCard.vue";
import { data as articles } from '../posts.data.ts'

</script>
<template>
    <div class="container-posts">
        <ArticleCard v-for="article in articles" :title="article.title" :href="article.url" :date="article.date.string" :image="article.image" :author="article.author" :category="article.category" :excerpt="article.excerpt"/>
    </div>
</template>
<style>
.container-posts {
	display: grid;
 	grid-template-columns: repeat(1, 1fr);
    flex-direction: column;
    align-items: center;
	gap: 10px;
	margin: auto 20px;
}
@media (min-width: 768px) {
	.container-posts {
		grid-template-columns: repeat(2, 1fr);
		margin: auto 64px;
	}
}
</style>
