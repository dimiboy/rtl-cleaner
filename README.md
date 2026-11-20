# Hebrew RTL & Subtitle Cleaner | כלי לתיקון עברית וניקוי כתוביות

A fast, private, 100% client-side web utility built for Hebrew content creators, developers, and AI users.

Live site: [rtl.dimustech.net](https://rtl.dimustech.net) (or [rtl-cleaner.pages.dev](https://rtl-cleaner.pages.dev))

## Features
- **Punctuation & Direction Fixer**: Fixes reversed question marks, exclamation points, and periods that flip to the start of Hebrew lines in LTR/code editors.
- **Inverted Brackets & Parentheses**: Automatically swaps `()`, `[]`, `{}` in mixed Hebrew/English sentences.
- **Directional Isolation (LRM/RLM)**: Inserts proper Unicode markers around English terms, filenames, code snippets, and numbers inside Hebrew text.
- **Subtitle (SRT/VTT) Cleaner**: Strips timestamps, line numbers, and HTML tags, merging broken captions into clean paragraphs.
- **AI & LLM Optimizer**: Calculates estimated LLM tokens, cleans excess whitespaces and double line breaks for ChatGPT, Claude, and Gemini prompts.
- **100% Client-Side Privacy**: No server storage, no tracking, completely private and secure.

## Tech Stack
- React 19 + Vite
- Tailwind CSS v4
- Lucide React
- Cloudflare Pages

## License
MIT © DimusTech
