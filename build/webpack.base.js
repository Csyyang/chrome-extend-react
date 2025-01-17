const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        main: path.join(__dirname, "../src/index.tsx"),//入口文件
        test: path.join(__dirname, "../src/test.jsx"),//入口文件
    },
    output: {
        filename: "[name].js",//每个输出的js文件的名称
        path: path.join(__dirname, "../dist"),//打包结果输出的路径
        clean: true,//webapck5内置的，webpack4中需要配置clean-webpack-plugin来删除之前的dist
        publicPath: "/"//打包后文件的公共前缀路径
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,//匹配ts、tsx文件
                use: {
                    loader: "babel-loader",
                    options: {
                        //预设执行顺序由右往左，所以这里是先处理ts再处理jsx
                        presets: [
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /.(js|jsx)$/,//匹配ts、tsx文件
                use: {
                    loader: "babel-loader",
                    options: {
                        //预设执行顺序由右往左，所以这里是先处理ts再处理jsx
                        presets: [
                            "@babel/preset-react",
                        ]
                    }
                }
            },

        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),//模板用定义root节点的模板
            inject: true,//自动注入静态资源
            chunks: ['main'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/manifest.json', to: '' }, // 将 src/assets 目录下的所有文件复制到 dist/assets
                { from: 'src/background.js', to: '' },    // 将 index.html 文件复制到 dist 目录
                { from: 'src/contentScript.js', to: '' },    // 将 index.html 文件复制到 dist 目录
                { from: 'src/assets', to: 'assets' },    // 将 index.html 文件复制到 dist 目录
            ],
        }),
    ]
}
