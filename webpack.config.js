let glob = require("glob");
let entry = __dirname + "/app/src/page.js";
let outputPath = __dirname + "/dist/";
// let devtool = "";
const ExtractTextPlugin = require('extract-text-webpack-plugin');

if (process.env.TESTBUILD) {
    entry = glob.sync(__dirname + "/app/test/**/*.test.js");
    outputPath = __dirname + "/test-dist/";
    devtool = "source-map";
}

module.exports = {
    entry: entry,
    output: {
        path: outputPath
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader']
                    }
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin( { filename: 'style.css' } )
    ]
};