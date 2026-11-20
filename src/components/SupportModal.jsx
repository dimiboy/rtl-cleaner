import React, { useState } from 'react';
import { X, Heart, Coffee, Copy, Check, ExternalLink } from 'lucide-react';

export default function SupportModal({ isOpen, onClose }) {
  const [copiedBtc, setCopiedBtc] = useState(false);
  const btcAddress = "1344MBr6fkTYAzo64yQxjXNQDHC84THP3z";

  if (!isOpen) return null;

  const handleCopyBtc = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150" dir="rtl">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20">
            <Heart className="w-5 h-5 fill-pink-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">תמיכה בפיתוח הכלי</h3>
            <p className="text-xs text-slate-400">100% חינמי, פרטי וללא שמירת מידע</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          הכלי פותח על ידי <strong className="text-white">DimusTech</strong> במטרה לפתור בעיות פיסוק בעברית ולהקל על עבודה עם כתוביות ומודלי AI. אם הכלי עזר וחסך לכם זמן, טיפ קטן עוזר לתחזק אותו ולפתח כלים נוספים!
        </p>

        {/* Payment Methods */}
        <div className="space-y-4">
          {/* PayPal */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-slate-200">טיפ מהיר דרך PayPal</span>
              </div>
              <span className="text-[11px] text-slate-500" dir="ltr">paypal.me/dimiboy</span>
            </div>
            <a
              href="https://paypal.me/dimiboy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0070BA] hover:bg-[#005ea6] text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm"
            >
              <span>שליחת טיפ ב-PayPal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Bitcoin */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[10px] flex items-center justify-center">₿</span>
                <span className="text-sm font-semibold text-slate-200">Bitcoin (BTC)</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Native Network</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2" dir="ltr">
              <code className="text-[11px] text-slate-300 font-mono select-all truncate">
                {btcAddress}
              </code>
              <button
                onClick={handleCopyBtc}
                title="Copy Bitcoin Address"
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
              >
                {copiedBtc ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copiedBtc && (
              <p className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1">
                <Check className="w-3 h-3" /> הכתובת הועתקה ללוח!
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            תודה רבה על התמיכה בכלים עצמאיים! ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
