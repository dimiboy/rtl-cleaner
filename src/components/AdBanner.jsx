import React, { useEffect, useRef } from 'react';

/**
 * Responsive Google AdSense Display Banner
 */
export default function AdBanner({ slotId = '6234153621', className = '' }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch (e) {
      console.debug('AdSense notice:', e);
    }
  }, [slotId]);

  return (
    <div className={`w-full my-6 ${className}`}>
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 sm:p-4 text-center overflow-hidden">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2 select-none">
          Advertisement
        </div>
        <div className="min-h-[90px] flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client="ca-pub-0969681426923712"
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
