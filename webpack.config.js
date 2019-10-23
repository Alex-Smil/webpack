const path = require('path');
let glob = require("glob");

let entry = __dirname + "/app/src/page.js";
// let outputPath = __dirname + "/dist/";
let outputPath = path.resolve(__dirname, 'dist');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin( {
            filename: 'main.[contenthash].css'
        } ),
        new HtmlWebpackPlugin( {
            inject: false,
            hash: true,
            template: './app/src/index.html',
            filename: 'index.html'
        } ),
        new WebpackMd5Hash()
    ]
};