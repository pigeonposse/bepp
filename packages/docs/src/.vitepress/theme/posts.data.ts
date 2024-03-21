import { createContentLoader } from 'vitepress'
import { srcDir } from '../config'

export default createContentLoader(srcDir+'/posts/*.md', {
    excerpt: true,
    transform(raw) {
		// console.log(raw)
        return raw
            .map(({ url, frontmatter, excerpt }) => ({
                title: frontmatter.title,
                url,
				category: frontmatter.category || 'tutorial',
				author: frontmatter.author,
                excerpt: truncateText(frontmatter.description, 100),
                date: formatDate(frontmatter.date),
                image: frontmatter.image || '/logo.png'
            }))
            .sort((a, b) => b.date.time - a.date.time)
    }
})

function truncateText(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + "...";
    }
    return text;
}

function formatDate(raw) {
    const date = new Date(raw)
    return {
        time: +date,
        string: date.toDateString()
    }
}

