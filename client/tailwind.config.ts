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
        primary: "#42ABD1",
        secondary: "#A3D154",
        cardiary: "#8669F7",
        yellowish: "#F4CB52",
        shade: "#5D5C5E",
        black: "#000000",
        slate: "#d4d4d8",
        white: "#ffffff",
        background_blue: "#F6F8FA",
        background_dark: "#1e353e",
        light_blue: "#f0f9ff",

        header: "#1d263a",
        gray: "#525252",
        sky_text: "#42abd1",
        icon_color: "#A3AFB0",
        text_primary: "#3A5377",
        text_secondary: "#66797C",
        button_primary: "#00adef",
        admin_button: "#1294F2",
        mentor: {
          100: "#87c5dc",
          200: "#59b4d6",
          300: "#42abd1",
          400: "#1da4d5",
          500: "#0293c8",
        },
        neutral: {
          100: "#F8F9FA",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#8E9196",
        },
      },
      backgroundColor: {
        lightGray: "#F7F7F7",
        public_bg: "#F6F8FA",
        career_bg: "#F9FAFB",
        career_apply_bg: "#F5F5F5",
        tutor_bg: "#F6F8FA",
      },
      backgroundImage: {
        reviewLeft: "url('/images/landing-page/left-review.png')",
        reviewRight: "url('/images/landing-page/right-review.png')",
        reviewMiddle: "url('/images/landing-page/middle-review.png')",

        bgHero:
          "linear-gradient(rgba(64, 168, 205, 0.67), rgba(32, 84, 103, 0.67))",
      },
      boxShadow: {
        box: "0px 54px 100px 0px rgba(10, 4, 60, 0.1)",
        boxDark: "0px 6.75px 20.24px 0px rgba(30, 61, 96, 0.03)",
        peopleBox: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        customRed: "0px 4px 6px rgba(232, 32, 32, 0.5)",
        softBlack: " 0px 2.69px 31.1px 0px #0000001A",
      },
      screens: {
        md: "768px",
        // am-ch
        voiceMatters: "826px",
      },
      fontSize: {
        "17px": "17px",
      },
      keyframes: {
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        "step-appear": {
          "0%": { 
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "progress-glow": {
          "0%": {
            boxShadow: "0 0 5px rgba(155, 135, 245, 0.5)",
            opacity: "0.8",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(155, 135, 245, 0.8)",
            opacity: "1",
          },
          "100%": {
            boxShadow: "0 0 5px rgba(155, 135, 245, 0.5)",
            opacity: "0.8",
          },
        },
        "charging": {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(-20%)" },
          "70%": { transform: "translateX(-5%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "progress-fill": "progress-fill 0.6s ease-in-out forwards",
        "step-appear": "step-appear 0.4s ease-out forwards",
        "progress-complete": "progress-glow 2s ease-in-out infinite",
        "charging-bar": "charging 2s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // plugins: [require("@tailwindcss/line-clamp")],
};
export default config;
