const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'react-native-sqlite-storage': 'react-native-sqlite-storage',
    'path': 'path',
    'fs': 'fs',
    'crypto': 'crypto',
    'stream': 'stream',
    'http': 'http',
    'zlib': 'zlib',
    'tls': 'tls',
    'net': 'net',
    'util': 'util',
    'https': 'https',
  }
};
