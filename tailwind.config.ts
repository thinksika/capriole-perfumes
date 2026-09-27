import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#070707',
        'bg-2':   '#101010',
        elevated: '#151515',
        border:   '#1e1e1e',
        'border-lt': '#2a2a2a',
        gold:     '#C5A15A',
        'gold-lt':'#D7BD80',
        'gold-dk':'#9a7a3a',
        ivory:    '#F4F0E8',
        muted:    '#9A978F',
        warm:     '#C2BBAF',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 6vw, 5rem)',
      },
    },
  },
  plugins: [],
}
export default config
