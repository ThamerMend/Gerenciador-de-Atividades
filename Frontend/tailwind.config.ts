import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C0118',
        secondary: '#222831',
        terciary: '#31363F',
        lightPrimary: '#76ABAE',
        lightPrimary_700: '#468BAE',
        lightText: '#DDD',
        darkPrimary: '#2d3659',
        darkPrimary_700: '#171d36',
      },
    },
  },
  plugins: [],
};
export default config;
