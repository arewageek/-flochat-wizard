'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('system')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'system'
        setTheme(savedTheme)
        applyTheme(savedTheme)

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
            if (savedTheme === 'system') {
                applyTheme('system')
            }
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement

        if (newTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            root.setAttribute('data-theme', systemTheme)
            root.classList.toggle('dark', systemTheme === 'dark')
        } else {
            root.setAttribute('data-theme', newTheme)
            root.classList.toggle('dark', newTheme === 'dark')
        }
    }

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
    }

    if (!mounted) return null

    const themes = [
        { value: 'light' as Theme, icon: Sun, label: 'Light' },
        { value: 'dark' as Theme, icon: Moon, label: 'Dark' },
        { value: 'system' as Theme, icon: Monitor, label: 'System' },
    ]

    return (
        <div className="relative">
            <div className="flex items-center bg-surface-elevated/50 backdrop-blur-sm border border-border/50 rounded-xl p-1 shadow-lg">
                {themes.map((themeOption) => {
                    const Icon = themeOption.icon
                    const isActive = theme === themeOption.value

                    return (
                        <motion.button
                            key={themeOption.value}
                            onClick={() => handleThemeChange(themeOption.value)}
                            className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${isActive
                                ? 'text-accent'
                                : 'text-foreground-muted hover:text-foreground hover:bg-surface-elevated/50'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTheme"
                                    className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg border border-accent/30"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <Icon className="w-5 h-5 relative z-10" />
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}