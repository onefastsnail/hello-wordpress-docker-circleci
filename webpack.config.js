const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const envPath = "./.env";
require("dotenv").config({ path: envPath });

const srcDir = path.resolve(
  __dirname,
  `src/wp-content/themes/${process.env.WP_THEME_NAME}/assets`
);
const distDir = path.resolve(
  __dirname,
  `dist/wp-content/themes/${process.env.WP_THEME_NAME}/assets/dist`
);

const extractCSS = new ExtractTextPlugin({ filename: "css/bundle.css" });

module.exports = {
  entry: [`${srcDir}/js/index.js`, `${srcDir}/scss/main.scss`],
  output: {
    path: distDir,
    filename: "js/bundle.js"
  },
  plugins: [extractCSS],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcDir,
        loader: "babel-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false
              }
            }
          ]
        })
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "img/[name].[ext]"
            }
          }
        ]
      }
    ]
  }
};
