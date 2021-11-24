# Webpack-React-App

## Description 📋
This is a basic example to learn how to setup webpack and how it works behind the scenes with react applications

## Let's Get Started 🚀
### Installations & Setup
* Create the following folders and files
```console
mkdir webpack-react-app
```
```console
cd webpack-react-app
```

* Initialize a package.json
```console
npm init
```
This will create a starter package and add a package.json file for us. This is where all the dependencies required to build the application.

* Create the following foders and files (powershell)
```console
> mkdir public, src
> ni .babelrc
> cd public
> ni index.html
> cd ../src
> ni app.js, index.js
```

##### Current folder and file structure
```
webpack-react-app
    |
    |-----> public --
                     |----> index.html
    |-----> src --
                  |----> app.js 
                  |----> index.js
    |-----> package.json
    |-----> .babelrc
```

Also we need two main libraries: React and ReactDOM. So let’s get them added as dependencies into our application using npm.

```console
npm i react react-dom
```

Next up we need to add webpack and install the webpack dev server to use the hot reloading. Add the flag -D in the next command to put the dependencies into a developement dependencies section

```console
npm i webpack webpack-dev-server webpack-cli -D
```

Now since we are working with React, we must keep in mind that React uses ES6 classes and import statements, something that all the browsers may not be able to understand. To make sure that the code is readable by all browsers, we need a tool like babel to transpile our code to normal readable code for browsers.

```console
npm i babel-core babel-loader @babel/preset-react @babel/preset-env html-webpack-plugin -D
```

We should have the following installed packages inside of our `package.json`
```json
"dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.16.4",
    "@babel/preset-react": "^7.16.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.2.3",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.64.3",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.5.0"
  }
```

### Code
Let's get started by adding a new file named `webpack.config.js` in the root directory of our project.
First we start by requiring the default path module to access the file location and make changes to the file location. In case if your're wondering where's comming from, it is a core Node.js module that gets used to manipulate file paths. Also we need to create a module an export it with the following properties:
#### Entry
An entry point indicates which module webpack should use to begin building out its internal dependency graph
```js
const path = require('path');

module.exports = {
  entry:'./src/index.js',
};
```
#### Ouput
The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

```js
const path = require('path');

module.exports = {
  output:{
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
};
```

#### Loaders
Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
};
```
#### Plugin
While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

In order to use a plugin, you need to `require()` it and add it to the plugins array. In this case we're gonna use the `html-webpack-plugin`, this a node package that we already install in the installation section and we can check the package that is inside of our dev dependencies section in `package.json`

```json
"devDependencies": {
    ...,
    "html-webpack-plugin": "^5.5.0",
    ...,
}
```
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [ new HtmlWebpackPlugin({ template: './public/index.html' }) ],
}
```
##### _webpack.config.js_
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //This property defines where the application starts
  entry:'./src/index.js',
    
  //This property defines the file path and the file name which will be used for deploying the bundled file
  output:{
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  //Setup loaders
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [ new HtmlWebpackPlugin({ template: './public/index.html' }) ],
}
```

#### Babel file setup
##### _.babelrc_
```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### Html code
In this case we only need a basic html template. If you use `vscode` you can create an HTML template easy just go to our file `public/index.html` and write `html:5` or `!` and emmet should show and snippet to generate a template. Inside of body tags create a div with an id `root`. You should have something like this.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React - WebPack</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

### React code
Since the starting point for the application is the index.js file in src folder, let’s start with that. We will start by requiring both React and ReactDOM for our use in this case. Add the below code in your index.js file.

#### _index.js_

```js
import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";

ReactDOM.render(<App />, document.getElementById('root'));
```

#### _app.js_
```js
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Webpack + React setup</h1>
      </div>
    )
  }
}
```

And the last step but not least we need to create some commands to run and build our application. those commands goes inside of `package.json` in the script section.

#### _package.json_
```json
"scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production",
},
```
Run the application
```
npm start
```
or build
```
npm run build
```