const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({ browsers: 'last 2 versions' })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=[path]/[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[path]/[name].[ext]'
      },
      {
        test: /\.(otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index', 'shared']
    })
  ],
  context: path.resolve(__dirname, 'src'),
  entry: {
    shared: './shared.js',
    index: './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
}
