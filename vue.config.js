module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/evernote-online/" : "/",
  configureWebpack: {
    plugins: [],

    module: {},

    resolve: {
      extensions: [".js", ".json", ".css"],
    },
    devServer: {
      // https: true,
    },
  },
};
