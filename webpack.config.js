const HtmlWebPackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: ['./_src/scripts/main.js', './_src/styles/main.scss'],
  output: {
    filename: 'js/main.min.js',
    path: path.resolve(__dirname, 'app')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./_src/index.html",
      filename: "./index.html"
    }),
    new CopyWebpackPlugin([
      { from: './_src/fonts', to: 'fonts' },
      { from: './_src/images', to: 'img' }
    ]),
    new ExtractTextPlugin({
      filename: "./css/main.min.css"
    })
  ]
};