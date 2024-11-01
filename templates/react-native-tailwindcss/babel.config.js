module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        root: ".",
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
};
