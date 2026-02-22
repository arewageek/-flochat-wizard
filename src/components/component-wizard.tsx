'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingSocialButton } from './floating-chat-button'
import { 
    Palette, 
    Settings, 
    Eye, 
    Code, 
    Download, 
    Plus, 
    Trash2, 
    Sparkles, 
    Layout, 
    MousePointer2,
    Copy,
    Check,
    Type,
    Share2,
    MessageCircle,
    Zap,
    Grid3X3,
    Globe,
    Maximize2,
    MoveDown,
    Pipette,
    Moon,
    Sun,
    ExternalLink,
    RefreshCw,
    Smartphone,
    Monitor as MonitorIcon,
    ArrowUpRight
} from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

interface SocialLink {
    platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'youtube' | 'github' | 'whatsapp' | 'email' | 'phone'
    url: string
    label: string
}

interface WizardConfig {
    size: 'sm' | 'md' | 'lg' | 'xl'
    position: 'bottom-right' | 'bottom-left'
    bottomOffset: number
    color: string
    customColors: {
        primary: string
        secondary: string
        hover: string
    }
    socialLinks: SocialLink[]
    showLabels: boolean
    animationStyle: 'fan' | 'stack' | 'grid'
    toggleIcon: 'share' | 'message' | 'zap' | 'sparkles' | 'grid'
    brandColors: boolean
    previewUrl: string
}

const COLOR_PRESETS = [
    { id: 'blue', label: 'Azure', from: '#1E40AF', to: '#3B82F6' },
    { id: 'emerald', label: 'Forest', from: '#065F46', to: '#10B981' },
    { id: 'rose', label: 'Savage', from: '#9F1239', to: '#F43F5E' },
    { id: 'amber', label: 'Sunlight', from: '#92400E', to: '#F59E0B' },
    { id: 'violet', label: 'Cosmos', from: '#5B21B6', to: '#8B5CF6' },
    { id: 'indigo', label: 'Electric', from: '#3730A3', to: '#6366F1' },
    { id: 'cyan', label: 'Ice', from: '#0E7490', to: '#06B6D4' },
    { id: 'slate', label: 'Steel', from: '#1E293B', to: '#475569' },
    { id: 'orange', label: 'Fire', from: '#9A3412', to: '#F97316' },
    { id: 'pink', label: 'Neon', from: '#9D174D', to: '#EC4899' },
    { id: 'teal', label: 'Lagoon', from: '#0D9488', to: '#2DD4BF' },
    { id: 'lime', label: 'Acid', from: '#4D7C0F', to: '#A3E635' },
    { id: 'gold', label: 'Midas', from: '#A16207', to: '#EAB308' },
    { id: 'crimson', label: 'Blood', from: '#991B1B', to: '#EF4444' },
    { id: 'fuchsia', label: 'Cyber', from: '#86198F', to: '#E879F9' },
]

const PLATFORM_OPTIONS = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'github', label: 'GitHub' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
]

export function ComponentWizard() {
    const [activeSidebar, setActiveSidebar] = useState<'style' | 'social' | 'code'>('style')
    const [copied, setCopied] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
    const [isEyeDropperSupported, setIsEyeDropperSupported] = useState(false)
    
    useEffect(() => {
        setMounted(true)
        setIsEyeDropperSupported('EyeDropper' in window)
    }, [])

    const [config, setConfig] = useState<WizardConfig>({
        size: 'md',
        position: 'bottom-right',
        bottomOffset: 32,
        color: 'blue',
        customColors: {
            primary: '#1E40AF',
            secondary: '#3B82F6',
            hover: '#1D4ED8'
        },
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com/yourhandle', label: 'Instagram' },
            { platform: 'twitter', url: 'https://twitter.com/yourhandle', label: 'Twitter' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' }
        ],
        showLabels: false,
        animationStyle: 'stack',
        toggleIcon: 'share',
        brandColors: false,
        previewUrl: ''
    })

    const updateConfig = (key: keyof WizardConfig, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
        setConfig(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            )
        }))
    }

    const removeSocialLink = (index: number) => {
        setConfig(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter((_, i) => i !== index)
        }))
    }

    const addSocialLink = () => {
        const newLink: SocialLink = {
            platform: 'instagram',
            url: 'https://instagram.com/yourhandle',
            label: 'Instagram'
        }
        setConfig(prev => ({
            ...prev,
            socialLinks: [...prev.socialLinks, newLink]
        }))
    }

    const copyCode = () => {
        navigator.clipboard.writeText(generateCode())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        let url = urlInput.trim()
        if (url && !url.startsWith('http')) {
            url = 'https://' + url
        }
        updateConfig('previewUrl', url)
    }

    const pickColor = async () => {
        if (!isEyeDropperSupported) return
        try {
            // @ts-ignore
            const eyeDropper = new EyeDropper()
            const result = await eyeDropper.open()
            updateConfig('color', 'custom')
            updateConfig('customColors', { ...config.customColors, primary: result.sRGBHex })
        } catch (e) {
            console.error('Color picker failed', e)
        }
    }

    const generateCode = () => {
        const socialLinksCode = config.socialLinks.map(link =>
            `    { platform: '${link.platform}', url: '${link.url}', label: '${link.label}' }`
        ).join(',\n')

        const customColorsCode = config.color === 'custom' ? `
  customColors={{
    primary: '${config.customColors.primary}',
    secondary: '${config.customColors.secondary}',
    hover: '${config.customColors.hover}'
  }}` : ''

        return `import { FloatingSocialButton } from './components/floating-social-button'

export default function MyPage() {
  return (
    <FloatingSocialButton
      size="${config.size}"
      position="${config.position}"
      bottomOffset={${config.bottomOffset}}
      color="${config.color}"${customColorsCode}
      socialLinks={[
    ${socialLinksCode}
      ]}
      showLabels={${config.showLabels}}
      animationStyle="${config.animationStyle}"
      toggleIcon="${config.toggleIcon}"
      brandColors={${config.brandColors}}
    />
  )
}`
    }

    if (!mounted) return null

    return (
        <>
            {/* Topbar */}
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
                
                <form onSubmit={handleUrlSubmit} className="hidden lg:flex items-center gap-3 bg-bg-subtle border-2 border-border px-4 py-2 rounded-full w-[500px] focus-within:border-accent transition-all shadow-md group">
                    <Globe size={16} className="text-text-muted group-focus-within:text-accent transition-colors" />
                    <input 
                        className="bg-transparent border-none text-[14px] font-bold outline-none flex-1 py-0.5 placeholder:text-text-muted/40 placeholder:font-normal"
                        placeholder="Inspect another site: Enter URL..."
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <button type="submit" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white bg-accent hover:bg-accent-hover px-5 py-2 rounded-full transition-all shadow-lg shadow-accent/20 active:scale-95">
                        Load <ArrowUpRight size={14} />
                    </button>
                </form>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="w-px h-6 bg-border mx-2" />
                    <button onClick={copyCode} className="btn btn-primary btn-sm px-5 h-9 rounded-full shadow-lg shadow-accent/20 hover:shadow-accent/40">
                        {copied ? <Check size={14} /> : <Download size={14} />}
                        <span>{copied ? 'Copied' : 'Export'}</span>
                    </button>
                </div>
            </header>

            {/* Main Sidebar */}
            <aside className="app-sidebar py-8">
                <div className="sidebar-section-label px-6">Workshop</div>
                <nav className="mt-2">
                    <div 
                        className={`sidebar-item mx-3 rounded-xl mb-1 ${activeSidebar === 'style' ? 'active' : ''}`}
                        onClick={() => setActiveSidebar('style')}
                    >
                        <Palette className="sidebar-icon" />
                        <span>Visual Identity</span>
                    </div>
                    <div 
                        className={`sidebar-item mx-3 rounded-xl mb-1 ${activeSidebar === 'social' ? 'active' : ''}`}
                        onClick={() => setActiveSidebar('social')}
                    >
                        <Settings className="sidebar-icon" />
                        <span>Platforms</span>
                    </div>
                    <div 
                        className={`sidebar-item mx-3 rounded-xl mb-1 ${activeSidebar === 'code' ? 'active' : ''}`}
                        onClick={() => setActiveSidebar('code')}
                    >
                        <Code className="sidebar-icon" />
                        <span>Integration</span>
                    </div>
                </nav>
            </aside>

            {/* Canvas / Preview - FORCED DARK MODE */}
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

                <div className="absolute top-6 right-8 flex items-center gap-3 z-20">
                    <div className="canvas-label static transform-none px-4 py-2 bg-[#18181b] border-[#27272a] text-slate-400 font-black tracking-widest text-[9px]">DARK MODE PREVIEW</div>
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
                        <div className="flex gap-2.5">
                            {previewDevice === 'desktop' && (
                                <>
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]/40" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]/40" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]/40" />
                                </>
                            )}
                            {previewDevice === 'mobile' && (
                                <div className="w-20 h-5 bg-black/40 rounded-full flex items-center justify-center">
                                    <div className="w-8 h-1 bg-white/10 rounded-full" />
                                </div>
                            )}
                        </div>
                        <div className={`
                            px-6 py-2 rounded-full text-[12px] font-bold w-[55%] flex items-center gap-3 truncate shadow-inner bg-[#09090b] text-slate-400 border border-[#27272a]
                        `}>
                            <Globe size={12} className="text-accent" />
                            {config.previewUrl || 'preview-environment.local'}
                        </div>
                        <div className="flex gap-5">
                            <RefreshCw size={14} className="text-slate-500 hover:text-accent transition-colors" />
                            <ExternalLink size={14} className="text-slate-500 hover:text-accent transition-colors" />
                        </div>
                    </div>

                    <div className="flex-1 relative overflow-hidden">
                        {/* THE BUTTON - interactive, absolute to the inner frame */}
                        <div className="absolute inset-0 z-50 pointer-events-none">
                            <div className="relative w-full h-full pointer-events-auto">
                                <FloatingSocialButton {...config} isAbsolute={true} />
                            </div>
                        </div>

                        <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800">
                            {config.previewUrl ? (
                                <iframe 
                                    src={config.previewUrl} 
                                    className="w-full h-full border-none bg-white min-h-[1000px]"
                                    title="Site Preview"
                                    scrolling="yes"
                                />
                            ) : (
                                <div className={`p-16 animate-in h-full flex flex-col items-center justify-center text-center bg-[#09090b]`}>
                                    <div className="w-full max-w-2xl space-y-12">
                                        <div className="space-y-4">
                                            <div className="w-48 h-10 rounded-full bg-slate-800/20 mx-auto border border-slate-800/40" />
                                            <div className="w-full h-1 text-slate-800/10 bg-slate-800/10 rounded-full" />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-8 rounded-[2rem] bg-[#18181b] border border-[#27272a] text-left border-dashed">
                                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                                                    <Layout size={24} />
                                                </div>
                                                <h4 className="text-slate-300 font-bold mb-2">Interface Simulation</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed">Use the device controls at the top to toggle between phone and computer views.</p>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-[#18181b] border border-[#27272a] text-left border-dashed">
                                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                                                    <MousePointer2 size={24} />
                                                </div>
                                                <h4 className="text-slate-300 font-bold mb-2">Live Interaction</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed">Click the button below to test animations, links, and branding in real-time.</p>
                                            </div>
                                        </div>

                                        <div className="pt-12">
                                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 border border-slate-800">
                                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Awaiting URL Injection</span>
                                            </div>
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

            {/* Settings Panel (Right) */}
            <section className="app-panel p-8">
                <AnimatePresence mode="wait">
                    {activeSidebar === 'style' && (
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
                                                className={`option-btn w-full h-12 rounded-xl border-2 transition-all ${config.toggleIcon === item.id ? 'active border-accent' : 'hover:scale-105 active:scale-95'}`}
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
                    )}

                    {activeSidebar === 'social' && (
                        <motion.div 
                            key="social"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="panel-section-title mb-0">Target Destinations</h3>
                                <button onClick={addSocialLink} className="p-2 rounded-full bg-accent text-white shadow-lg shadow-accent/20 hover:scale-110 active:scale-95 transition-all">
                                    <Plus size={18} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
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
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/40">
                                                    <ExternalLink size={12} />
                                                </div>
                                                <input 
                                                    className="w-full bg-bg-raised border border-border rounded-xl pl-9 pr-4 py-2.5 text-xs outline-none focus:border-accent transition-all" 
                                                    placeholder="Paste destination URL..."
                                                    value={link.url}
                                                    onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-10">
                                <div className="space-y-4 bg-bg-subtle/30 p-4 rounded-3xl border border-dashed border-border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-text-primary">Helper Labels</span>
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
                                            <span className="text-xs font-bold text-text-primary">Native Branding</span>
                                            <span className="text-[10px] text-text-muted opacity-60">Inherit brand colors</span>
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
                    )}

                    {activeSidebar === 'code' && (
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
                                    <button onClick={copyCode} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all">
                                        {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <pre className="text-white selection:bg-accent/30 overflow-x-auto">
                                    <code className="text-[11px] leading-[1.8] font-mono opacity-90">{generateCode()}</code>
                                </pre>
                            </div>

                            <div className="mt-10 p-6 bg-accent rounded-[2rem] text-white shadow-xl shadow-accent/30">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                                        <Sparkles size={24} />
                                    </div>
                                    <h4 className="font-bold text-lg leading-tight">Optimization Complete</h4>
                                </div>
                                <p className="text-sm opacity-80 leading-relaxed mb-6">
                                    Your contact widget has been compiled with zero dependencies and high-conversion motion patterns.
                                </p>
                                <button className="w-full py-4 rounded-2xl bg-white text-accent font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                                    Download Bundle
                                </button>
                            </div>

                            <p className="text-center mt-8 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40">
                                Powered by Two Tap Core
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    )
}