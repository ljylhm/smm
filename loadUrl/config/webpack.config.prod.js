const path = require("path")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PACKAGECONFIG = require("./../package.json")

// 正式环境下 将文件打包成类库

module.exports = {
    output:{
        library:PACKAGECONFIG.name,                       // 类库的名字
        globalObject: 'this',                             // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
        libraryTarget:"umd"                               // 定义打包的方式 #https://webpack.js.org/guides/author-libraries/#root 
    },

    module:{
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    plugins:[
        new BundleAnalyzerPlugin()
    ]
}