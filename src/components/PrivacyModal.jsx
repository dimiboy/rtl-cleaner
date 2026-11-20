import React from 'react';
import { X, ShieldCheck, Lock, Cpu } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150" dir="rtl">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">פרטיות ואבטחת מידע</h3>
            <p className="text-xs text-slate-400">עיבוד מקומי מלא בדפדפן (Client-Side Only)</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">הטקסט שלכם לא עוזב את המכשיר:</strong>
              כל פעולות התיקון, הפסיקים, הכתוביות והעיצוב מתבצעות ב-JavaScript ישירות בדפדפן שלכם. שום פיסת טקסט אינה נשלחת או נשמרת בשרת כלשהו.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
            <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">בטוח לשימוש עם מידע רגיש:</strong>
              מתאים לתיקון מסמכים אישיים, קוד מקור, תמלילי שיחות, כתוביות ותרגומים ללא חשש מזליגת מידע.
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}
