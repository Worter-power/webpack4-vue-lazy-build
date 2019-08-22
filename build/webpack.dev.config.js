const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const config = require('./config');
module.exports = {
    mode: 'development',
    entry: {
        'app': ['babel-polyfill','./src/main.js']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[hash:7].bundle.js',
        chunkFilename: 'js/[name].[hash:7].devchunk.js',
        publicPath: '/'
    },
    externals: config.externals,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.vue'],
        alias: config.alias,
        modules: [
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../node_modules")
        ] // 绝对路径
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/transform-runtime', 
                            "@babel/plugin-syntax-dynamic-import",
                            "transform-vue-jsx"
                        ]
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ].concat(config.loaders)
    },
    performance: {
        hints: "warning", // false 不展示警告或错误提示。 | "error" 将展示一条警告，通知你这是体积大的资源。在开发环境，我们推荐这样。| "warning"
        maxEntrypointSize: 10 * 1024 * 1024,
        maxAssetSize: 10 * 1024 * 1024
    },
    stats: { // 统计信息(stats)
        children: false,
        warnings: false,
        providedExports: true,
        modules: false // 添加构建模块信息
    },
    cache: true,
    plugins: [
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                isDev: process.env.NODE_ENV === 'development'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            inject: 'body', // js 挂在地方
            chunks: ['manifest', 'vendor', 'app'],
            minify: {
                removeComments: true,// 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                removeAttributeQuotes: true, // 移除属性的引号
                removeRedundantAttributes: true, // 删除多余的属性
                collapseBooleanAttributes: true, // 省略只有 boolean 值的属性值 例如：readonly checked
                minifyCSS: false// 压缩内联css
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        // 友好的终端错误显示方式
        new FriendlyErrorsPlugin({
            // 运行成功
            compilationSuccessInfo: {
                message: [`你的应用程序在这里运行：http://${config.myip}:${this.port}`],
                notes:[
                    '============================================================================',
                    'name\t: ' + config.name,
                    'port\t: ' + config.devServer.port,
                    'Node.js\t: ' + process.version,
                    'Local\t: ' + 'http://localhost:' + config.devServer.port,
                    'Local\t: ' + 'http://127.0.0.1:' + config.devServer.port,
                    'External\t: ' + `http://${config.myip}:${config.devServer.port}`,
                    '============================================================================'
                ]
            },
            //  运行错误
            onErrors: function (severity, errors) {
                // 可以收听插件转换和优先级的错误
                // 严重性可以是'错误'或'警告'
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                    // icon: ICON
                });
            },
            //是否每次编译之间清除控制台
            //默认为true
            clearConsole: true,
        })
    ],
    devServer: config.devServer
}