import React from 'react';
import YoutubeIcon from './YoutubeIcon';
import { Layers, Heart, Shield } from 'lucide-react';

export default function Footer({ onOpenSupport, onOpenPrivacy }) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 text-xs text-slate-400 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Copy */}
        <div className="flex items-center gap-2 text-center md:text-right">
          <span className="font-semibold text-slate-300">DimusTech</span>
          <span>•</span>
          <span>כלי עזר חינמיים ליוצרים, מפתחים וקהל העברית</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="https://thumbsplit.dimustech.net"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ThumbSplit Previewer</span>
          </a>

          <a
            href="http://youtube.com/c/dimustechil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <YoutubeIcon className="w-3.5 h-3.5 fill-red-500" />
            <span>ערוץ היוטיוב של דימה</span>
          </a>

          <button
            onClick={onOpenPrivacy}
            className="hover:text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>פרטיות</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="hover:text-pink-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span>תמיכה</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
