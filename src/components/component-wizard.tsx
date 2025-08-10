'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingSocialButton } from './floating-chat-button'
import { Palette, Settings, Eye, Code, Download, Plus, Trash2, Sparkles } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

interface SocialLink {
    platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'youtube' | 'github' | 'whatsapp' | 'email' | 'phone'
    url: string
    label: string
}

interface WizardConfig {
    size: 'sm' | 'md' | 'lg' | 'xl'
    position: 'bottom-right' | 'bottom-left'
    color: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'orange' | 'teal' | 'custom'
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
}

const tabs = [
    { id: 'style', label: 'Style', icon: Palette },
    { id: 'social', label: 'Social Links', icon: Settings },
    { id: 'code', label: 'Code', icon: Code },
]

const platformOptions = [
    { value: 'instagram', label: 'Instagram', color: 'from-pink-500 to-purple-600' },
    { value: 'twitter', label: 'Twitter', color: 'from-blue-400 to-blue-600' },
    { value: 'facebook', label: 'Facebook', color: 'from-blue-600 to-blue-800' },
    { value: 'linkedin', label: 'LinkedIn', color: 'from-blue-500 to-blue-700' },
    { value: 'youtube', label: 'YouTube', color: 'from-red-500 to-red-700' },
    { value: 'github', label: 'GitHub', color: 'from-gray-700 to-gray-900' },
    { value: 'whatsapp', label: 'WhatsApp', color: 'from-green-500 to-green-700' },
    { value: 'email', label: 'Email', color: 'from-indigo-500 to-indigo-700' },
    { value: 'phone', label: 'Phone', color: 'from-emerald-500 to-emerald-700' },
]

const toggleIconOptions = [
    { value: 'share', label: 'Share', icon: '📤' },
    { value: 'message', label: 'Message', icon: '💬' },
    { value: 'zap', label: 'Zap', icon: '⚡' },
    { value: 'sparkles', label: 'Sparkles', icon: '✨' },
    { value: 'grid', label: 'Grid', icon: '⚏' },
]

export function ComponentWizard() {
    const [activeTab, setActiveTab] = useState('style')
    const [config, setConfig] = useState<WizardConfig>({
        size: 'md',
        position: 'bottom-right',
        color: 'accent',
        customColors: {
            primary: '#6366f1',
            secondary: '#4f46e5',
            hover: '#4338ca'
        },
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com/yourhandle', label: 'Instagram' },
            { platform: 'twitter', url: 'https://twitter.com/yourhandle', label: 'Twitter' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' }
        ],
        showLabels: false,
        animationStyle: 'stack',
        toggleIcon: 'share',
        brandColors: false
    })

    const updateConfig = (key: keyof WizardConfig, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    const updateCustomColor = (colorKey: 'primary' | 'secondary' | 'hover', value: string) => {
        setConfig(prev => ({
            ...prev,
            customColors: {
                ...prev.customColors,
                [colorKey]: value
            }
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

    const removeSocialLink = (index: number) => {
        setConfig(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter((_, i) => i !== index)
        }))
    }

    const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
        setConfig(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            )
        }))
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

        const sizeCode = typeof config.size === 'number' ? config.size : `"${config.size}"`

        return `<FloatingSocialButton
  size={${sizeCode}}
  position="${config.position}"
  color="${config.color}"${customColorsCode}
  socialLinks={[
${socialLinksCode}
  ]}
  showLabels={${config.showLabels}}
  animationStyle="${config.animationStyle}"
  toggleIcon="${config.toggleIcon}"
  brandColors={${config.brandColors}}
/>`
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-full blur-3xl animate-morph"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-info/20 to-teal-500/20 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent/10 to-info/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Header with glassmorphism */}
            <div className="relative z-10 backdrop-blur-xl bg-surface/80 border-b border-border/50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-accent via-accent-light to-accent-dark rounded-2xl flex items-center justify-center shadow-lg animate-float">
                                    <Palette className="w-7 h-7 text-white" />
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-accent to-accent-dark rounded-2xl blur opacity-30 animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground-secondary bg-clip-text text-transparent">
                                    Two Tap
                                </h1>
                                <p className="text-sm md:text-base text-foreground-secondary mt-1">Create stunning floating social buttons with advanced customization</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-3 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl glass-button magnetic-hover"
                            >
                                <Download className="w-5 h-5" />
                                <span className="font-medium">Export Code</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-12">
                    {/* Configuration Panel */}
                    <div className="xl:col-span-2">
                        <div className="glass-card backdrop-blur-xl bg-surface/90 border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
                            {/* Enhanced Tabs */}
                            <div className="flex border-b border-border/30 bg-gradient-to-r from-surface-elevated/50 to-surface/50">
                                {tabs.map((tab, index) => (
                                    <motion.button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-3 px-8 py-6 transition-all duration-300 relative flex-1 ${activeTab === tab.id
                                            ? 'text-accent bg-gradient-to-br from-accent/10 to-accent/5'
                                            : 'text-foreground-secondary hover:text-foreground hover:bg-surface-elevated/50'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className={`p-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-accent/20 text-accent'
                                            : 'bg-surface-elevated text-foreground-muted'
                                            }`}>
                                            <tab.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-semibold">{tab.label}</span>
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-light rounded-t-full"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent rounded-lg"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Enhanced Tab Content */}
                            <div className="p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {activeTab === 'style' && (
                                            <div className="space-y-6">
                                                {/* Flexible Size Control */}
                                                <div className="space-y-4">
                                                    <label className="block text-lg font-semibold text-foreground mb-4">Button Size</label>

                                                    {/* Preset Sizes */}
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                        {(['sm', 'md', 'lg', 'xl'] as const).map((sizeOption) => (
                                                            <motion.button
                                                                key={sizeOption}
                                                                onClick={() => updateConfig('size', sizeOption)}
                                                                className={`px-6 py-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium relative overflow-hidden ${config.size === sizeOption
                                                                    ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 text-accent shadow-lg'
                                                                    : 'border-border hover:border-accent/50 hover:bg-surface-elevated text-foreground-secondary hover:text-foreground'
                                                                    }`}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <div className="flex flex-col items-center space-y-2">
                                                                    <div className={`rounded-full bg-current ${sizeOption === 'sm' ? 'w-3 h-3' :
                                                                        sizeOption === 'md' ? 'w-4 h-4' :
                                                                            sizeOption === 'lg' ? 'w-5 h-5' : 'w-6 h-6'
                                                                        }`}></div>
                                                                    <span>{sizeOption.toUpperCase()}</span>
                                                                </div>
                                                                {config.size === sizeOption && (
                                                                    <motion.div
                                                                        className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent rounded-xl"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    />
                                                                )}
                                                            </motion.button>
                                                        ))}
                                                    </div>


                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-foreground mb-3">Position</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {(['bottom-right', 'bottom-left'] as const).map((position) => (
                                                            <button
                                                                key={position}
                                                                onClick={() => updateConfig('position', position)}
                                                                className={`px-4 py-2 rounded-lg border transition-colors text-sm ${config.position === position
                                                                    ? 'border-accent bg-accent-muted text-accent'
                                                                    : 'border-border hover:border-accent hover:bg-muted'
                                                                    }`}
                                                            >
                                                                {position.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-foreground mb-3">Animation Style</label>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {(['fan', 'stack', 'grid'] as const).map((style) => (
                                                            <button
                                                                key={style}
                                                                onClick={() => updateConfig('animationStyle', style)}
                                                                className={`px-4 py-2 rounded-lg border transition-colors text-sm ${config.animationStyle === style
                                                                    ? 'border-accent bg-accent-muted text-accent'
                                                                    : 'border-border hover:border-accent hover:bg-muted'
                                                                    }`}
                                                            >
                                                                {style.charAt(0).toUpperCase() + style.slice(1)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-foreground mb-3">Toggle Icon</label>
                                                    <div className="grid grid-cols-4 gap-3">
                                                        {toggleIconOptions.map((icon) => (
                                                            <button
                                                                key={icon.value}
                                                                onClick={() => updateConfig('toggleIcon', icon.value)}
                                                                className={`px-3 py-2 rounded-lg border transition-colors text-sm flex items-center justify-center ${config.toggleIcon === icon.value
                                                                    ? 'border-accent bg-accent-muted text-accent'
                                                                    : 'border-border hover:border-accent hover:bg-muted'
                                                                    }`}
                                                            >
                                                                <span className="mr-2">{icon.icon}</span>
                                                                {icon.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Enhanced Color Theme */}
                                                <div className="space-y-6">
                                                    <label className="block text-lg font-semibold text-foreground mb-4">Color Theme</label>
                                                    <div className="grid grid-cols-5 gap-4">
                                                        {(['accent', 'success', 'warning', 'error', 'info', 'purple', 'pink', 'orange', 'teal', 'custom'] as const).map((color) => (
                                                            <motion.button
                                                                key={color}
                                                                onClick={() => updateConfig('color', color)}
                                                                className={`relative w-16 h-16 rounded-2xl border-3 transition-all duration-300 ${config.color === color
                                                                    ? 'border-foreground scale-110 shadow-xl'
                                                                    : 'border-border hover:scale-105 hover:shadow-lg'
                                                                    } ${color === 'accent' ? 'bg-gradient-to-br from-accent to-accent-dark' :
                                                                        color === 'success' ? 'bg-gradient-to-br from-success to-success-dark' :
                                                                            color === 'warning' ? 'bg-gradient-to-br from-warning to-warning-dark' :
                                                                                color === 'error' ? 'bg-gradient-to-br from-error to-error-dark' :
                                                                                    color === 'info' ? 'bg-gradient-to-br from-info to-info-dark' :
                                                                                        color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-700' :
                                                                                            color === 'pink' ? 'bg-gradient-to-br from-pink-500 to-pink-700' :
                                                                                                color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-700' :
                                                                                                    color === 'teal' ? 'bg-gradient-to-br from-teal-500 to-teal-700' :
                                                                                                        'bg-gradient-to-br from-purple-500 to-pink-500'
                                                                    }`}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                {config.color === color && (
                                                                    <motion.div
                                                                        className="absolute inset-0 rounded-2xl bg-white/20"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    />
                                                                )}
                                                                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground-secondary capitalize">
                                                                    {color}
                                                                </span>
                                                            </motion.button>
                                                        ))}
                                                    </div>

                                                    {/* Brand Colors Toggle */}
                                                    <div className="p-6 bg-gradient-to-br from-surface-elevated/50 to-surface/50 rounded-xl border border-border/30">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-semibold text-foreground">Brand Colors</h4>
                                                                <p className="text-sm text-foreground-secondary mt-1">Use authentic social media brand colors</p>
                                                            </div>
                                                            <motion.button
                                                                onClick={() => updateConfig('brandColors', !config.brandColors)}
                                                                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${config.brandColors
                                                                    ? 'bg-gradient-to-r from-accent to-accent-dark'
                                                                    : 'bg-surface-elevated border border-border'
                                                                    }`}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <motion.div
                                                                    className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ${config.brandColors
                                                                        ? 'left-7 bg-white shadow-lg'
                                                                        : 'left-1 bg-foreground-muted'
                                                                        }`}
                                                                    animate={{ x: config.brandColors ? 0 : 0 }}
                                                                />
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {config.color === 'custom' && (
                                                    <div className="bg-muted rounded-lg p-4 space-y-4">
                                                        <h4 className="font-medium text-foreground">Custom Colors</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-medium text-foreground-secondary mb-2">Primary Color</label>
                                                                <div className="flex items-center space-x-2">
                                                                    <input
                                                                        type="color"
                                                                        value={config.customColors.primary}
                                                                        onChange={(e) => updateCustomColor('primary', e.target.value)}
                                                                        className="w-10 h-10 rounded border border-border cursor-pointer"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={config.customColors.primary}
                                                                        onChange={(e) => updateCustomColor('primary', e.target.value)}
                                                                        className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium text-foreground-secondary mb-2">Secondary Color</label>
                                                                <div className="flex items-center space-x-2">
                                                                    <input
                                                                        type="color"
                                                                        value={config.customColors.secondary}
                                                                        onChange={(e) => updateCustomColor('secondary', e.target.value)}
                                                                        className="w-10 h-10 rounded border border-border cursor-pointer"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={config.customColors.secondary}
                                                                        onChange={(e) => updateCustomColor('secondary', e.target.value)}
                                                                        className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium text-foreground-secondary mb-2">Hover Color</label>
                                                                <div className="flex items-center space-x-2">
                                                                    <input
                                                                        type="color"
                                                                        value={config.customColors.hover}
                                                                        onChange={(e) => updateCustomColor('hover', e.target.value)}
                                                                        className="w-10 h-10 rounded border border-border cursor-pointer"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={config.customColors.hover}
                                                                        onChange={(e) => updateCustomColor('hover', e.target.value)}
                                                                        className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {activeTab === 'social' && (
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold text-foreground">Social Media Links</h3>
                                                    <motion.button
                                                        onClick={addSocialLink}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="flex items-center space-x-2 bg-accent hover:bg-accent-dark text-white px-3 py-2 rounded-lg transition-colors text-sm"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        <span>Add Link</span>
                                                    </motion.button>
                                                </div>

                                                <div className="space-y-4">
                                                    {config.socialLinks.map((link, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="bg-muted rounded-lg p-4 space-y-3"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="font-medium text-foreground">Link {index + 1}</h4>
                                                                <button
                                                                    onClick={() => removeSocialLink(index)}
                                                                    className="text-error hover:text-error/80 transition-colors"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                <div>
                                                                    <label className="block text-xs font-medium text-foreground-secondary mb-1">Platform</label>
                                                                    <select
                                                                        value={link.platform}
                                                                        onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                                                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                                                    >
                                                                        {platformOptions.map(option => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label className="block text-xs font-medium text-foreground-secondary mb-1">URL</label>
                                                                    <input
                                                                        type="url"
                                                                        value={link.url}
                                                                        onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                                                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                                                        placeholder="https://..."
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="block text-xs font-medium text-foreground-secondary mb-1">Label</label>
                                                                    <input
                                                                        type="text"
                                                                        value={link.label}
                                                                        onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                                                                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                                                        placeholder="Display name"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <label className="block text-sm font-medium text-foreground">Show Labels</label>
                                                        <p className="text-xs text-foreground-secondary mt-1">Display platform names next to icons</p>
                                                    </div>
                                                    <button
                                                        onClick={() => updateConfig('showLabels', !config.showLabels)}
                                                        className={`relative w-12 h-6 rounded-full transition-colors ${config.showLabels ? 'bg-accent' : 'bg-secondary'}`}
                                                    >
                                                        <motion.div
                                                            animate={{ x: config.showLabels ? 24 : 2 }}
                                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        )}



                                        {activeTab === 'code' && (
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-success to-success-dark rounded-lg flex items-center justify-center">
                                                            <Code className="w-4 h-4 text-white" />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-foreground">Generated Code</h3>
                                                    </div>
                                                    <motion.button
                                                        onClick={() => navigator.clipboard.writeText(generateCode())}
                                                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-success to-success-dark hover:from-success-dark hover:to-success text-white text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>Copy Code</span>
                                                    </motion.button>
                                                </div>

                                                <div className="relative">
                                                    <pre className="bg-gradient-to-br from-surface-elevated/50 to-muted/50 border border-border/30 rounded-xl p-6 overflow-x-auto text-sm shadow-inner">
                                                        <code className="text-foreground font-mono leading-relaxed">{generateCode()}</code>
                                                    </pre>
                                                    <div className="absolute top-4 right-4 flex space-x-2">
                                                        <div className="w-3 h-3 bg-error rounded-full"></div>
                                                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                                                        <div className="w-3 h-3 bg-success rounded-full"></div>
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-gradient-to-br from-info/10 to-info/5 rounded-xl border border-info/20">
                                                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                                        <div className="w-5 h-5 bg-info rounded-full flex items-center justify-center mr-2">
                                                            <span className="text-white text-xs">i</span>
                                                        </div>
                                                        Installation Instructions
                                                    </h4>
                                                    <div className="space-y-3 text-sm text-foreground-secondary">
                                                        <div>
                                                            <p className="font-medium text-foreground mb-1">1. Install dependencies:</p>
                                                            <code className="bg-surface-elevated px-3 py-1 rounded text-xs font-mono">
                                                                npm install framer-motion lucide-react
                                                            </code>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-foreground mb-1">2. Copy the component code above</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-foreground mb-1">3. Import and use in your React component:</p>
                                                            <code className="bg-surface-elevated px-3 py-1 rounded text-xs font-mono">
                                                                import {`{FloatingSocialButton}`} from './components/floating-social-button'
                                                            </code>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Preview Panel */}
                    <div className="xl:col-span-1">
                        <div className="glass-card backdrop-blur-xl bg-surface/90 border border-border/50 rounded-2xl p-8 sticky top-8 shadow-2xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center">
                                    <Eye className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Live Preview</h3>
                            </div>

                            <div className="relative bg-gradient-to-br from-surface-elevated/50 to-muted/50 rounded-2xl h-96 overflow-hidden border border-border/30 shadow-inner">
                                {/* Animated background pattern */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-4 left-4 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                                    <div className="absolute top-8 right-8 w-1 h-1 bg-info rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                    <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-success rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                                    <div className="absolute bottom-4 right-12 w-1 h-1 bg-warning rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-info/5 opacity-50" />
                                <div className="absolute inset-6 border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Sparkles className="w-6 h-6 text-accent" />
                                        </div>
                                        <p className="text-foreground-secondary text-sm">
                                            Interactive preview
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Enhanced Configuration Display */}
                            <div className="mt-6 p-6 bg-gradient-to-br from-surface-elevated/30 to-surface/30 rounded-xl border border-border/30">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Settings className="w-4 h-4 text-accent" />
                                    <h4 className="font-semibold text-foreground">Configuration</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Size:</span>
                                        <span className="text-accent font-medium font-mono">
                                            {typeof config.size === 'number' ? `${config.size}px` : config.size.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Position:</span>
                                        <span className="text-accent font-medium capitalize">{config.position.replace('-', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Theme:</span>
                                        <span className="text-accent font-medium capitalize">{config.color}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Icon:</span>
                                        <span className="text-accent font-medium capitalize">{config.toggleIcon}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Animation:</span>
                                        <span className="text-accent font-medium capitalize">{config.animationStyle}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Links:</span>
                                        <span className="text-accent font-medium">{config.socialLinks.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Labels:</span>
                                        <span className="text-accent font-medium">{config.showLabels ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground-secondary">Brand Colors:</span>
                                        <span className="text-accent font-medium">{config.brandColors ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}