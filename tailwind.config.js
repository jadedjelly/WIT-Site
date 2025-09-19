/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '72ch',                  // comfortable line length
            color: theme('colors.gray.800'),
            a: {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px',
            },
            'h1,h2,h3,h4': { fontWeight: '700' },
            p: { lineHeight: '1.85', marginTop: '1.25em', marginBottom: '1.25em' },
            img: { borderRadius: theme('borderRadius.xl'), boxShadow: theme('boxShadow.lg') },
            code: { backgroundColor: theme('colors.gray.100'), padding: '0.2em 0.4em', borderRadius: '0.375rem' },
            pre: { backgroundColor: theme('colors.gray.900'), color: 'white' },
            blockquote: { borderLeftColor: theme('colors.gray.300') },
          }
        },
        invert: {
          css: {
            color: theme('colors.gray.100'),
            a: { color: theme('colors.sky.300') },
            code: { backgroundColor: theme('colors.gray.800') },
            blockquote: { borderLeftColor: theme('colors.gray.700') },
          }
        }
      })
    }
  },
  plugins: [typography()],
}
