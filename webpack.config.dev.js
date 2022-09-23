const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const minicssextractplugin = require('mini-css-extract-plugin');
const copyplugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename:'assets/images/[hash][ext][query]',
  },
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.js'],
    alias:{
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test:/\.css|.styl$/i,
        use:[minicssextractplugin.loader,
        'css-loader',
        'stylus-loader'
      ],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test:/\.(woff|woff2)$/,
        use:{
          loader:'url-loader',
          options:{
            limit:10000,
            mimetype:"application/font-woff",
            name:"[name].[contenthash].[ext]",
            outputpath: "./assets/fonts/",
            publicpath:"../assets/fonts/",
            esmodule:false,
          },
        }
      }
    ]
  },
  plugins:[
    new htmlwebpackplugin({
      inject: true,
      template:'./public/index.html',
      filename:'./index.html'
    }),
    new minicssextractplugin({
      filename:'assets/[name].[contenthash].css'
  }),
    new copyplugin({
      patterns:[
        {
          from:path.resolve(__dirname,"src","assets/images"),
          to:"assets/images"
        }
      ]
    }),
    new Dotenv(),
  ]
}