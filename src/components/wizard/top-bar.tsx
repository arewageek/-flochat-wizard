'use client'

import { Globe, ArrowUpRight, Check, Download, Share2 } from 'lucide-react'
import { ThemeToggle } from '../theme-toggle'

interface TopBarProps {
    urlInput: string
    setUrlInput: (val: string) => void
    onUrlSubmit: (e: React.FormEvent) => void
    onCopyCode: () => void
    copied: boolean
}

export function TopBar({ urlInput, setUrlInput, onUrlSubmit, onCopyCode, copied }: TopBarProps) {
    return (
        <header className="app-topbar px-6">
            <div className="brand">
                <div className="brand-mark shadow-lg shadow-accent/40 ring-4 ring-accent/10">
                    <Share2 size={16} color="white" />
                </div>
                <div>
                    <div className="brand-name">Two Tap</div>
                    <div className="brand-tag">Premium Builder</div>
                </div>
            </div>
            
            <form onSubmit={onUrlSubmit} className="hidden lg:flex items-center gap-3 bg-bg-subtle border-2 border-border px-4 py-2 rounded-full w-[500px] focus-within:border-accent transition-all shadow-md group">
                <Globe size={16} className="text-text-muted group-focus-within:text-accent transition-colors px-2" style={{marginLeft: 7}} />
                <input 
                    className="bg-transparent border-none text-[14px] font-bold outline-none flex-1 py-3 placeholder:text-text-muted/40 placeholder:font-normal"
                    placeholder="Inspect another site: Enter URL..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    style={{
                        padding: "5px 10px"
                    }}
                />
                <button type="submit" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white bg-accent hover:bg-accent-hover px-5 py-2 rounded-full transition-all shadow-lg shadow-accent/20 active:scale-95 cursor-pointer" style={{
                    padding: "5px 10px"
                }}>
                    Load <ArrowUpRight size={16} />
                </button>
            </form>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="w-px h-6 bg-border mx-2" />
                <button onClick={onCopyCode} className="btn btn-primary btn-sm px-5 h-9 rounded-full shadow-lg shadow-accent/20 hover:shadow-accent/40">
                    {copied ? <Check size={14} /> : <Download size={14} />}
                    <span>{copied ? 'Copied' : 'Export'}</span>
                </button>
            </div>
        </header>
    )
}
