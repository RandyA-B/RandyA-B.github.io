function convertMarkdown() {
    const input = document.getElementById('markdown-input').value;
    let html = input;

    // Images must come before links (both share bracket syntax)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Headings — h3 before h2 before h1 to avoid greedy partial matches
    html = html.replace(/^ *### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^ *## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^ *# (.+)$/gm, '<h1>$1</h1>');

    // Bold — double asterisks or double underscores
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italic — single asterisk or single underscore
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^ *> (.+)$/gm, '<blockquote>$1</blockquote>');

    return html;
}

document.getElementById('markdown-input').addEventListener('input', () => {
    const result = convertMarkdown();
    document.getElementById('html-output').textContent = result;
    document.getElementById('preview').innerHTML = result;
});
