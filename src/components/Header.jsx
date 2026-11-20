import React from 'react';
import { Sparkles, Heart, ExternalLink, HelpCircle, Layers } from 'lucide-react';

export default function Header({ onOpenSupport, onOpenPrivacy }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-bold text-xl select-none">
            א
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">RTL & Subtitle Cleaner</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              תיקון עברית הפוכה, ניקוי כתוביות והכנה לפרומפטים
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ThumbSplit Cross-promotion */}
          <a
            href="https://thumbsplit.dimustech.net"
            target="_blank"
            rel="noopener noreferrer"
            title="ThumbSplit - YouTube Thumbnail Split-Tester"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>ThumbSplit</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Privacy Link */}
          <button
            onClick={onOpenPrivacy}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
            title="פרטיות ואבטחה"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">פרטיות</span>
          </button>

          {/* Support / Tip */}
          <button
            onClick={onOpenSupport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            <span>תמיכה ביוצר</span>
          </button>
        </div>
      </div>
    </header>
  );
}
