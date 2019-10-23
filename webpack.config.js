const path = require('path');
let glob = require("glob");

let entry = __dirname + "/app/src/page.js";
// let outputPath = __dirname + "/dist/";
let outputPath = path.resolve(__dirname, 'dist');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    }
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(
            { filename: 'main.css' }
        ),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './app/src/index.html',
            filename: 'index.html'
        })
    ]
};