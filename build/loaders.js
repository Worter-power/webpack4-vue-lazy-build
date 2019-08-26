const path = require('path');
const postcss = require('./postcss.config');
const isProd = process.env.NODE_ENV == 'production';
const jsexclude = /node_modules/;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = [
    {
        test: /\.json$/,  //用于匹配loaders所处理文件拓展名的正则表达式
        use: 'json-loader', //具体loader的名称
        type: 'javascript/auto',
        exclude: jsexclude
    },
    {
        test: /\.vue$/,
        use: ['vue-loader']
    },
    {
        test: /\.(png|jpg|gif|jepg|svg|webp)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192, // 小于8192字节的图片打包成base 64图片
                    outputPath: 'images/', //定义输出的图片文件夹
                    publicPath: 'images/',
                    name: '[name].[ext]' //打包后输出路径
                }
            }
        ]
    },
    {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{
            loader: 'file-loader',
            options: {
                limit: 8192,
                name: 'fonts/[name].[ext]?[hash:8]',
                publicPath: '',
            },
        }],
    },
    {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                limit: 8192,
                name: 'audios/[name].[ext]?[hash:8]',
                publicPath: ''
            },
        }],
    },
    {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                limit: 8192,
                name: 'videos/[name].[ext]?[hash:8]',
                publicPath: ''
            },
        }]
    },
    {
        test: /\.css$/,
        exclude: jsexclude,
        use: [
            { loader: isProd ? MiniCssExtractPlugin.loader : "style-loader" },
            { loader: 'css-loader' },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: postcss.plugins,
                    sourceMap: isProd ? false : true,
                }
            }
        ]
    },
    {
        test: /\.scss$/,
        exclude: jsexclude,
        use: [
            { loader: isProd ? MiniCssExtractPlugin.loader : "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader", options: { sourceMap: isProd ? false : true } },
            {
                loader: "postcss-loader",
                options: {
                    plugins: postcss.plugins,
                    parser: 'postcss-scss',
                    sourceMap: isProd ? false : true,
                }
            },
            // sass 全局变量和函数
            {
                loader: 'sass-resources-loader',
                options: {
                    sourceMap: isProd ? false : true,
                    resources: [
                        path.resolve(__dirname, '../src/assets/scssCommon/var.scss'),
                        path.resolve(__dirname, '../src/assets/scssCommon/mixin.scss'),
                    ]
                }
            }
        ]
    }
]