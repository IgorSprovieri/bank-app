// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        destructive: "var(--destructive)",
        success: "var(--success)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
}
