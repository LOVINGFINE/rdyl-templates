/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,vue}"],
  theme: {
    screens: {
      sm: "415px", // 手机
      md: "768px", // 平板电脑
      lg: "1024px", // 电脑
    },
    extend: {
      colors: {
        dark: "#0d1321",
        "light-dark": "#171e2e",
      },
      height: {
        s: "2rem",
        m: "2.3rem",
        lg: "2.7rem",
      },
      boxShadow: {
        card: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
