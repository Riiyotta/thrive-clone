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
        pill: '999px',
        card: '12px',
        panel: '16px',
        media: '8px',
        item: '6px',
        dropup: '10px',
        avatar: '100px',
      },
      // [size, line-height] per §0.5 typography roles
      fontSize: {
        h1: ['72px', '82.8px'],
        'h1-tab': ['64px', '73.6px'],
        'h1-mob': ['48px', '55.2px'],
        h2: ['64px', '73.6px'],
        'h2-mob': ['56px', '64.4px'],
        'h2-xs': ['40px', '46px'],
        medium: ['20px', '28px'],
        'medium-xs': ['18px', '25.2px'],
        para: ['18.4px', '25.76px'],
        body: ['18px', '25.2px'],
        'body-xs': ['17.6px', '24.64px'],
        small: ['14px', '19.6px'],
        btn: ['16px', '16px'],
        'btn-sm': ['14.4px', '16px'],
        'btn-dark-sm': ['14px', '16px'],
        tab: ['24px', '33.6px'],
        'tab-mob': ['20px', '28px'],
        kikitab: ['18.4px', '25.76px'],
        'kikitab-xs': ['16px', '22.4px'],
        feature: ['20px', '25px'],
        slide: ['16px', '22.4px'],
        'slide-mob': ['20px', '28px'],
        stat: ['64px', '64px'],
        'stat-48': ['48px', '48px'],
        'stat-40': ['40px', '40px'],
        xlarge: ['32px', '44.8px'],
        'xlarge-mob': ['24px', '33.6px'],
        quote: ['32px', '38.4px'],
        'quote-tab': ['28px', '33.6px'],
        'quote-mob': ['24px', '28.8px'],
        faq: ['20px', '23px'],
        'footer-head': ['18.4px', '21.16px'],
        'footer-head-mob': ['18px', '20.7px'],
        'footer-link': ['16px', '22.4px'],
        'dd-title': ['13.6px', '19.04px'],
        'dd-head': ['12px', '16.8px'],
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
