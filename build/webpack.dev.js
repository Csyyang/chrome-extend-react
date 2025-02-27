const path = require("path")
const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base.js")

//合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig, {
    mode: "development",//开发模式下打包速度更快，省去了一些代码优化步骤

    devtool: "eval-cheap-module-source-map",//源码调试的模式，后面单独会说

    devServer: {
        port: 3000,//服务端口号
        hot: true,//开启热模块替换功能，后面会有对react模块热替换的具体配置
        compress: false,//gzip压缩，开发环境下不用开启，提升热更新的速度
        historyApiFallback: true,//解决history路由一刷新变404的问题
        static: {
            directory: path.join(__dirname, "../public"),//托管静态资源public文件夹
        }
    }
})
