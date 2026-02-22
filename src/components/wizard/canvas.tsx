'use client'

import { motion } from 'framer-motion'
import { Monitor as MonitorIcon, Smartphone, Globe, RefreshCw, ExternalLink, MoveDown, Layout, MousePointer2 } from 'lucide-react'
import { FloatingSocialButton } from '../floating-chat-button'
import { WizardConfig } from './types'

interface CanvasProps {
    config: WizardConfig
    previewDevice: 'desktop' | 'mobile'
    setPreviewDevice: (val: 'desktop' | 'mobile') => void
}

export function Canvas({ config, previewDevice, setPreviewDevice }: CanvasProps) {
    return (
        <main className="app-canvas relative bg-[#09090b] dark">
            <div className="absolute inset-0 canvas-bg pointer-events-none opacity-20" />
            
            {/* Device Controls */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#18181b] border border-[#27272a] p-1.5 rounded-full shadow-2xl z-20">
                <button 
                    onClick={() => setPreviewDevice('desktop')}
                    className={`w-12 h-9 flex items-center justify-center rounded-full transition-all ${previewDevice === 'desktop' ? 'bg-accent text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <MonitorIcon size={18} />
                </button>
                <button 
                    onClick={() => setPreviewDevice('mobile')}
                    className={`w-12 h-9 flex items-center justify-center rounded-full transition-all ${previewDevice === 'mobile' ? 'bg-accent text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Smartphone size={18} />
                </button>
            </div>
            
            {/* Preview Frame */}
            <motion.div 
                layout
                className={`
                    ${previewDevice === 'desktop' ? 'w-[92%] h-[84%]' : 'w-[375px] h-[720px] ml-4'}
                    border-[6px] border-[#27272a] rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col bg-[#09090b] transition-all duration-700 ease-in-out
                `}
            >
                {/* Browser Chrome */}
                <div className={`h-14 border-b border-[#27272a] px-8 flex items-center justify-between bg-[#18181b]`}>
                    <div className="flex gap-2.5" style={{paddingLeft: 10}}>
                        {previewDevice === 'desktop' && (
                            <>
                                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]/40" />
                                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]/40" />
                                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]/40" />
                            </>
                        )}
                        {previewDevice === 'mobile' && (
                            <div className="w-15 h-5 bg-black/40 rounded-full flex items-center justify-center">
                                <div className="w-8 h-1 bg-white/10 rounded-full" />
                            </div>
                        )}
                    </div>
                    <div className={`
                        px-6 py-2 rounded-full text-[12px] font-bold w-[55%] flex items-center gap-3 truncate shadow-inner bg-[#09090b] text-slate-400 border border-[#27272a]
                    `} style={{padding: "5px 10px"}}>
                        <Globe size={12} className="text-accent" />
                        {config.previewUrl || 'localhost:3000'}
                    </div>
                    <div className="flex gap-5">
                    </div>
                </div>

                <div className="flex-1 relative overflow-hidden">
                    {/* THE BUTTON - interactive, absolute to the inner frame */}
                    <div className="absolute inset-0 z-50 pointer-events-none">
                        <div className="relative w-full h-full pointer-events-auto">
                            <FloatingSocialButton {...config} isAbsolute={true} />
                        </div>
                    </div>

                    <div className="w-full h-full overflow-scroll scrollbar-thin scrollbar-thumb-slate-800">
                        {config.previewUrl ? (
                            <iframe 
                                src={config.previewUrl} 
                                className="w-full h-full border-none bg-white min-h-[1000px] overflow-scroll"
                                title="Site Preview"
                                style={{overflow: 'scroll'}}
                            />
                        ) : (
                            <div className={`p-16 animate-in h-full flex flex-col items-center justify-center text-center bg-[#09090b]`}>
                                <div className="w-full max-w-2xl space-y-12">

                                    <div className="pt-12">
                                        Enter URL to preview live
                                    </div>
                                </div>
                                {/* Scroll Indicator simulation */}
                                <motion.div 
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-800"
                                >
                                    <MoveDown size={20} />
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </main>
    )
}
