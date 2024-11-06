/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 0px 6px 0px #0000000D",
      },
      borderColor: {
        card: "#dfdfdf",
        input: "#d3d3d3",
      },
      borderRadius: {
        card: "15px",
        input: "8px",
      },
      padding: {
        card: "15px 20px 18px",
        input: "9px 11px",
      },
      colors: {
        disabled: "#252525",
        heading: "#a5a5a5",
        tertiary: "#585757",
        input: "#d3d3d3",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
};
