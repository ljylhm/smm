const path = require("path")
module.exports = {
    entry:{
        "index":"./index.ts",
        "openFile":"./openFile.ts",
        "upLoadImg":"./upLoadImg.ts"
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname,"./../dist")
    },

    resolve:{
        extensions: ['.js', '.json','.ts','.tsx']
    }
}