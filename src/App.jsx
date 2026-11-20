import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import SupportModal from './components/SupportModal';
import PrivacyModal from './components/PrivacyModal';
import { 
  processText, 
  getTextStats 
} from './utils/cleaner';
import { 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  Sparkles, 
  FileText, 
  Subtitles, 
  ArrowLeftRight, 
  Sliders, 
  Share2, 
  CheckCircle2,
  Cpu
} from 'lucide-react';

const SAMPLE_HEBREW = `?איך מתקינים את המערכת החדשה
הפונקציה get_user_status() החזירה שגיאה [קוד 404] בעת החיבור.
!זה עובד מעולה עכשיו
קובץ ההגדרות (config.yaml) נשמר בספרייה הראשית.
.תודה רבה על העזרה`;

const SAMPLE_SRT = `1
00:00:01,200 --> 00:00:04,500
<font color="#ffff00">שלום לכולם וברוכים הבאים</font>

2
00:00:04,600 --> 00:00:08,100
בסרטון של היום אנחנו נלמד
איך להשתמש ב-Docker וב-Home Assistant.

3
00:00:08,200 --> 00:00:11,900
<i>כל הקבצים וההגדרות נמצאים בקישור למטה בתיאור.</i>`;

export default function App() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('rtl'); // 'rtl' | 'subtitle' | 'prompt'
  const [fixPunctuation, setFixPunctuation] = useState(true);
  const [swapBrackets, setSwapBrackets] = useState(true);
  const [isolateMixed, setIsolateMixed] = useState(true);
  const [mergeSubtitleLines, setMergeSubtitleLines] = useState(true);
  const [cleanForPromptOption, setCleanForPromptOption] = useState(true);

  const [copied, setCopied] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Computed output
  const output = useMemo(() => {
    return processText(input, {
      mode,
      fixPunctuation,
      swapBrackets,
      isolateMixed,
      mergeSubtitleLines,
      cleanForPrompt: cleanForPromptOption,
    });
  }, [input, mode, fixPunctuation, swapBrackets, isolateMixed, mergeSubtitleLines, cleanForPromptOption]);

  // Statistics
  const inStats = useMemo(() => getTextStats(input), [input]);
  const outStats = useMemo(() => getTextStats(output), [output]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'subtitle' ? 'cleaned_subtitles.txt' : 'cleaned_hebrew_text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
  };

  const setPreset = (type) => {
    if (type === 'hebrew') {
      setMode('rtl');
      setInput(SAMPLE_HEBREW);
      setFixPunctuation(true);
      setSwapBrackets(true);
      setIsolateMixed(true);
    } else if (type === 'srt') {
      setMode('subtitle');
      setInput(SAMPLE_SRT);
      setMergeSubtitleLines(true);
      setFixPunctuation(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Header */}
      <Header 
        onOpenSupport={() => setIsSupportOpen(true)} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6" dir="rtl">
        
        {/* Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-lg">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              <span>תיקון עברית וניקוי כתוביות חכם</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              מתקן באופן מיידי סימני פיסוק הפוכים, סוגריים שהתהפכו בקוד או תרגומים, מסיר טיימקודים מקובצי כתוביות SRT/VTT ומכין טקסטים נקיים ל-AI.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setPreset('hebrew')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700/80 transition-all cursor-pointer hover:border-indigo-500/50"
            >
              דוגמת עברית
            </button>
            <button
              onClick={() => setPreset('srt')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700/80 transition-all cursor-pointer hover:border-indigo-500/50"
            >
              דוגמת כתוביות SRT
            </button>
          </div>
        </div>

        {/* Mode Selector & Controls */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setMode('rtl')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'rtl' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>עברית ופיסוק (RTL)</span>
            </button>

            <button
              onClick={() => setMode('subtitle')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'subtitle' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Subtitles className="w-3.5 h-3.5" />
              <span>ניקוי כתוביות (SRT/VTT)</span>
            </button>

            <button
              onClick={() => setMode('prompt')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'prompt' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>הכנה לפרומפטים (AI)</span>
            </button>
          </div>

          {/* Feature Checkboxes */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white">
              <input
                type="checkbox"
                checked={fixPunctuation}
                onChange={(e) => setFixPunctuation(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500"
              />
              <span>תיקון סימני פיסוק הפוכים</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white">
              <input
                type="checkbox"
                checked={swapBrackets}
                onChange={(e) => setSwapBrackets(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500"
              />
              <span>היפוך סוגריים () []</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white">
              <input
                type="checkbox"
                checked={isolateMixed}
                onChange={(e) => setIsolateMixed(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500"
              />
              <span>בידוד מילים באנגלית (LRM/RLM)</span>
            </label>

            {mode === 'subtitle' && (
              <label className="flex items-center gap-2 cursor-pointer select-none text-indigo-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={mergeSubtitleLines}
                  onChange={(e) => setMergeSubtitleLines(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700 focus:ring-indigo-500"
                />
                <span>איחוד שורות לפסקאות רציפות</span>
              </label>
            )}
          </div>
        </div>

        {/* Dual Pane Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
          
          {/* Input Box */}
          <div className="flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-200">טקסט מקור (הדביקו כאן)</span>
              </div>
              {input && (
                <button
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>נקה</span>
                </button>
              )}
            </div>

            <div className="flex-1 p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="הדביקו כאן טקסט בעברית עם פיסוק הפוך, קובץ כתוביות SRT/VTT, או פרומפט..."
                className="w-full h-80 lg:h-96 bg-transparent text-slate-200 placeholder:text-slate-600 text-sm leading-relaxed resize-none focus:outline-none"
                dir="auto"
              />
            </div>

            {/* Input Stats */}
            <div className="px-4 py-2.5 bg-slate-950/40 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>{inStats.chars} תווים</span>
                <span>•</span>
                <span>{inStats.words} מילים ({inStats.hebrewWords} בעברית)</span>
              </div>
              <span>{inStats.lines} שורות</span>
            </div>
          </div>

          {/* Output Box */}
          <div className="flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">טקסט מתוקן ומוכן</span>
              </div>
              
              {/* Output Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  disabled={!output}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="הורד כקובץ TXT"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">הורדה</span>
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>הועתק ללוח!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>העתקה</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex-1 p-3">
              <textarea
                readOnly
                value={output}
                placeholder="התוצאה המתוקנת תופיע כאן באופן מיידי..."
                className="w-full h-80 lg:h-96 bg-transparent text-slate-100 placeholder:text-slate-600 text-sm leading-relaxed resize-none focus:outline-none"
                dir="auto"
              />
            </div>

            {/* Output Stats */}
            <div className="px-4 py-2.5 bg-slate-950/40 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-medium">{outStats.chars} תווים</span>
                <span>•</span>
                <span>{outStats.words} מילים</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400">
                <Cpu className="w-3 h-3" />
                <span>~{outStats.estimatedTokens} טוקנים משוערים ב-AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards / Educational SEO Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
              <span>✍️</span> תיקון פיסוק עברי
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              מזהה סימני שאלה, קריאה ונקודות שנזרקו לתחילת השורה בעקבות אי התאמת LTR/RTL בעורכי קוד, מסמכים ותרגומים.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
              <span>🎬</span> ניקוי כתוביות SRT/VTT
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              מנקה בלחיצה אחת מספרי שורות, חותמות זמן ותגיות HTML מכתוביות של יוטיוב וסרטים, ומאחד לפסקאות רציפות.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
              <span>🤖</span> התאמה לפרומפטים
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              מחשב כמות טוקנים משוערת, מנקה רווחים כפולים ומבודד מונחים טכניים באנגלית כדי שמודלי AI יבינו בדיוק מה רציתם.
            </p>
          </div>
        </div>

        {/* Google AdSense Display Unit */}
        <AdBanner slotId="6234153621" />

      </main>

      {/* Footer */}
      <Footer 
        onOpenSupport={() => setIsSupportOpen(true)} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
      />

      {/* Modals */}
      <SupportModal 
        isOpen={isSupportOpen} 
        onClose={() => setIsSupportOpen(false)} 
      />
      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />

    </div>
  );
}
