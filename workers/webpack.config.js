const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'index.js',
    clean: true,
  },
  target: 'webworker',
  mode: 'production',
};
