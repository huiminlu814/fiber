var path = require('path');
var webpack = require('webpack');//webpack module
//execute each module with eval, exports the config file
module.exports = {
  devtool: 'eval',
  entry: {
    app : [
      // create localhost server at localhost:3000
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',//allow for compnet reloaded without page reload
      './lib/index.js'],
  },

  output: {
    path: path.join(__dirname, './public/js/'),//absolute path to output directory
    filename: `app.js`,//the main file name is app.js
    publicPath: '/js/' //allow index.html to access code via path /js/app.js
  },
  //Add additional plugins to the compiler
  plugins: [
    new webpack.HotModuleReplacementPlugin()//make change while the app is running without a page reload
  ],
  node: {
    fs: "empty"    // FileSystem defaulted to empty for node.
  },
  //when refrencing 'react', replace with the path to react
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    // Extensino should be .js, indicating 'javascript'
    extensions: ['', '.js']
  },
  resolveLoader: {
    //if loaders can't be found, look for them in node_modules
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
    {
      test: /\.js$/,//for .js extension files
      loaders: ['react-hot', 'babel'],// use react-hot and babel to load modules
      exclude: /node_modules/,//don't include /node_modules
      include: [path.join(__dirname,'./lib')]//include everything in ./lib
    },
    {//find all xml file extensions and load as raw
      test: /\.xml$/,
      loader: "raw"
    },
    {//find all xml file extensions and load with json-loader
      test: /\.json$/,
      loaders: ['json-loader']
    },
    {//find all css file extensions and load with raw in root directory
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};
