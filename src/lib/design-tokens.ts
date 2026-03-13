/**
 * SystemPad Design Tokens — Central Design System
 * 
 * Inspired by shadcn/ui's approach: all design values are defined here
 * and referenced via CSS custom properties in globals.css.
 * 
 * Components can import these tokens for programmatic use (e.g., inline styles,
 * dynamic theming) while CSS classes reference the custom properties directly.
 */

// ─── Color Palette ───────────────────────────────────────────────────────────

export const colors = {
  /** Core backgrounds */
  background: {
    DEFAULT: "#0A0A0B",
    secondary: "#111113",
    elevated: "#141415",
  },

  /** Core foregrounds */
  foreground: {
    DEFAULT: "#F5F5F5",
    muted: "#A1A1AA",
    subtle: "#71717A",
  },

  /** Card surfaces */
  card: {
    DEFAULT: "#141415",
    hover: "#1A1A1C",
    foreground: "#E5E5E5",
  },

  /** Primary accent — warm gold/amber */
  primary: {
    DEFAULT: "#D4A853",
    hover: "#E0BB6A",
    muted: "rgba(212, 168, 83, 0.15)",
    foreground: "#0A0A0B",
  },

  /** Secondary surfaces */
  secondary: {
    DEFAULT: "#1A1A1C",
    hover: "#222224",
    foreground: "#E5E5E5",
  },

  /** Muted elements */
  muted: {
    DEFAULT: "#27272A",
    foreground: "#A1A1AA",
  },

  /** Borders */
  border: {
    DEFAULT: "#27272A",
    subtle: "#1F1F22",
    hover: "#3F3F46",
    accent: "rgba(212, 168, 83, 0.3)",
  },

  /** Status colors */
  success: "#22C55E",
  warning: "#F59E0B",
  destructive: "#EF4444",

  /** Ring / focus */
  ring: "#D4A853",
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    display: '"Outfit", system-ui, -apple-system, sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", monospace',
  },

  fontSize: {
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    base: "1rem",       // 16px
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "3.75rem",   // 60px
    "7xl": "4.5rem",    // 72px
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
} as const;

// ─── Spacing & Layout ────────────────────────────────────────────────────────

export const spacing = {
  container: "1100px",
  containerPadding: "1.5rem",
  sectionY: "6rem",       // py-24
  sectionYMobile: "4rem", // py-16
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

export const radius = {
  sm: "0.375rem",   // 6px
  md: "0.5rem",     // 8px
  lg: "0.75rem",    // 12px
  xl: "1rem",       // 16px
  "2xl": "1.5rem",  // 24px
  "3xl": "2rem",    // 32px
  full: "9999px",
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const shadows = {
  /** Subtle card shadow */
  card: "0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)",

  /** Elevated card shadow */
  elevated: "0 10px 40px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)",

  /** Gold glow for primary elements */
  glow: "0 0 30px rgba(212, 168, 83, 0.15), 0 0 60px rgba(212, 168, 83, 0.05)",

  /** Intense gold glow for hover states */
  glowHover: "0 0 40px rgba(212, 168, 83, 0.25), 0 0 80px rgba(212, 168, 83, 0.1)",

  /** Hero section ambient glow */
  ambient: "0 0 120px rgba(212, 168, 83, 0.08)",
} as const;

// ─── Gradients ───────────────────────────────────────────────────────────────

export const gradients = {
  /** Hero background — warm sunset feel */
  hero: "radial-gradient(ellipse at 50% 0%, rgba(212, 168, 83, 0.12) 0%, rgba(10, 10, 11, 0) 60%)",

  /** Card hover gradient */
  cardHover: "linear-gradient(135deg, rgba(212, 168, 83, 0.05) 0%, rgba(10, 10, 11, 0) 50%)",

  /** Text gradient for highlighted headings */
  text: "linear-gradient(135deg, #F5F5F5 0%, #D4A853 100%)",

  /** Gold button gradient */
  primaryButton: "linear-gradient(135deg, #D4A853 0%, #C49B45 100%)",

  /** Subtle section divider */
  sectionDivider: "linear-gradient(90deg, transparent 0%, rgba(212, 168, 83, 0.2) 50%, transparent 100%)",
} as const;

// ─── Animation ───────────────────────────────────────────────────────────────

export const animation = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

// ─── Convenience Export ──────────────────────────────────────────────────────

const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  gradients,
  animation,
} as const;

export default designTokens;
