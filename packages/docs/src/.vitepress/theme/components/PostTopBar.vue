<template>
	<div v-if="$frontmatter.category">
		<div class="progress-container">
			<div class="progress-bar"></div>
		</div>
	</div>
</template>

<style scoped>
.progress-container {
  position: fixed;
  width: 100%;
  height: 5px;
  /* background: var(--vp-c-bg-soft); */
  z-index: 99999;
  display: none;
}

.progress-bar {
  height: 5px;
  background: var(--vp-c-brand-1);
  width: 0%;
  border-radius: 0 5px 5px 0;
}
</style>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
	if(!window) return
	window.onscroll = function() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	const progressBar = document.querySelector(".progress-bar");
	const progressContainer = document.querySelector(".progress-container");
	if (progressBar && progressContainer) {
		if (scrolled === 0) {
		progressBar.style.width = "0%";
		progressContainer.style.display = 'none'
		} else {
		progressBar.style.width = scrolled + "%";
		progressContainer.style.display = 'block'
		}
	}
	};

})
</script>
