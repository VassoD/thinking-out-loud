export type KitTheme = 'light' | 'dark'

export interface KitPalette {
  surface: string
  ink: string
  accent: string
}

// Fixed values instead of the site's CSS variables: exported assets must not change with the viewer's theme.
export const KIT_PALETTES: Record<KitTheme, KitPalette> = {
  light: { surface: '#F2F0EB', ink: '#1A1A18', accent: '#5C7A62' },
  dark: { surface: '#0F0F0E', ink: '#E8E6E0', accent: '#7DAF84' },
}

export const KIT_THEMES: KitTheme[] = ['dark', 'light']
