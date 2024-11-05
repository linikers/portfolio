/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-base-0": "var(--custom-base-0)",
        "custom-base-1": "var(--custom-base-1)",
        "custom-base-2": "var(--custom-base-2)",
        "custom-black-0": "var(--custom-black-0)",
        "custom-red-1": "var(--custom-red-1)",
        "custom-blue-1": "var(--custom-blue-1)",
      },
    },
  },
  plugins: [],
};
