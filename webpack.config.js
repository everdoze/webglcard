const path = require('path');
const getValue = require('./get-env-value');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const title = getValue('TITLE', 'Andrew Aulov (Software Developer)');
const additionalBodyHeaderHtml = getValue('ADDITIONAL_BODY_HEADER', '');
const entryName = getValue('ENTRY_NAME', 'index.html');

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],
    // devServer: {
    //     compress: false,
    //     port: 9000,
    // },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/webglcard/',
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: isProduction,
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
        }
    },
    devtool: isProduction ? false : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.ttf$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
              test: /\.(png|jpg|jpeg|svg)$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 30000,
                },
              },
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction,
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: !isProduction,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProduction,
                        }
                    }
                ]
            },
            {
                test: /\.(glsl)$/,
                use: ['raw-loader']
            },
            // {
            //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
            //     type: 'asset'
            //     // query: {
            //     //     limit: 10000,
            //     //     mimetype: 'application/font-woff',
            //     //     name: `fonts/[name].[ext]`,
            //     // },
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-react",
                                    {
                                        runtime: "automatic" // React 17+ поддерживает automatic JSX runtime
                                    }
                                ]
                            ],
                            plugins: []
                        }
                    }
                ]
            }
        ]
    },
    context: path.resolve(__dirname, 'src'),
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            title: title,
            additionalBodyHeader: additionalBodyHeaderHtml,
            filename: entryName,
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            minify: isProduction ? {
                minifyCSS: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            } : false,
            chunksSortMode: function (a, b) {
                if (a.entry !== b.entry) {
                    return b.entry ? 1 : -1;
                } else {
                    return b.id - a.id;
                }
            },
        }),
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg|json|wasm)$/,
            compressionOptions: { level: 11 },
            threshold: 10240,
            minRatio: 0.8,
        })
    ]
};
