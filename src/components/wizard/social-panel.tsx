'use client'

import { motion } from 'framer-motion'
import { Plus, Trash2, ExternalLink } from 'lucide-react'
import { WizardConfig, PLATFORM_OPTIONS, SocialLink } from './types'

interface SocialPanelProps {
    config: WizardConfig
    updateConfig: (key: keyof WizardConfig, value: any) => void
    updateSocialLink: (index: number, field: keyof SocialLink, value: string) => void
    removeSocialLink: (index: number) => void
    addSocialLink: () => void
}

export function SocialPanel({ config, updateConfig, updateSocialLink, removeSocialLink, addSocialLink }: SocialPanelProps) {
    return (
        <motion.div 
            key="social"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
        >
            <div className="flex items-center justify-between mb-8" style={{padding: 12}}>
                <h3 className="panel-section-title mb-0">Target Destinations</h3>
                <button onClick={addSocialLink} className="p-2 rounded-full bg-accent text-white shadow-lg shadow-accent/20 hover:scale-110 active:scale-95 transition-all">
                    <Plus size={18} />
                </button>
            </div>

            <div className="flex flex-col gap-4" style={{padding: 15}}>
                {config.socialLinks.map((link, idx) => (
                    <div key={idx} className="link-card border-none bg-bg-subtle/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm transition-all hover:bg-bg-subtle hover:shadow-md animate-in" style={{ animationDelay: `${idx * 50}ms` }}>
                        <div className="link-card-header mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 text-accent group">
                                    {PLATFORM_OPTIONS.find(p => p.value === link.platform)?.label.charAt(0)}
                                </div>
                                <select 
                                    className="bg-transparent border-none text-primary font-bold text-[13px] py-0 outline-none cursor-pointer hover:text-accent transition-colors"
                                    value={link.platform}
                                    onChange={(e) => updateSocialLink(idx, 'platform', e.target.value as any)}
                                >
                                    {PLATFORM_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-bg text-text-primary">{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                onClick={() => removeSocialLink(idx)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-error/10 text-text-muted hover:text-error transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/40 hidden md:block">
                                    {/* <ExternalLink size={12} /> */}
                                </div>
                                <input 
                                    className="w-full bg-bg-raised border border-border rounded-xl pl-9 pr-4 py-2.5 text-xs outline-none focus:border-accent transition-all" 
                                    placeholder="Paste destination URL..."
                                    value={link.url}
                                    onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
                                    style={{padding: 6}}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-10" style={{padding: 7}}>
                <div className="space-y-4 bg-bg-subtle/30 p-4 grid gap-4 rounded-3xl border border-dashed border-border" style={{padding: 10}}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-text-primary">Show Labels</span>
                            <span className="text-[10px] text-text-muted opacity-60">Display platform names</span>
                        </div>
                        <button 
                            className={`toggle ${config.showLabels ? 'on' : ''}`}
                            onClick={() => updateConfig('showLabels', !config.showLabels)}
                        >
                            <div className="toggle-thumb" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-text-primary">Brand Colors</span>
                            <span className="text-[10px] text-text-muted opacity-60">Use brand colors</span>
                        </div>
                        <button 
                            className={`toggle ${config.brandColors ? 'on' : ''}`}
                            onClick={() => updateConfig('brandColors', !config.brandColors)}
                        >
                            <div className="toggle-thumb" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
