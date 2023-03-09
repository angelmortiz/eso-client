import Dotenv from 'dotenv-webpack';

module.exports = {
  plugins: [
    new Dotenv({
        safe: true
      })
  ]
};