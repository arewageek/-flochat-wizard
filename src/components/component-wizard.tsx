'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TopBar } from './wizard/top-bar'
import { Sidebar } from './wizard/sidebar'
import { Canvas } from './wizard/canvas'
import { StylePanel } from './wizard/style-panel'
import { SocialPanel } from './wizard/social-panel'
import { CodePanel } from './wizard/code-panel'
import { WizardConfig, SocialLink } from './wizard/types'

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
            { platform: 'github', url: 'https://github.com/arewageek', label: 'GitHub' },
            { platform: 'twitter', url: 'https://twitter.com/arewaofweb3', label: 'Twitter' },
        ],
        showLabels: false,
        animationStyle: 'stack',
        toggleIcon: 'share',
        brandColors: false,
        previewUrl: '',
        copyType: 'component'
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

        const componentCode = `<Flochat
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
/>`

        if (config.copyType === 'component') {
            return componentCode
        }

        return `import { Flochat } from '@flochat/react'

export default function ContactWidget() {
    return (
        <main className="min-h-screen relative font-sans">
            {/* Your page content */}
            
            ${componentCode}
        </main>
    )
}`
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

                if (!mounted) return null

                return (
                    <>
                        <TopBar 
                            urlInput={urlInput}
                            setUrlInput={setUrlInput}
                            onUrlSubmit={handleUrlSubmit}
                            onCopyCode={copyCode}
                            copied={copied}
                        />

                        <Sidebar 
                            activeSidebar={activeSidebar}
                            setActiveSidebar={setActiveSidebar}
                        />

                        <Canvas 
                            config={config}
                            previewDevice={previewDevice}
                            setPreviewDevice={setPreviewDevice}
                        />

                        <section className="app-panel p-8">
                            <AnimatePresence mode="wait">
                                {activeSidebar === 'style' && (
                                    <StylePanel 
                                        config={config}
                                        updateConfig={updateConfig}
                                        isEyeDropperSupported={isEyeDropperSupported}
                                        pickColor={pickColor}
                                    />
                                )}

                                {activeSidebar === 'social' && (
                                    <SocialPanel 
                                        config={config}
                                        updateConfig={updateConfig}
                                        updateSocialLink={updateSocialLink}
                                        removeSocialLink={removeSocialLink}
                                        addSocialLink={addSocialLink}
                                    />
                                )}

                                {activeSidebar === 'code' && (
                                    <CodePanel 
                                        config={config}
                                        onCopyCode={copyCode}
                                        copied={copied}
                                        code={generateCode()}
                                        updateConfig={updateConfig}
                        />
                    )}
                </AnimatePresence>
            </section>
        </>
    )
}