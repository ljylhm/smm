const path = require("path")

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
        path: path.resolve(__dirname,"./../dist")
    },

    module:{
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    devServer:{
        host: "testlocal.smm.cn",
        port: "8004",
        inline: true,
        open: true,
        compress: true, // 打包的内容进行压缩
        hot: true,
        disableHostCheck: false,
        proxy:{
            "/vcodecenter/**":{
                target: 'https://testplatform.smm.cn',
                secure: false,
                changeOrigin: true
            }
        }
    }
}