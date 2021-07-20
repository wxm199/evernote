module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "element-ui",
        customStyleName: (name) => {
          return `element-ui/lib/theme-chalk/${name}.css`;
        },
      },
    ],
  ],
};
