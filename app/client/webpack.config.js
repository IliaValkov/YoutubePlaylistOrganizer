const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/code/main.tsx",
    resolve: {extensions: [".ts",".tsx",".js"]},
    module: {
        rules: [
            {test: /\.html$/, use: {loader:"html-loader"}},
            {test: /\.css$/, use: ["style-loader","css-loader"]},
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/index.html", filename: "./index.html"})
    ],
    performance: {hints: false}, 
    watch: true, 
    devtool: "source-map"
}