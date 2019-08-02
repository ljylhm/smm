const path = require("path");
const merge  = require ("webpack-merge");

const ENV = process.env.NODE_ENV || "dev"

const ENVLIST = {                                   // 环境变量对应执行的环境
    "dev":"dev",
    "prod":"prod",
    "test":"prod"     
}

const mapPath = {
    "dev": path.resolve(__dirname,"./config/webpack.config.dev"),
    "prod": path.resolve(__dirname,"./config/webpack.config.prod"),
    "common": path.resolve(__dirname,"./config/webpack.config.base"),
}

let commonConfig = require(mapPath["common"])
let currentConfig = require(mapPath[ENVLIST[ENV]])

module.exports = merge.smart(commonConfig,currentConfig)





