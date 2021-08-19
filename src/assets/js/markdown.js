import marked from 'marked'

// little wrapper to change markdown parser easily
// e.g. I would like to use remark, but it doesn't support browsers
export const markdownToHTML = (markdown) => {
    if(!markdown) return ''
    return marked(markdown)
}