var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // плагин минимизации
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env) => {
    const isDevBuild = (env && env.dev);
    const config = {
        entry: {
            'polyfills': './src/polyfills.ts',
            'app': './src/main.ts',
            'vendor': [
                'jquery',
                'bootstrap',
                'bootstrap/dist/css/bootstrap.css',
                'popper.js',
                './src/styles.css'
            ]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),     // путь к каталогу выходных файлов - папка public
            publicPath: '/',
            filename: '[name].[hash].js'
        },
        devServer: {
            hot: true,
            open: true,
            historyApiFallback: true,
            port: 3000
        },
        mode: !isDevBuild ? 'production' : 'development',
        devtool: !isDevBuild ? 'source-maps' : 'eval',
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [   //загрузчик для ts
                {
                    test: /\.ts$/, // определяем тип файлов
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                        },
                        'angular2-template-loader'
                    ]
                }, {
                    test: /\.html$/,
                    loader: 'html-loader'
                }, {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader?name=assets/[name].[hash].[ext]'
                }, {
                    test: /\.css$/,
                    exclude: path.resolve(__dirname, 'src/app'),
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                }, {
                    test: /\.css$/,
                    include: path.resolve(__dirname, 'src/app'),
                    loader: 'raw-loader'
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
            new webpack.LoaderOptionsPlugin({
                htmlLoader: {
                    minimize: false
                }
            })
        ].concat(isDevBuild ? [
            new webpack.ContextReplacementPlugin(
                /angular(\|\/)core/,
                path.resolve(__dirname, 'src'), // каталог с исходными файлами
                {} // карта маршрутов
            ),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ] : [
            new UglifyJSPlugin()
        ])
    }
    return config;
}