import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Dub named colors */
        "canvas-white": "var(--color-canvas-white)",
        "paper-mist": "var(--color-paper-mist)",
        ash: "var(--color-ash)",
        smoke: "var(--color-smoke)",
        pebble: "var(--color-pebble)",
        "midnight-ink": "var(--color-midnight-ink)",
        charcoal: "var(--color-charcoal)",
        graphite: "var(--color-graphite)",
        slate: "var(--color-slate)",
        steel: "var(--color-steel)",
        fog: "var(--color-fog)",
        silver: "var(--color-silver)",
        "electric-blue": "var(--color-electric-blue)",
        "deep-sapphire": "var(--color-deep-sapphire)",
        "soft-mint": "var(--color-soft-mint)",
        "vivid-green": "var(--color-vivid-green)",
        tangerine: "var(--color-tangerine)",
        lavender: "var(--color-lavender)",
        "conic-spectrum": "var(--color-conic-spectrum)",
        "primary-action": "var(--color-primary-action-fill)",

        /* shadcn semantic (mapped to Dub in globals.css) */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        /* Both map to Inter for now; display = Satoshi slot later */
        display: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        caption: [
          "var(--text-caption)",
          { lineHeight: "var(--leading-caption)" },
        ],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        "body-lg": [
          "var(--text-body-lg)",
          { lineHeight: "var(--leading-body-lg)" },
        ],
        "body-xl": [
          "var(--text-body-xl)",
          { lineHeight: "var(--leading-body-xl)" },
        ],
        subheading: [
          "var(--text-subheading)",
          { lineHeight: "var(--leading-subheading)" },
        ],
        "heading-sm": [
          "var(--text-heading-sm)",
          { lineHeight: "var(--leading-heading-sm)" },
        ],
        heading: [
          "var(--text-heading)",
          { lineHeight: "var(--leading-heading)" },
        ],
        "heading-lg": [
          "var(--text-heading-lg)",
          { lineHeight: "var(--leading-heading-lg)", letterSpacing: "-0.02em" },
        ],
        display: [
          "var(--text-display)",
          { lineHeight: "var(--leading-display)", letterSpacing: "-0.02em" },
        ],
      },
      spacing: {
        "4px": "var(--spacing-4)",
        "8px": "var(--spacing-8)",
        "12px": "var(--spacing-12)",
        "16px": "var(--spacing-16)",
        "20px": "var(--spacing-20)",
        "24px": "var(--spacing-24)",
        "28px": "var(--spacing-28)",
        "32px": "var(--spacing-32)",
        "36px": "var(--spacing-36)",
        "40px": "var(--spacing-40)",
        "48px": "var(--spacing-48)",
        "56px": "var(--spacing-56)",
        "64px": "var(--spacing-64)",
        "80px": "var(--spacing-80)",
        "96px": "var(--spacing-96)",
        "112px": "var(--spacing-112)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "2xl-2": "var(--radius-2xl-2)",
        full: "var(--radius-full)",
        tags: "var(--radius-tags)",
        cards: "var(--radius-cards)",
        inputs: "var(--radius-inputs)",
        buttons: "var(--radius-buttons)",
        largecards: "var(--radius-largecards)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        sm: "var(--shadow-sm)",
        "sm-2": "var(--shadow-sm-2)",
        "subtle-2": "var(--shadow-subtle-2)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        "subtle-3": "var(--shadow-subtle-3)",
      },
      maxWidth: {
        page: "var(--page-max-width)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
