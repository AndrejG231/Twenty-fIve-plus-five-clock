const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  resolve: {
    extensions: [".jsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 3000,
    watchContentBase: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.?js|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.?css/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};
