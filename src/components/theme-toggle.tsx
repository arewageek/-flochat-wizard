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
        } else {
            root.setAttribute('data-theme', newTheme)
        }
    }

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
    }

    if (!mounted) return null

    const themes = [
        { value: 'light' as Theme, icon: Sun },
        { value: 'dark' as Theme, icon: Moon },
        { value: 'system' as Theme, icon: Monitor },
    ]

    return (
        <div className="flex items-center bg-bg-subtle border border-border rounded-lg p-1">
            {themes.map((themeOption) => {
                const Icon = themeOption.icon
                const isActive = theme === themeOption.value

                return (
                    <button
                        key={themeOption.value}
                        onClick={() => handleThemeChange(themeOption.value)}
                        className={`
                            relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
                            ${isActive 
                                ? 'text-accent bg-bg-raised border border-border' 
                                : 'text-text-muted hover:text-text-secondary'}
                        `}
                    >
                        <Icon size={14} />
                    </button>
                )
            })}
        </div>
    )
}