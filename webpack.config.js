const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './_src/scripts/main.js',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'app')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./_src/index.html",
      filename: "./app/index.html"
    })
  ]
};