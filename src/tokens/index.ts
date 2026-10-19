export interface ColorToken {
  name: string
  variable: string
  lightValue: string
  darkValue: string
  description: string
}

export const colorTokens: Record<string, ColorToken[]> = {
  accent: [
    {
      name: 'Accent',
      variable: '--accent',
      lightValue: '#283845',
      darkValue: '#283845',
      description: 'Brand color #283845, consistent across light and dark mode',
    },
    {
      name: 'Accent Hover',
      variable: '--accent-hover',
      lightValue: '#1e2c37',
      darkValue: '#34495a',
      description: 'Hover state for interactive elements',
    },
    {
      name: 'Accent Foreground',
      variable: '--accent-foreground',
      lightValue: '#ffffff',
      darkValue: '#ffffff',
      description: 'Contrast text color on solid accent fills',
    },
    {
      name: 'Accent Subtle',
      variable: '--accent-subtle',
      lightValue: '#eef3f7',
      darkValue: '#15222c',
      description: 'Subtle tinted background for badges and highlights',
    },
    {
      name: 'Accent Muted',
      variable: '--accent-muted',
      lightValue: '#cad7e2',
      darkValue: '#253a4b',
      description: 'Border tint for interactive elements and indicators',
    },
    {
      name: 'Accent Text',
      variable: '--accent-text',
      lightValue: '#283845',
      darkValue: '#8eb4cf',
      description: 'High-contrast text and visible focus ring on dark surfaces',
    },
  ],
  surfaces: [
    {
      name: 'Canvas',
      variable: '--bg-canvas',
      lightValue: '#f8fafc',
      darkValue: '#0d1217',
      description: 'Application background canvas',
    },
    {
      name: 'Surface',
      variable: '--bg-surface',
      lightValue: '#ffffff',
      darkValue: '#141c24',
      description: 'Card and panel background',
    },
    {
      name: 'Surface Subtle',
      variable: '--bg-surface-subtle',
      lightValue: '#f1f5f9',
      darkValue: '#1c2732',
      description: 'Preview box and subtle backgrounds',
    },
  ],
  text: [
    {
      name: 'Text Primary',
      variable: '--text-primary',
      lightValue: '#0f172a',
      darkValue: '#f8fafc',
      description: 'Headings, titles, and high-emphasis text',
    },
    {
      name: 'Text Secondary',
      variable: '--text-secondary',
      lightValue: '#475569',
      darkValue: '#94a3b8',
      description: 'Body copy and descriptions',
    },
    {
      name: 'Text Muted',
      variable: '--text-muted',
      lightValue: '#64748b',
      darkValue: '#64748b',
      description: 'Helper text, timestamps, and captions',
    },
  ],
  borders: [
    {
      name: 'Border Subtle',
      variable: '--border-subtle',
      lightValue: '#f1f5f9',
      darkValue: '#1c2732',
      description: 'Subtle dividers and card borders',
    },
    {
      name: 'Border Default',
      variable: '--border-default',
      lightValue: '#e2e8f0',
      darkValue: '#263544',
      description: 'Default card and control outlines',
    },
  ],
}

export const radiusScale = [
  { name: 'controls', value: '6px', usage: 'Buttons, textarea, badges, icon boxes' },
  { name: 'cards', value: '8px', usage: 'Cards and alerts' },
]

export const typographyScale = [
  { level: 'badge', size: '13px', usage: 'Status indicator badge, form label' },
  { level: 'small', size: '14px', usage: 'Helper text, action results, button text' },
  { level: 'body', size: '15px', usage: 'Body copy, descriptions, preview text' },
  { level: 'card-title', size: '16px', usage: 'Card titles' },
  { level: 'section-heading', size: '18px', usage: 'Section headings (Example 1, Example 2)' },
  { level: 'page-title', size: '24px', usage: 'Main page header' },
]
