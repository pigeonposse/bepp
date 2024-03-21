

import Theme from "vitepress/theme";
import "./custom.css";

import PostCard from "./components/PostCard.vue";
// import PostLayout from "./components/PostLayout.vue";
import Posts from "./components/Posts.vue";


export default {
  extends: Theme,
  enhanceApp({ app }) {

    app.component("PostCard", PostCard);
	app.component('Posts', Posts);
	// app.component('post', PostLayout);
  },
};

