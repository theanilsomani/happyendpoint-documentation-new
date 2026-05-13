type Token =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; alt: string; src: string; title?: string }
  | { type: 'hr' };

export function MarkdownBlock({ markdown }: { markdown: string }) {
  const tokens = parseMarkdown(markdown);

  if (!tokens.length) return null;

  return (
    <div className="markdown-block">
      {tokens.map((token, index) => {
        if (token.type === 'heading') {
          const Tag = `h${token.level}` as 'h1' | 'h2' | 'h3';
          return <Tag key={index}>{renderInline(token.text)}</Tag>;
        }

        if (token.type === 'list') {
          return (
            <ul key={index}>
              {token.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (token.type === 'image') {
          return (
            <figure key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={token.alt}
                className="markdown-image"
                src={token.src}
              />
              {token.title ? <figcaption>{token.title}</figcaption> : null}
            </figure>
          );
        }

        if (token.type === 'hr') {
          return <hr key={index} />;
        }

        return <p key={index}>{renderInline(token.text)}</p>;
      })}
    </div>
  );
}

function parseMarkdown(markdown: string): Token[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const tokens: Token[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    tokens.push({ type: 'paragraph', text: paragraph.join(' ') });
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    tokens.push({ type: 'list', items: list });
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^-{3,}$/.test(line)) {
      flushParagraph();
      flushList();
      tokens.push({ type: 'hr' });
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/);
    if (image) {
      flushParagraph();
      flushList();
      tokens.push({ type: 'image', alt: image[1], src: image[2], title: image[3] });
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      tokens.push({
        type: 'heading',
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2],
      });
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1]);
      continue;
    }

    flushList();
    paragraph.push(line.replace(/\s{2,}$/, ''));
  }

  flushParagraph();
  flushList();

  return tokens;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a href={link[2]} key={index} rel="noreferrer" target="_blank">
          {link[1]}
        </a>
      );
    }

    return part;
  });
}
