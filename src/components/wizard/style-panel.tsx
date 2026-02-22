'use client'

import { motion } from 'framer-motion'
import { Palette, Pipette, Share2, MessageCircle, Zap, Sparkles, Grid3X3, MoveDown } from 'lucide-react'
import { WizardConfig, COLOR_PRESETS } from './types'

interface StylePanelProps {
    config: WizardConfig
    updateConfig: (key: keyof WizardConfig, value: any) => void
    isEyeDropperSupported: boolean
    pickColor: () => void
}

export function StylePanel({ config, updateConfig, isEyeDropperSupported, pickColor }: StylePanelProps) {
    return (
        <motion.div 
            key="style"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
        >
            <div className="panel-section border-none p-0 mb-8">
                <h3 className="panel-section-title flex items-center gap-2">
                    <Palette size={14} className="text-accent" />
                    Visual Overrides
                </h3>
                
                <div className="field">
                    <label className="field-label">Scale Factor</label>
                    <div className="segment-group p-1.5 rounded-2xl">
                        {(['sm', 'md', 'lg', 'xl'] as const).map(s => (
                            <button 
                                key={s}
                                onClick={() => updateConfig('size', s)}
                                className={`segment-btn rounded-xl py-2 font-bold ${config.size === s ? 'active' : ''}`}
                            >
                                {s.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="field mt-8">
                    <label className="field-label flex justify-between items-center mb-3">
                        <span>Monotone Gradients</span>
                        <div className="flex items-center gap-2">
                            {isEyeDropperSupported && (
                                <button 
                                    onClick={pickColor}
                                    className="p-1.5 rounded-md hover:bg-accent/10 text-accent transition-colors"
                                    title="Pick color from screen"
                                >
                                    <Pipette size={14} />
                                </button>
                            )}
                            <span className="text-accent bg-accent/10 px-2 py-0.5 rounded text-[10px] font-black uppercase">{config.color}</span>
                        </div>
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                        {COLOR_PRESETS.map(p => (
                            <div 
                                key={p.id}
                                onClick={() => updateConfig('color', p.id)}
                                className={`swatch w-10 h-10 shadow-sm border-white ${config.color === p.id ? 'active' : ''}`}
                                style={{ 
                                    background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                                }}
                                title={p.label}
                            />
                        ))}
                        <div 
                            onClick={() => updateConfig('color', 'custom')}
                            className={`swatch w-10 h-10 flex items-center justify-center bg-white border-slate-200 ${config.color === 'custom' ? 'active shadow-lg' : ''}`}
                            style={{ background: config.color === 'custom' ? config.customColors.primary : undefined }}
                        >
                            <Palette size={16} className={config.color === 'custom' ? 'text-white' : 'text-slate-400'} />
                        </div>
                    </div>
                </div>

                {config.color === 'custom' && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0, scale: 0.95 }}
                        animate={{ height: 'auto', opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-bg-subtle/50 rounded-2xl border border-accent/20 border-dashed"
                    >
                        <label className="field-label mb-3">Custom Solid Signature</label>
                        <div className="flex gap-4 items-center">
                            <div className="relative group">
                                <input 
                                    type="color" 
                                    value={config.customColors.primary}
                                    onChange={(e) => updateConfig('customColors', { ...config.customColors, primary: e.target.value })}
                                    className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer overflow-hidden p-0"
                                />
                                <div className="absolute inset-0 pointer-events-none rounded-xl border border-white/20 shadow-inner" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <input 
                                    type="text"
                                    value={config.customColors.primary.toUpperCase()}
                                    onChange={(e) => updateConfig('customColors', { ...config.customColors, primary: e.target.value })}
                                    className="w-full bg-bg-raised border border-border rounded-xl px-4 py-2 text-sm font-mono focus:border-accent outline-none"
                                />
                                <div className="text-[10px] text-text-muted font-medium uppercase tracking-tighter">Enter HEX or pick manually</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="panel-section border-none p-0 mt-8">
                <h3 className="panel-section-title">Motion & Interaction</h3>
                <div className="field">
                    <label className="field-label">Context Icon</label>
                    <div className="option-grid option-grid-5 gap-3">
                        {[
                            { id: 'share', icon: Share2 },
                            { id: 'message', icon: MessageCircle },
                            { id: 'zap', icon: Zap },
                            { id: 'sparkles', icon: Sparkles },
                            { id: 'grid', icon: Grid3X3 },
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={() => updateConfig('toggleIcon', item.id)}
                                className={`option-btn w-full h-12 rounded-xl border-2 transition-all flex items-center justify-center ${config.toggleIcon === item.id ? 'active border-accent' : 'hover:scale-105 active:scale-95'}`}
                            >
                                <item.icon size={18} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="field mt-6">
                    <label className="field-label">Behavior</label>
                    <select 
                        className="input h-11 rounded-xl bg-bg-subtle border-none shadow-sm font-semibold"
                        value={config.animationStyle}
                        onChange={(e) => updateConfig('animationStyle', e.target.value)}
                    >
                        <option value="fan">Circular Expansion</option>
                        <option value="stack">Vertical Stack</option>
                        <option value="grid">Matrix Grid</option>
                    </select>
                </div>
            </div>

            <div className="panel-section border-none p-0 mt-8">
                <h3 className="panel-section-title">Deployment Layout</h3>
                <div className="field">
                    <div className="flex items-center justify-between p-4 bg-bg-subtle rounded-2xl mb-4">
                        <span className="field-label mb-0">Anchoring</span>
                        <div className="segment-group w-36 rounded-xl">
                            <button 
                                onClick={() => updateConfig('position', 'bottom-left')}
                                className={`segment-btn ${config.position === 'bottom-left' ? 'active' : ''}`}
                            >
                                Left
                            </button>
                            <button 
                                onClick={() => updateConfig('position', 'bottom-right')}
                                className={`segment-btn ${config.position === 'bottom-right' ? 'active' : ''}`}
                            >
                                Right
                            </button>
                        </div>
                    </div>
                </div>

                <div className="field mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <label className="field-label font-bold text-accent">Floor Offset</label>
                        <span className="text-accent bg-accent/10 px-3 py-1 rounded-full font-mono text-[11px] font-black">{config.bottomOffset}px</span>
                    </div>
                    <div className="flex items-center gap-4 px-2">
                        <MoveDown size={16} className="text-accent" />
                        <input 
                            type="range"
                            min="0"
                            max="200"
                            step="4"
                            value={config.bottomOffset}
                            onChange={(e) => updateConfig('bottomOffset', parseInt(e.target.value))}
                            className="flex-1 accent-accent h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
