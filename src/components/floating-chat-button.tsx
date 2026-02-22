'use client'

import { Share2, X, Instagram, Twitter, Facebook, Linkedin, Youtube, Github, MessageCircle, Mail, Phone, Zap, Sparkles, Grid3X3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface SocialLink {
    platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'youtube' | 'github' | 'whatsapp' | 'email' | 'phone'
    url: string
    label: string
}

interface FloatingSocialButtonProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    position?: 'bottom-right' | 'bottom-left'
    bottomOffset?: number
    color?: string // preset name or 'custom'
    customColors?: {
        primary: string
        secondary: string
        hover: string
    }
    socialLinks?: SocialLink[]
    showLabels?: boolean
    animationStyle?: 'fan' | 'stack' | 'grid'
    toggleIcon?: 'share' | 'message' | 'zap' | 'sparkles' | 'grid'
    brandColors?: boolean
    isAbsolute?: boolean
}

const SIZE_MAP = {
    sm: { button: 'w-10 h-10', icon: 16, social: 14 },
    md: { button: 'w-12 h-12', icon: 20, social: 16 },
    lg: { button: 'w-14 h-14', icon: 24, social: 18 },
    xl: { button: 'w-16 h-16', icon: 28, social: 20 }
}

const COLOR_PRESETS: Record<string, { from: string, to: string }> = {
    blue: { from: '#1E40AF', to: '#3B82F6' },
    emerald: { from: '#065F46', to: '#10B981' },
    rose: { from: '#9F1239', to: '#F43F5E' },
    amber: { from: '#92400E', to: '#F59E0B' },
    violet: { from: '#5B21B6', to: '#8B5CF6' },
    indigo: { from: '#3730A3', to: '#6366F1' },
    cyan: { from: '#0E7490', to: '#06B6D4' },
    slate: { from: '#1E293B', to: '#475569' },
    orange: { from: '#9A3412', to: '#F97316' },
    pink: { from: '#9D174D', to: '#EC4899' },
    teal: { from: '#0D9488', to: '#2DD4BF' },
    lime: { from: '#4D7C0F', to: '#A3E635' },
    gold: { from: '#A16207', to: '#EAB308' },
    crimson: { from: '#991B1B', to: '#EF4444' },
    fuchsia: { from: '#86198F', to: '#E879F9' },
}

const PLATFORM_MAP = {
    instagram: { icon: Instagram, color: '#E4405F' },
    twitter: { icon: Twitter, color: '#1DA1F2' },
    facebook: { icon: Facebook, color: '#1877F2' },
    linkedin: { icon: Linkedin, color: '#0A66C2' },
    youtube: { icon: Youtube, color: '#FF0000' },
    github: { icon: Github, color: '#181717' },
    whatsapp: { icon: MessageCircle, color: '#25D366' },
    email: { icon: Mail, color: '#EA4335' },
    phone: { icon: Phone, color: '#34A853' }
}

const TOGGLE_ICONS = {
    share: Share2,
    message: MessageCircle,
    zap: Zap,
    sparkles: Sparkles,
    grid: Grid3X3
}

export function FloatingSocialButton({
    size = 'md',
    position = 'bottom-right',
    bottomOffset = 32,
    color = 'blue',
    customColors,
    socialLinks = [],
    showLabels = false,
    animationStyle = 'stack',
    toggleIcon = 'share',
    brandColors = false,
    isAbsolute = false
}: FloatingSocialButtonProps) {
    const [isOpen, setIsOpen] = useState(false)

    const IconComponent = TOGGLE_ICONS[toggleIcon]
    const currentSize = SIZE_MAP[size]

    const getButtonStyle = (presetKey: string, isCustom: boolean) => {
        if (isCustom && customColors) {
            return { backgroundColor: customColors.primary }
        }
        const preset = COLOR_PRESETS[presetKey] || COLOR_PRESETS.blue
        return {
            background: `linear-gradient(135deg, ${preset.from}, ${preset.to})`
        }
    }

    const getPosition = (index: number, total: number) => {
        const offset = 60 + (index * 54)
        if (animationStyle === 'stack') return { x: 0, y: -offset }
        if (animationStyle === 'fan') {
            const angle = (Math.PI / 2.5) * (index / (Math.max(1, total - 1)))
            const radius = 80
            return { 
                x: (position === 'bottom-right' ? -1 : 1) * Math.sin(angle) * radius, 
                y: -Math.cos(angle) * radius 
            }
        }
        if (animationStyle === 'grid') {
            const row = Math.floor(index / 2)
            const col = index % 2
            return {
                x: (position === 'bottom-right' ? -1 : 1) * (col * 54),
                y: -(row + 1) * 54
            }
        }
        return { x: 0, y: 0 }
    }

    return (
        <div 
            className={`${isAbsolute ? 'absolute' : 'fixed'} z-[9999] ${position === 'bottom-right' ? 'right-8' : 'left-8'}`}
            style={{ bottom: `${bottomOffset}px` }}
        >
            <AnimatePresence>
                {isOpen && socialLinks.map((link, index) => {
                    const platform = PLATFORM_MAP[link.platform]
                    const SocialIcon = platform.icon
                    const { x, y } = getPosition(index, socialLinks.length)

                    return (
                        <motion.div
                            key={`${link.platform}-${index}`}
                            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                            animate={{ opacity: 1, scale: 1, x, y }}
                            exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25, delay: index * 0.05 }}
                            className="absolute flex items-center"
                            style={{ 
                                left: position === 'bottom-left' ? 0 : 'auto',
                                right: position === 'bottom-right' ? 0 : 'auto'
                            }}
                        >
                            <div className={`flex items-center gap-3 ${position === 'bottom-right' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        ${SIZE_MAP[size].button} rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95
                                    `}
                                    style={brandColors ? { backgroundColor: platform.color } : getButtonStyle(color, color === 'custom')}
                                >
                                    <SocialIcon size={currentSize.social} />
                                </a>
                                {showLabels && (
                                    <span className="bg-bg-raised border border-border px-2 py-1 rounded text-[11px] font-semibold text-text-primary shadow-sm whitespace-nowrap">
                                        {link.label}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    ${currentSize.button} rounded-full flex items-center justify-center shadow-xl text-white z-10 transition-shadow hover:shadow-2xl
                `}
                style={getButtonStyle(color, color === 'custom')}
                animate={{ rotate: isOpen ? 90 : 0 }}
                whileTap={{ scale: 0.92 }}
            >
                {isOpen ? <X size={currentSize.icon} /> : <IconComponent size={currentSize.icon} />}
            </motion.button>
        </div>
    )
}