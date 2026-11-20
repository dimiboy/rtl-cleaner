/**
 * Hebrew RTL & Subtitle Cleaner Utilities
 */

// LRM: Left-to-Right Mark, RLM: Right-to-Left Mark
export const LRM = '\u200E';
export const RLM = '\u200F';

/**
 * Checks if a string contains Hebrew characters
 */
export function containsHebrew(str) {
  return /[\u0590-\u05FF]/.test(str);
}

/**
 * Swap inverted brackets and parentheses
 */
export function swapInvertedBrackets(text) {
  const map = {
    '(': ')',
    ')': '(',
    '[': ']',
    ']': '[',
    '{': '}',
    '}': '{',
    '<': '>',
    '>': '<',
    '«': '»',
    '»': '«'
  };

  return text.split('\n').map(line => {
    // Only swap if the line contains Hebrew and is likely inverted
    if (!containsHebrew(line)) return line;
    return line.split('').map(char => map[char] || char).join('');
  }).join('\n');
}

/**
 * Fix punctuation that got placed on the wrong end of the line
 * In LTR editors, a period or question mark intended for the end of a Hebrew line
 * often appears at the beginning of the line.
 */
export function fixReversedPunctuation(text) {
  return text.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed || !containsHebrew(trimmed)) return line;

    // Detect leading punctuation on a Hebrew line (e.g. "?מה נשמע" or "!איזה יופי" or ".שלום לכולם")
    const leadingPunctMatch = trimmed.match(/^([.?!,:;…\-—]+)\s*(.+)$/);
    if (leadingPunctMatch) {
      const punct = leadingPunctMatch[1];
      const rest = leadingPunctMatch[2];
      // Move punct to the logical end with an RLM marker so it displays correctly
      return `${rest}${punct}`;
    }

    // Trailing punctuation on LTR rendered text that needs RLM to stick to Hebrew end
    if (/[\u0590-\u05FF]/.test(trimmed) && /[.?!,:;]/.test(trimmed[trimmed.length - 1])) {
      return `${trimmed}${RLM}`;
    }

    return line;
  }).join('\n');
}

/**
 * Injects directional isolation marks (LRM/RLM) around Latin words and numbers
 * inside Hebrew text so they don't break the sentence flow.
 */
export function fixMixedDirectionMarks(text) {
  return text.split('\n').map(line => {
    if (!containsHebrew(line)) return line;
    
    // Wrap English words / numbers / codes inside Hebrew with LRM
    // e.g. "הורדתי את docker-compose.yml בהצלחה"
    return line.replace(/([a-zA-Z0-9_\-\.\/]{2,})/g, `${LRM}$1${RLM}`);
  }).join('\n');
}

/**
 * Strips subtitle timecodes, line numbers, and styling from SRT/VTT
 */
export function cleanSubtitles(rawText, options = {}) {
  const { mergeLines = true } = options;

  let text = rawText;

  // Normalize line endings
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Remove WEBVTT headers and metadata blocks
  text = text.replace(/^WEBVTT[^\n]*\n+/i, '');
  text = text.replace(/NOTE[^\n]*\n+/gi, '');
  text = text.replace(/(STYLE|REGION)[\s\S]*?(?=\n\n|\n[0-9]+|\n$)/gi, '');

  // Split into lines
  const lines = text.split('\n');
  const cleanedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      if (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1] !== '') {
        cleanedLines.push('');
      }
      continue;
    }

    // Skip subtitle sequence numbers (pure digits)
    if (/^\d+$/.test(line)) {
      continue;
    }

    // Skip timecode lines (SRT: 00:00:20,000 --> 00:00:24,400 or VTT: 00:00.000 --> 00:04.000)
    if (/^\d{1,2}:?\d{2}:\d{2}[,\.]\d{3}\s*-->\s*\d{1,2}:?\d{2}:\d{2}[,\.]\d{3}/.test(line)) {
      continue;
    }
    if (/^\d{2}:\d{2}[,\.]\d{3}\s*-->\s*\d{2}:\d{2}[,\.]\d{3}/.test(line)) {
      continue;
    }

    // Strip HTML/formatting tags: <font ...>, </font>, <i>, <b>, <u>, {\an8}, etc.
    let cleanLine = line
      .replace(/<[^>]+>/g, '')
      .replace(/\{[^\}]+\}/g, '')
      .trim();

    if (cleanLine) {
      cleanedLines.push(cleanLine);
    }
  }

  let result = cleanedLines.join('\n');

  // If mergeLines is enabled, group subtitle fragments into continuous paragraphs
  if (mergeLines) {
    const paragraphs = [];
    let currentPara = [];

    cleanedLines.forEach(line => {
      if (line === '') {
        if (currentPara.length) {
          paragraphs.push(currentPara.join(' '));
          currentPara = [];
        }
      } else {
        currentPara.push(line);
      }
    });

    if (currentPara.length) {
      paragraphs.push(currentPara.join(' '));
    }

    result = paragraphs.join('\n\n');
  }

  // Clean double spaces
  result = result.replace(/[ \t]{2,}/g, ' ').trim();

  return result;
}

/**
 * Optimizes text for LLM / AI Prompts (ChatGPT, Claude, Gemini)
 */
export function cleanForPrompt(rawText) {
  let text = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Remove triple or more newlines into max 2
  text = text.replace(/\n{3,}/g, '\n\n');

  // Trim trailing spaces from each line
  text = text.split('\n').map(l => l.trimEnd()).join('\n');

  // Clean extra spaces inside lines
  text = text.replace(/[ \t]{2,}/g, ' ');

  return text.trim();
}

/**
 * Master clean function applying selected filters
 */
export function processText(input, settings) {
  if (!input) return '';

  let out = input;

  if (settings.mode === 'subtitle') {
    out = cleanSubtitles(out, { mergeLines: settings.mergeSubtitleLines });
  }

  if (settings.fixPunctuation) {
    out = fixReversedPunctuation(out);
  }

  if (settings.swapBrackets) {
    out = swapInvertedBrackets(out);
  }

  if (settings.isolateMixed) {
    out = fixMixedDirectionMarks(out);
  }

  if (settings.cleanForPrompt) {
    out = cleanForPrompt(out);
  }

  return out;
}

/**
 * Computes text metrics
 */
export function getTextStats(text) {
  if (!text) {
    return { chars: 0, words: 0, hebrewWords: 0, englishWords: 0, estimatedTokens: 0, lines: 0 };
  }

  const chars = text.length;
  const wordsArray = text.trim().split(/\s+/).filter(Boolean);
  const words = wordsArray.length;

  let hebrewWords = 0;
  let englishWords = 0;

  wordsArray.forEach(w => {
    if (/[\u0590-\u05FF]/.test(w)) hebrewWords++;
    else if (/[a-zA-Z]/.test(w)) englishWords++;
  });

  // Token estimate: Hebrew is typically ~2-4 chars per token on modern tokenizers
  const estimatedTokens = Math.ceil(chars / 3.2);
  const lines = text.split('\n').length;

  return { chars, words, hebrewWords, englishWords, estimatedTokens, lines };
}
