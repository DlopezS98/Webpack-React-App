const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //This property defines where the application starts
  entry:'./src/index.tsx',
    
  //This property defines the file path and the file name which will be used for deploying the bundled file
  output:{
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  //Setup loaders
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [ new HtmlWebpackPlugin({ template: './public/index.html' }) ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
}