const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?name=images/[name].[ext]"},
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
        // WOFF Font
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                }
            },
        },
        // WOFF2 Font
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                }
            }
        },
        // TTF Font
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream'
                }
            }
        },
        // EOT Font
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: 'file-loader',
        },
        // SVG Font
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml',
                }
            }
        },
    ],
  }
}
