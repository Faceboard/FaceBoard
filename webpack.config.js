var clientConfig = {
  entry: [
      './client/src/'
  ],
  output: {
    path: './compiled/src',
    filename: 'bundle.js'
   },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
        plugins: ['transform-decorators-legacy']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  }

};

module.exports = clientConfig;