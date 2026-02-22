'use client'

import { Palette, Settings, Code } from 'lucide-react'

interface SidebarProps {
    activeSidebar: 'style' | 'social' | 'code'
    setActiveSidebar: (val: 'style' | 'social' | 'code') => void
}

export function Sidebar({ activeSidebar, setActiveSidebar }: SidebarProps) {
    return (
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
    )
}
