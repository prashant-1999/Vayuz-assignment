export const convertMarkdownService = (markDown) => {
  return markDown
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gm, "<b>$1</b>")
    .replace(/__(.*?)__/gm, "<b>$1</b>")
    .replace(/\*(.*?)\*/gm, "<i>$1</i>")
    .replace(/_(.*?)_/gm, "<i>$1</i>")
    .replace(/^\s*[-*] (.*)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gm, "<ul>$1</ul>")
    .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
    .replace(/`(.*?)`/gm, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
};
