
<template>
    <a :href="href" class="card">
		<img class="image" :src="image" :alt="title" />
		<div class="info">
			<div class="tags">
				<span class="tag">{{ date }}</span>
				<span class="tag category">{{ category }}</span>
			</div>
			<h3 class="title">{{ title }}</h3>
			<p class="desc">{{ excerpt }}</p>
		</div>
    </a>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-around;
    align-items: center;
	background: var(--vp-c-bg-soft);
	border: 1px solid var(--vp-c-bg-soft);
	border-radius: 15px;
	height: -webkit-fill-available;
	padding: 10px;
	transition: border-color .25s,background-color .25s;
}
.card:hover {
	border-color: var(--vp-c-brand-1);
}
.info {
	display: flex;
    flex-direction: column;
    padding: 10px;
    flex-wrap: nowrap;
    justify-content: center;
	text-align: center;
    align-items: center;
}
.tags {
	display: flex;
	gap: 5px;
	margin: 5px;
}
.info .tag {
	background-color: var(--vp-c-bg);
	padding: 0 10px;
	border-radius: 20px;
	font-weight: 300;
    font-size: small;
}
.info .tag.category {
	background-color: var(--vp-c-brand-1);
}
.title {
	margin: 5px;
	font-size: x-large;

}
.title .tag {
	margin-left: 10px;
}
.info h3 {
	font-weight: 900;
}
</style>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
		author : {
			name: {
				type: String,
            	required: true,
			},
			github: {
				type: String,
            	required: true,
			},
			url: {
				type: String,
            	required: true,
			},
		},
        category: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
    },
};
</script>
