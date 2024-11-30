import type { Config } from "tailwindcss";

import tailwindcss_animate from "tailwindcss-animate";

const config: Config = {
  darkMode : ['class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [tailwindcss_animate],
};
export default config;
