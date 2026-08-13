/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        marathon: {
          red: '#E21B2D',
          blue: '#0050A4',
          navy: '#062A4F',
          cream: '#F4F8FC',
          gray: '#5D6B7C',
          green: '#079669',
          gold: '#D8A84B',
          ice: '#EAF2FB',
          surface: {
            stadium: 'rgb(var(--surface-stadium) / <alpha-value>)',
            'stadium-raised': 'rgb(var(--surface-stadium-raised) / <alpha-value>)',
            paper: 'rgb(var(--surface-paper) / <alpha-value>)',
            'paper-muted': 'rgb(var(--surface-paper-muted) / <alpha-value>)',
            scoreboard: 'rgb(var(--surface-scoreboard) / <alpha-value>)',
            'scoreboard-raised': 'rgb(var(--surface-scoreboard-raised) / <alpha-value>)',
          },
          text: {
            primary: 'rgb(var(--text-primary) / <alpha-value>)',
            secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
            'on-dark': 'rgb(var(--text-on-dark) / <alpha-value>)',
            muted: 'rgb(var(--text-muted) / <alpha-value>)',
            accent: 'rgb(var(--text-accent) / <alpha-value>)',
          },
          action: {
            primary: 'rgb(var(--action-primary) / <alpha-value>)',
            'primary-hover': 'rgb(var(--action-primary-hover) / <alpha-value>)',
            secondary: 'rgb(var(--action-secondary) / <alpha-value>)',
          },
          border: {
            subtle: 'rgb(var(--border-subtle) / <alpha-value>)',
            strong: 'rgb(var(--border-strong) / <alpha-value>)',
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xs: "calc(var(--radius-sm) - 2px)",
      },
      spacing: {
        gutter: 'var(--page-gutter)',
        main: 'var(--container-main)',
        'section-gap': 'var(--section-gap)',
        'section-gap-lg': 'var(--section-gap-lg)',
        'card-padding': 'var(--card-padding)',
        'header-height': 'var(--header-height)',
        'touch-target': 'var(--touch-target)',
      },
      maxWidth: {
        main: 'var(--container-main)',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        surface: 'var(--shadow-surface)',
        elevated: 'var(--shadow-elevated)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        emphatic: 'var(--ease-emphatic)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
