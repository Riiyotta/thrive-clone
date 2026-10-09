/** @type {import('tailwindcss').Config} */
// Design tokens from CLONE_SPEC.md §0. Breakpoints follow the Webflow
// desktop-first model (§14): unprefixed = desktop, `tab:` ≤991, `mob:` ≤767,
// `xs:` ≤479; `wide:` ≥1440, `ultra:` ≥1920.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      wide: { min: '1440px' },
      ultra: { min: '1920px' },
      tab: { max: '991px' },
      mob: { max: '767px' },
      xs: { max: '479px' },
    },
    extend: {
      colors: {
        page: '#000000',
        ink: '#f5f6ff', // text primary / primary button bg
        grey: '#a4a4a4', // paragraphs, subdued text, footer links
        'surface-1': '#0b0b0b',
        'surface-2': '#131313',
        'surface-3': '#1a1a1a',
        hover: '#262626',
        track: '#222222', // swiper bullets
        playbtn: '#111111',
        green: '#1de9b6', // --green-500-main (tab chip)
        'green-hover': '#00ffbf', // --green-400 (primary button hover)
        'link-hover': '#e6e7e7',
        icon: '#808080',
        dropup: '#2f2f2f',
        'dropup-border': 'rgba(214,214,214,.16)',
        'ai-hover': 'rgba(230,231,231,.2)',
        'tab-inactive': 'rgba(255,255,255,.3)',
        'nav-transparent': 'rgba(0,10,6,0)',
        progress: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', '"Inter 24 Pt"', 'Arial', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Instrumentserif', 'Georgia', 'sans-serif'],
      },
      borderRadius: {
        pill: '62.4375rem',
        card: '0.75rem',
        panel: '1rem',
        media: '0.5rem',
        item: '0.375rem',
        dropup: '0.625rem',
        avatar: '6.25rem',
      },
      // [size, line-height] per §0.5 typography roles
      fontSize: {
        h1: ['4.5rem', '5.175rem'],
        'h1-tab': ['4rem', '4.6rem'],
        'h1-mob': ['3rem', '3.45rem'],
        h2: ['4rem', '4.6rem'],
        'h2-mob': ['3.5rem', '4.025rem'],
        'h2-xs': ['2.5rem', '2.875rem'],
        medium: ['1.25rem', '1.75rem'],
        'medium-xs': ['1.125rem', '1.575rem'],
        para: ['1.15rem', '1.61rem'],
        body: ['1.125rem', '1.575rem'],
        'body-xs': ['1.1rem', '1.54rem'],
        small: ['0.875rem', '1.225rem'],
        btn: ['1rem', '1rem'],
        'btn-sm': ['0.9rem', '1rem'],
        'btn-dark-sm': ['0.875rem', '1rem'],
        tab: ['1.5rem', '2.1rem'],
        'tab-mob': ['1.25rem', '1.75rem'],
        kikitab: ['1.15rem', '1.61rem'],
        'kikitab-xs': ['1rem', '1.4rem'],
        feature: ['1.25rem', '1.5625rem'],
        slide: ['1rem', '1.4rem'],
        'slide-mob': ['1.25rem', '1.75rem'],
        stat: ['4rem', '4rem'],
        'stat-48': ['3rem', '3rem'],
        'stat-40': ['2.5rem', '2.5rem'],
        xlarge: ['2rem', '2.8rem'],
        'xlarge-mob': ['1.5rem', '2.1rem'],
        quote: ['2rem', '2.4rem'],
        'quote-tab': ['1.75rem', '2.1rem'],
        'quote-mob': ['1.5rem', '1.8rem'],
        faq: ['1.25rem', '1.4375rem'],
        'footer-head': ['1.15rem', '1.3225rem'],
        'footer-head-mob': ['1.125rem', '1.29375rem'],
        'footer-link': ['1rem', '1.4rem'],
        'dd-title': ['0.85rem', '1.19rem'],
        'dd-head': ['0.75rem', '1.05rem'],
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
