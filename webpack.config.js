/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv = {}) => {
    const isProd = argv.mode === 'production';

    const config = {
        entry: {
            app: './src/index.tsx',
        },
        output: {
            path: path.join(__dirname, './dist'),
            publicPath: '/',
            filename: '[name].[hash].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        optimization: {
            minimizer: [new UglifyJsPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.less/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer()],
                                sourceMap: !isProd,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'styles.[hash].css',
            }),
            new HtmlWebpackPlugin({
                files: {
                    js: ['app.[hash].js'],
                    css: ['styles.[hash].css'],
                },
                template: './src/index.html',
                filename: './index.html',
                inject: false,
            }),
        ],
    };

    return config;
};
