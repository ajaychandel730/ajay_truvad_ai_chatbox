import { Button } from '@heroui/react'
import React from 'react'

type Props = {
    onChipClick:(text: string) => void
}

const ChatEmptyState = ({onChipClick}:Props) => {

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center mt-[-10vh]">
          <p className="text-slate-600 text-[16px] mb-8 max-w-125 leading-relaxed">
            Hi! I'm GRIP AI, your regulatory copilot. Ask me about compliance
            updates, regulations, or how TRUVAD can help.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-125">
            <Button
              onClick={() => onChipClick("Latest regulations?")}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-full text-[14px] text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Latest regulations?
            </Button>
            <Button
              onClick={() => onChipClick("How TRUVAD works?")}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-full text-[14px] text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              How TRUVAD works?
            </Button>
            <Button
              onClick={() => onChipClick("Summarize updates")}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-full text-[14px] text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Summarize updates
            </Button>
          </div>
        </div>
  )
}

export default ChatEmptyState