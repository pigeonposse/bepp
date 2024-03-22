<script setup>
import { useData } from 'vitepress'
const formatLink = (key, link) => {
  return key === 'email' ? `mailto:${link}` : link;
};
const { theme, frontmatter } = useData()
</script>

<template>
  <footer v-if="theme.customFooter !== false" class="container">
	<div v-if="theme.collectiveLinks" class="collectivelinks">
    	<a v-for="(link, key) in theme.collectiveLinks" :key="key" :href="formatLink(key, link)" target="_blank">{{ key }}</a>
  	</div>
	<div class="mark">
		<span>Released under the {{ theme.customFooter.license }} License.</span>
    	<span>Copyright © {{ new Date().getFullYear() }} <a :href="theme.customFooter.copy.url" target="_blank"> {{ theme.customFooter.copy.name }}</a></span>
	</div>
  </footer>
</template>

<style scoped>
footer {
  padding: 40px;
  border-radius: 20px;
  margin: 10px;
  /* background-color: var(--vp-c-bg-soft); */
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: small;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  width: 100%;
  margin: auto;
}
.mark {
	display: flex;
  align-items: center;
  flex-direction: column;
  font-size: small;
  opacity: 0.5;
}
.collectivelinks {
	margin-bottom: 20px;
	display: flex;
	gap: 10px;
	text-transform:capitalize;
}
.collectivelinks a {
	padding: 5px 10px;
}
</style>
