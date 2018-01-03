const path = require('path');

module.exports = {
  // Our main entry point is in relative path './src/app.js'
  // entry: './src/app.js',
  entry: './src/app.js',

  // Our output must go to an absolute path, and we use join so JS creates the path correctly for us
  // because different systems have different ways of expressing paths (i.e.: Windows vs. Linux), and
  // the name of the file containin the result is bundle.js.
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  // Here we are telling webpack how to use babel to translate JS files from ES6 to ES5, and we do
  // that by using rules, which contain 3 attributes: test, loader, and exclude (read below for
  // functionality).
  // babel-loader:
  //    Allows transpiling JS using babel and webpack.
  // style-loader:
  //    Adds CSS to the DOM by injecting a <style> tag
  // css-loader:
  //    Interprets @import and url() like import/require() and will resolve them.
  // sass-loader:
  //    Loads a SASS/SCSS file and compiles it to CSS.
  module: {
    rules: [
      {
        test: /\.js$/,            // For any file with an extension of .js...
        loader: 'babel-loader',   // ... run the file through babel-loader ...
        exclude: /node_modules/   // ... but exclude any files in folder node_modules.
      },
      {
        test: /\.s?css$/,         // For any file with an extension of .css or .scss...
        use: [                    // ... run the file through the following loaders ('use' = more than 1 loader) ...
          'style-loader',         // ... the styles loader, ...
          'css-loader',           // ... the css loader ...
          'sass-loader'           // ... and the sass loader.
        ]
      }
    ]
  },

  // Source mapping. Needs re-building when this is changed. This value is so errors and console statements
  // are referenced to the real source, not bundle.js.
  devtool: 'cheap-module-eval-source-map',

  // This (dev-server) replaces live-server. It has some niceties for webpack, like noticing when certain
  // files are changed.
  devServer: {
    contentBase: path.join(__dirname, 'public'),  // Notice that this is the same as output.path above
    historyApiFallback: true                      // This tells the dev server to always serve index.html
                                                  // for all 404s so the routing is done client side
                                                  // (requires server restart).
  }
}
