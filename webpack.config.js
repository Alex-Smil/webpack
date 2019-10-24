const path = require('path');
let glob = require("glob");

let entry = __dirname + "/app/src/js/page.js";
let outputPath = path.resolve(__dirname, 'dist');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

if (process.env.TESTBUILD) {
    entry = glob.sync(__dirname + "/app/test/**/*.test.js");
    // outputPath = __dirname + "/test-dist/";
    outputPath =  path.resolve(__dirname, 'dist');
    devtool = "source-map";
}

module.exports = {
    entry: {
        main: entry
    },
    output: {
        path: outputPath,
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules/'],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin( {
            filename: 'main.[contenthash].css'
        } ),
        new HtmlWebpackPlugin( {
            inject: false,
            hash: true,
            template: './app/src/index.html',
            filename: 'index.html'
        } )
    ]
};