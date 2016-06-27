var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  context: path.join(__dirname, './src'),
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/app.js'),
    'react'
  ],
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /static\/images\/\.(png)$/,
        loader: "url-loader?name=/static/images/$1"
      }
    ],
    noParse: ["react"]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    // Use external version of
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new HtmlWebpackPlugin({
      title: 'Bok',
      template: "index.html",
      filename: "index.html",
      minify: false
    })
  ]
}
