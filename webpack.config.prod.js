import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    main:path.resolve(__dirname, 'src/index'),
    vendor:path.resolve(__dirname, 'src/vendor')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    //Create HTML file that includes reference to bundle JS.
    new HtmlWebpackPlugin({
      template:'src/index.html',
      minify:{
        removeComments:true,
        collapseWhitespace:true,
        removeRedundantAttributes:true,
        useShortDoctype:true,
        removeEmptyAttributes:true,
        removeStyleLinkTypeAttributes:true,
        keepClosingSlash:true,
        minifyCSS:true,
        minifyJS:true,
        minifyURLs:true
      },
      inject:true,
      //Properties you define here are available in index.html
      //using htmlWebpackPlugin.options.varname
      trackJSToken:'f4d393e9714b47d69f992834c5c43617'
    }),
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify Js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
