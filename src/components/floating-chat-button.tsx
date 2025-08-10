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
    size?: number | 'sm' | 'md' | 'lg' | 'xl'
    position?: 'bottom-right' | 'bottom-left'
    color?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'orange' | 'teal' | 'custom'
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
}

const getSizeClasses = (size: number | string) => {
    if (typeof size === 'number') {
        return `w-[${size}px] h-[${size}px]`
    }
    const sizeMap = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-24 h-24'
    }
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.md
}

const getIconSize = (size: number | string) => {
    if (typeof size === 'number') {
        const iconSize = Math.max(16, size * 0.4)
        return `w-[${iconSize}px] h-[${iconSize}px]`
    }
    const sizeMap = {
        sm: 'w-5 h-5',
        md: 'w-7 h-7',
        lg: 'w-9 h-9',
        xl: 'w-11 h-11'
    }
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.md
}

const getSocialIconSize = (size: number | string) => {
    if (typeof size === 'number') {
        const iconSize = Math.max(12, size * 0.3)
        return `w-[${iconSize}px] h-[${iconSize}px]`
    }
    const sizeMap = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-7 h-7'
    }
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.md
}

const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8'
}

const colorClasses = {
    accent: 'bg-gradient-to-br from-accent to-accent-dark hover:from-accent-dark hover:to-accent shadow-accent/30',
    success: 'bg-gradient-to-br from-success to-success-dark hover:from-success-dark hover:to-success shadow-success/30',
    warning: 'bg-gradient-to-br from-warning to-warning-dark hover:from-warning-dark hover:to-warning shadow-warning/30',
    error: 'bg-gradient-to-br from-error to-error-dark hover:from-error-dark hover:to-error shadow-error/30',
    info: 'bg-gradient-to-br from-info to-info-dark hover:from-info-dark hover:to-info shadow-info/30',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 shadow-purple-500/30',
    pink: 'bg-gradient-to-br from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 shadow-pink-500/30',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 shadow-orange-500/30',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 shadow-teal-500/30',
    custom: '' // Will be handled dynamically
}

const toggleIcons = {
    share: Share2,
    message: MessageCircle,
    zap: Zap,
    sparkles: Sparkles,
    grid: Grid3X3
}

const socialPlatforms = {
    instagram: {
        icon: Instagram,
        color: 'from-pink-500 to-purple-600',
        hoverColor: 'hover:from-pink-600 hover:to-purple-700',
        brandColor: '#E4405F'
    },
    twitter: {
        icon: Twitter,
        color: 'from-blue-400 to-blue-600',
        hoverColor: 'hover:from-blue-500 hover:to-blue-700',
        brandColor: '#1DA1F2'
    },
    facebook: {
        icon: Facebook,
        color: 'from-blue-600 to-blue-800',
        hoverColor: 'hover:from-blue-700 hover:to-blue-900',
        brandColor: '#1877F2'
    },
    linkedin: {
        icon: Linkedin,
        color: 'from-blue-500 to-blue-700',
        hoverColor: 'hover:from-blue-600 hover:to-blue-800',
        brandColor: '#0A66C2'
    },
    youtube: {
        icon: Youtube,
        color: 'from-red-500 to-red-700',
        hoverColor: 'hover:from-red-600 hover:to-red-800',
        brandColor: '#FF0000'
    },
    github: {
        icon: Github,
        color: 'from-gray-700 to-gray-900',
        hoverColor: 'hover:from-gray-800 hover:to-black',
        brandColor: '#333333'
    },
    whatsapp: {
        icon: MessageCircle,
        color: 'from-green-500 to-green-700',
        hoverColor: 'hover:from-green-600 hover:to-green-800',
        brandColor: '#25D366'
    },
    email: {
        icon: Mail,
        color: 'from-indigo-500 to-indigo-700',
        hoverColor: 'hover:from-indigo-600 hover:to-indigo-800',
        brandColor: '#6366F1'
    },
    phone: {
        icon: Phone,
        color: 'from-emerald-500 to-emerald-700',
        hoverColor: 'hover:from-emerald-600 hover:to-emerald-800',
        brandColor: '#10B981'
    }
}

export function FloatingSocialButton({
    size = 'md',
    position = 'bottom-right',
    color = 'accent',
    customColors,
    socialLinks = [
        { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
        { platform: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
        { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
    ],
    showLabels = false,
    animationStyle = 'stack',
    toggleIcon = 'share',
    brandColors = false
}: FloatingSocialButtonProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSocialClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const getMainButtonStyle = () => {
        if (color === 'custom' && customColors) {
            return {
                background: `linear-gradient(to bottom right, ${customColors.primary}, ${customColors.secondary})`,
                boxShadow: `0 25px 50px -12px ${customColors.primary}30`
            }
        }
        return {}
    }

    const getMainButtonClass = () => {
        const baseClass = 'rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center relative overflow-hidden group backdrop-blur-sm border border-white/20 glass-button'
        if (color === 'custom') {
            return baseClass
        }
        return `${baseClass} ${colorClasses[color]}`
    }

    const getSocialButtonStyle = (platform: any) => {
        if (brandColors) {
            return {
                background: `linear-gradient(135deg, ${platform.brandColor}, ${platform.brandColor}dd)`,
                boxShadow: `0 4px 20px ${platform.brandColor}40`
            }
        }
        return {}
    }

    const getSocialButtonClass = (platform: any) => {
        if (brandColors) {
            return 'rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden backdrop-blur-sm glass-button'
        }
        return `rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden backdrop-blur-sm bg-gradient-to-br ${platform.color} ${platform.hoverColor}`
    }

    const ToggleIconComponent = toggleIcons[toggleIcon]
    const sizeClass = getSizeClasses(size)
    const iconSizeClass = getIconSize(size)
    const socialIconSizeClass = getSocialIconSize(size)

    const getFanPosition = (index: number, total: number) => {
        const angle = (Math.PI / 3) * (index - (total - 1) / 2) / Math.max(1, total - 1)
        const baseRadius = typeof size === 'number' ? size * 1.5 :
            size === 'sm' ? 80 : size === 'md' ? 100 : size === 'lg' ? 120 : 140
        const x = Math.sin(angle) * baseRadius
        const y = -Math.cos(angle) * baseRadius
        return { x, y }
    }

    const getStackPosition = (index: number) => {
        const baseSpacing = typeof size === 'number' ? size * 1.2 :
            size === 'sm' ? 60 : size === 'md' ? 70 : size === 'lg' ? 80 : 90
        const y = -(index + 1) * baseSpacing
        return { x: 0, y }
    }

    const getGridPosition = (index: number, total: number) => {
        const cols = Math.ceil(Math.sqrt(total))
        const row = Math.floor(index / cols)
        const col = index % cols
        const baseSpacing = typeof size === 'number' ? size * 1.2 :
            size === 'sm' ? 60 : size === 'md' ? 70 : size === 'lg' ? 80 : 90
        const offsetX = (cols - 1) * baseSpacing / 2
        const x = col * baseSpacing - offsetX
        const y = -(row + 1) * baseSpacing
        return { x, y }
    }

    const getPosition = (index: number, total: number) => {
        switch (animationStyle) {
            case 'stack':
                return getStackPosition(index)
            case 'grid':
                return getGridPosition(index, total)
            default:
                return getFanPosition(index, total)
        }
    }

    return (
        <div className={`fixed ${positionClasses[position]} z-50`}>
            {/* Social Links */}
            <AnimatePresence>
                {isOpen && socialLinks.map((link, index) => {
                    const { x, y } = getPosition(index, socialLinks.length)
                    const platform = socialPlatforms[link.platform]
                    const IconComponent = platform.icon

                    return (
                        <motion.div
                            key={`${link.platform}-${index}`}
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: 0,
                                y: 0
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: position === 'bottom-right' ? -x : x,
                                y
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0,
                                x: 0,
                                y: 0
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: index * 0.1
                            }}
                            className="absolute"
                            style={{
                                bottom: size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px',
                                right: position === 'bottom-right' ? (size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px') : 'auto',
                                left: position === 'bottom-left' ? (size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px') : 'auto'
                            }}
                        >
                            <div className="relative group">
                                <motion.button
                                    onClick={() => handleSocialClick(link.url)}
                                    className={`${sizeClass} ${getSocialButtonClass(platform)} magnetic-hover`}
                                    style={getSocialButtonStyle(platform)}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -10, 10, 0],
                                        transition: { duration: 0.3 }
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6 }}
                                    />

                                    <IconComponent className={`${socialIconSizeClass} text-white relative z-10`} />

                                    {/* Enhanced glow effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            boxShadow: `0 0 20px ${brandColors ? platform.brandColor :
                                                platform.color.includes('pink') ? '#ec4899' :
                                                    platform.color.includes('blue') ? '#3b82f6' :
                                                        platform.color.includes('red') ? '#ef4444' :
                                                            platform.color.includes('green') ? '#10b981' :
                                                                platform.color.includes('gray') ? '#6b7280' :
                                                                    platform.color.includes('indigo') ? '#6366f1' :
                                                                        platform.color.includes('emerald') ? '#059669' : '#ec4899'}40`
                                        }}
                                    />
                                </motion.button>

                                {/* Label */}
                                {showLabels && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        className={`absolute ${position === 'bottom-right' ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 transform -translate-y-1/2 whitespace-nowrap`}
                                    >
                                        <div className="bg-surface/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1 shadow-lg">
                                            <span className="text-sm font-medium text-foreground">{link.label}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                onClick={handleToggle}
                className={`${sizeClass} ${getMainButtonClass()} magnetic-hover neon-glow`}
                style={getMainButtonStyle()}
                whileHover={{
                    scale: 1.05,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    rotate: isOpen ? 45 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                {/* Advanced animated background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full"
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                />

                {/* Multi-layer ripple effect */}
                <motion.div
                    className="absolute inset-0 bg-white/10 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                />

                {/* Particle effects */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            style={{
                                left: `${20 + i * 10}%`,
                                top: `${30 + (i % 2) * 40}%`,
                            }}
                            animate={{
                                y: [-10, 10, -10],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* Icon */}
                <motion.div
                    animate={{
                        rotate: isOpen ? 45 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    {isOpen ? (
                        <X className={`${iconSizeClass} text-white relative z-10`} />
                    ) : (
                        <ToggleIconComponent className={`${iconSizeClass} text-white relative z-10`} />
                    )}
                </motion.div>

                {/* Pulse animation */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Secondary pulse */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-white/20"
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                    }}
                />
            </motion.button>
        </div>
    )
}