var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app : [
      './lib/index.js'],//build app using ./lib/index.js
  },
  output: {
    path: path.join(__dirname, './public/js/'),//compile the bundle in /public/js directory
    filename: `app.js`,//create main file named app.js
    publicPath: '/js/'// public address of output files, allows index.html to access code via path /js/app.js

  },
  plugins: [//add additional plugins to the compiler
    new webpack.DefinePlugin({//dependency injection -- this defines a free variable
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
    }),
    //Minimize all javascript output of chunks
    new webpack.optimize.UglifyJsPlugin({
    }),
  ],
  node: {
    fs: "empty"//start with empty filesystem
  },
  resolve: {  //when refrencing 'react', replace with the path to react
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
