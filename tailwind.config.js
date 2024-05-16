/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#FDFEFD",
        "primary-100": "#F7FBF7",
        "primary-200": "#ECF5EC",
        "primary-300": "#DEEEDD",
        "primary-400": "#CBE4CA",
        "primary-500": "#B4D8B3",
        "primary-600": "#9ACA98",
        "primary-700": "#7BBA78",
        "primary-800": "#3A6C38",
        "primary-900": "#1C341B",
        "secondary-50": "#FFFEFC",
        "secondary-100": "#FEFCF4",
        "secondary-200": "#FDF8E7",
        "secondary-300": "#FCF2D4",
        "secondary-400": "#FAEBBC",
        "secondary-500": "#F8E29E",
        "secondary-600": "#F6D77C",
        "secondary-700": "#F3CB53",
        "secondary-800": "#A27C0B",
        "secondary-900": "#4C3B05",
        "neutral-50": "#FEFEFE",
        "neutral-100": "#FBFBFB",
        "neutral-200": "#F7F7F7",
        "neutral-300": "#F0F0F0",
        "neutral-400": "#E8E8E8",
        "neutral-500": "#DEDEDE",
        "neutral-600": "#D2D2D2",
        "neutral-700": "#C4C4C4",
        "neutral-800": "#656565",
        "neutral-900": "#2C2C2C",
        "success-50": "#FBFEFD",
        "success-100": "#F1FCF7",
        "success-200": "#DFF8EE",
        "success-300": "#C6F3E0",
        "success-400": "#A6EDCF",
        "success-500": "#7EE5BA",
        "success-600": "#50DBA1",
        "success-700": "#28C382",
        "success-800": "#176E4A",
        "success-900": "#0C3B28",
        "warning-50": "#FFFDFC",
        "warning-100": "#FEF9F4",
        "warning-200": "#FDF1E6",
        "warning-300": "#FCE6D2",
        "warning-400": "#FAD8B8",
        "warning-500": "#F8C799",
        "warning-600": "#F5B374",
        "warning-700": "#F29B4A",
        "warning-800": "#9E520B",
        "warning-900": "#4B2705",
        "error-50": "#FFFCFD",
        "error-100": "#FEF3F5",
        "error-200": "#FDE4E9",
        "error-300": "#FBCFD8",
        "error-400": "#F8B4C2",
        "error-500": "#F693A7",
        "error-600": "#F26C87",
        "error-700": "#EE3F62",
        "error-800": "#950D28",
        "error-900": "#480614",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
