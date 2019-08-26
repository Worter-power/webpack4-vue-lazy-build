const path = require('path');
const ip = require('ip');
const webpackConfig = require('../webpack.config');
const utils = require('./utils');
const loaders = require('./loaders');
const isProd = process.env.NODE_ENV == 'production';
exports.loaders = loaders;
exports.eslink = webpackConfig.openEslink;
exports.name = webpackConfig.name;
// 本机IP
exports.myip = ip.address();
// 多入口
exports.entries = utils.entries();
// 文件输出路径
exports.assetsRoot = path.resolve(__dirname, '../dist/');
// 生产环境配置
exports.production = {
    assetsSubDirectory: '',
    assetsPublicPath: webpackConfig.buildPublicPath,
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    overwriteAssetsPublicPath: true
};
// 开发环境配置
exports.development = {
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: false
}
// devServer
exports.devServer = {
    host: '127.0.0.1',
    historyApiFallback: true,
    port: webpackConfig.port,
    publicPath: webpackConfig.publicPath,
    open: webpackConfig.open, // 开启浏览器
    hot: true, // 开启热更新
    contentBase: path.resolve(__dirname, "../dist"),
    compress: true,
    // progress: true,
    inline: true, // 构建消息是否会出现在浏览器控制台  :: 如果为false 浏览器则不会自动刷新
    proxy: webpackConfig.proxy,
    stats: "errors-only",
    overlay: {
        warnings: true,
        errors: true
    }
}

// resolve.alias
exports.alias = {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.join(__dirname, '..', 'src'),
    'src': path.join(__dirname, '..', 'src'),
    'static': path.join(__dirname, '..', 'static'),
    'api': path.join(__dirname, '..', 'src/api'),
    'PAGE': path.join(__dirname, '..', 'src/page'),
    'VUEX': path.join(__dirname, '..', 'src/vuex'),
    'root': path.join(__dirname, '..', '')
};
// 忽略打包的node插件
exports.externals = {
    vue: 'Vue',
    vuex: 'Vuex',
    qs: 'Qs',
    axios: 'axios',
    'vue-router': 'VueRouter',
    jquery: 'window.jQuery',
    moment: 'moment',
    lodash: '_',
    echarts: 'echarts',
    sortablejs: 'Sortable',
    'js-cookie': 'Cookies',
    screenfull: 'screenfull',
    'vue-i18n': 'VueI18n',
    'element-ui': 'ELEMENT'
};
exports.jsexclude = /node_modules/;