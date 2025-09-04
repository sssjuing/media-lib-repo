import { FC } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import shell from 'react-syntax-highlighter/dist/esm/languages/prism/shell-session';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import { darcula, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('shell', shell);

interface CodeHighlighterProps {
  code: string;
  lang: 'yaml' | 'bash' | 'shell';
  mode?: 'light' | 'dark';
  className?: string;
}

export const CodeHighlighter: FC<CodeHighlighterProps> = ({ code, lang, mode, className }) => {
  const style = mode === 'dark' ? darcula : solarizedlight;

  return (
    <SyntaxHighlighter language={lang} style={style} className={className}>
      {code}
    </SyntaxHighlighter>
  );
};
