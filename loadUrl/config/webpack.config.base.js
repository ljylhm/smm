const path = require("path")
module.exports = {
    entry:{
        "index":"./index.ts",
        "load":"./load.ts",
        "net":"./net.ts"
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname,"./../js")
    },

    resolve:{
        extensions: ['.js', '.json','.ts','.tsx']
    }
}