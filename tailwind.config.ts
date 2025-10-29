import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        // Zonar custom colors
        gold: "hsl(var(--gold))",
        'gold-glow': "hsl(var(--gold-glow))",
        anthracite: "hsl(var(--anthracite))",
        'anthracite-light': "hsl(var(--anthracite-light))",
        pearl: "hsl(var(--pearl))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'bounce-in': {
          '0%': { 
            transform: 'scale(0.8) translateY(-50px)',
            opacity: '0',
          },
          '60%': { 
            transform: 'scale(1.05) translateY(0)',
            opacity: '1',
          },
          '100%': { 
            transform: 'scale(1) translateY(0)',
            opacity: '1',
          },
        },
        'pulse-gold': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 hsl(42 45% 52% / 0.7)',
          },
          '50%': { 
            boxShadow: '0 0 0 20px hsl(42 45% 52% / 0)',
          },
        },
        'evaporate': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.5) translateY(50px)',
          },
          '10%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
          '70%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(1.5) translateY(-100px)',
            filter: 'blur(20px)',
          },
        },
        'slide-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(100px) scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        'scale-in': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'evaporate': 'evaporate 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-up': 'slide-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scale-in 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
