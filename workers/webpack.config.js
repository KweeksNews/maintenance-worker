const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'index.js',
    clean: true,
  },
  target: 'webworker',
  mode: 'production',
};
