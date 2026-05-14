import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Menlo', 'monospace'],
      },
      colors: {
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        'ink-faint': 'var(--color-ink-faint)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-muted': 'var(--color-accent-muted)',
      },
      maxWidth: {
        reading: '68ch',
        wide: '90ch',
      },
      typography: () => ({
        vassi: {
          css: {
            '--tw-prose-body': 'var(--color-ink)',
            '--tw-prose-headings': 'var(--color-ink)',
            '--tw-prose-lead': 'var(--color-ink-muted)',
            '--tw-prose-links': 'var(--color-accent)',
            '--tw-prose-bold': 'var(--color-ink)',
            '--tw-prose-counters': 'var(--color-ink-muted)',
            '--tw-prose-bullets': 'var(--color-ink-faint)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-ink)',
            '--tw-prose-quote-borders': 'var(--color-accent)',
            '--tw-prose-captions': 'var(--color-ink-muted)',
            '--tw-prose-code': 'var(--color-ink)',
            '--tw-prose-pre-code': 'var(--color-ink-faint)',
            '--tw-prose-pre-bg': 'var(--color-surface-elevated)',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',
            maxWidth: 'none',
            lineHeight: '1.8',
            fontSize: '1.0625rem',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-fraunces)',
              fontWeight: '600',
              letterSpacing: '-0.02em',
            },
            h2: { fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' },
            h3: { fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' },
            p: { marginBottom: '1.5rem' },
            blockquote: {
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              borderLeftWidth: '2px',
              paddingLeft: '1.5rem',
              color: 'var(--color-ink)',
            },
            'a:hover': { color: 'var(--color-accent)' },
            code: {
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.875em',
              backgroundColor: 'var(--color-surface-elevated)',
              padding: '0.125em 0.375em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      }),
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [typography],
}

export default config
