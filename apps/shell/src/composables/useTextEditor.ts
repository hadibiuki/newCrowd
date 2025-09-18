export const useTextEditor = () => {
  const htmlToMarkdown = (html: string): string => {
    if (!html) return '';
    html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (_, codeContent) => {
      const decodedCode = decodeHTMLEntities(codeContent.trim());

      return `\n\`\`\`\n${decodedCode}\n\`\`\`\n`;
    });

    return html
      .replace(/<\/?ul>/gi, '')
      .replace(/<li>\s*(.*?)\s*<\/li>/gi, '* $1\n')
      .replace(/<(strong|b)>(.*?)<\/\1>/gi, '**$2**')
      .replace(/<(em|i)>(.*?)<\/\1>/gi, '*$2*')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<p>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };
  const decodeHTMLEntities = (str: string): string =>
    str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

  return {
    htmlToMarkdown,
  };
};
