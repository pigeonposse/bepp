
import { onMounted, h } from 'vue';
import mediumZoom from 'medium-zoom';
import DefaultTheme from "vitepress/theme";

import "./custom.css";

import PostCard from "./components/PostCard.vue";
import PostAuthor from "./components/PostAuthor.vue";
import Posts from "./components/Posts.vue";


export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' });
    });
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(PostAuthor)
    })
  },
  enhanceApp({ app }) {

    app.component("PostCard", PostCard);
	app.component('Posts', Posts);
	// app.component('post', PostLayout);
  },
};

