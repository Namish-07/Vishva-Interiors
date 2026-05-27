import React, { useState } from "react";
import { Phone, Copy, Check, ExternalLink } from "lucide-react";

interface InteractivePhoneProps {
  className?: string;
  showIcon?: boolean;
}

export default function InteractivePhone({ className = "", showIcon = true }: InteractivePhoneProps) {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const phoneNumber = "+919533212122";
  const displayFormat = "+91 95332 12122";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block z-30">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
        className={`inline-flex items-center gap-1.5 hover:text-gold-400 select-all cursor-pointer transition-colors text-left ${className}`}
        title="Click to Call or Copy number"
      >
        {showIcon && <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />}
        <span>{displayFormat}</span>
      </button>

      {showOptions && (
        <>
          {/* Backdrop/invisible closing layer to dismiss popup */}
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(false);
            }} 
          />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 bg-slate-900 border border-gold-500/30 rounded-xl p-2 shadow-2xl z-[70] animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-col gap-1">
              <a
                href={`tel:${phoneNumber}`}
                onClick={() => setShowOptions(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-gold-500/10 rounded-lg transition-colors font-sans"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Call +91 95332 12122</span>
                <ExternalLink className="w-3 h-3 text-gray-500 ml-auto" />
              </a>
              
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-gold-500/10 rounded-lg transition-colors font-sans text-left w-full"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Number Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold-400" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
