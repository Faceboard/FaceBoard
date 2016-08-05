module.exports = {
  entry: [
      './client/'
  ],
  output: {
    path: './client/compiled',
    filename: 'bundle.js'
   },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      }
    }]
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};
