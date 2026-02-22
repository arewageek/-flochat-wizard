export interface SocialLink {
    platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'youtube' | 'github' | 'whatsapp' | 'email' | 'phone'
    url: string
    label: string
}

export interface WizardConfig {
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

export const COLOR_PRESETS = [
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

export const PLATFORM_OPTIONS = [
    { value: 'instagram' as const, label: 'Instagram' },
    { value: 'twitter' as const, label: 'Twitter' },
    { value: 'facebook' as const, label: 'Facebook' },
    { value: 'linkedin' as const, label: 'LinkedIn' },
    { value: 'youtube' as const, label: 'YouTube' },
    { value: 'github' as const, label: 'GitHub' },
    { value: 'whatsapp' as const, label: 'WhatsApp' },
    { value: 'email' as const, label: 'Email' },
    { value: 'phone' as const, label: 'Phone' },
]
