const path = require("path")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getCurrentIp = ()=> {
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
        var iface = interfaces[devName];  
        for(var i=0;i<iface.length;i++){  
            var alias = iface[i];  
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                    return alias.address;  
            }  
        }  
    } 
}

module.exports = {
    entry:{
        index:"./index.ts"
    },

    output:{
        filename: "[name].js",
        path: path.resolve(__dirname,"./dist"),
    },

    resolve:{
        extensions: ['.js', '.json','.ts','.tsx']
    },

    module:{
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    devServer:{
        host: getCurrentIp(),
        port: "8003",
        inline: true,
        open: true,
        compress: true, // 打包的内容进行压缩
        hot: true,
        proxy:{
            // "/upload_img/**":{
            //     target: 'https://testuser.smm.cn',
            //     secure: false,
            //     changeOrigin: true
            // }
        }
    },

    plugins:[
        // new BundleAnalyzerPlugin()
    ]

}