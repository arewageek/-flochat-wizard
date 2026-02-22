'use client'

import { motion } from 'framer-motion'
import { Sparkles, Check, Copy } from 'lucide-react'
import { WizardConfig } from './types'

interface CodePanelProps {
    config: WizardConfig
    onCopyCode: () => void
    copied: boolean
    code: string
}

export function CodePanel({ config, onCopyCode, copied, code }: CodePanelProps) {
    return (
        <motion.div 
            key="code"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
        >
            <h3 className="panel-section-title mb-6">Production Artifacts</h3>
            
            <div className="code-block bg-bg-overlay border-none rounded-[2rem] p-8 shadow-2xl relative group">
                <div className="code-block-header border-white/5 mb-6">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]/30" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/30" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]/30" />
                    </div>
                    <button onClick={onCopyCode} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all">
                        {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                </div>
                <pre className="text-white selection:bg-accent/30 overflow-x-auto">
                    <code className="text-[11px] leading-[1.8] font-mono opacity-90">{code}</code>
                </pre>
            </div>
        </motion.div>
    )
}
