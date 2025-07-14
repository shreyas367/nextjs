const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;
// Remove or comment this:



function addVariablesForColors({ addBase, theme } , any ) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [`--${key}`, value])
  );

  addBase({
    ':root': newVars,
  });
}



/** @type {import('tailwindcss').Config} */
module.exports = {
   blur: {
    '100': '200px',
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
       perspective: {
    1000: "1000px",
  },

       fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s forwards",
      },
      keyframes: {
          pulseGlow: {
      "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
      "50%": { opacity: "1", transform: "scale(1.1)" },
    },
      },
    },
  },
  plugins: [addVariablesForColors,addSvgPatterns],
};
export default config;

