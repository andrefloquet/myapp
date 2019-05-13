var path = require('path');

const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module:{
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/react']//,
                        //plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
                    }
                }
                /*
                //loader: 'babel-loader',
                query: {
                    presets: ['env','react']
                }*/
            }
        ]
    }
}