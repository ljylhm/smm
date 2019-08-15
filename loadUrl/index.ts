import { LoadUrl,NECaptcha,Type } from "smmloadurl"

const btn_1 = document.querySelector("#btn-1") as HTMLDivElement
const btn_2 = document.querySelector("#btn-2") as HTMLDivElement

let neCap:NECaptcha
btn_1.addEventListener("click",()=>{
    LoadUrl.loadurl("http://cstaticdun.126.net/load.min.js",{
        success(){
            console.log("成功返回")
            // 初始化一个云盾的实例
            neCap = new NECaptcha({
                NECapOpt:{
                    element:".container-box",
                    onVerify(err,data){
                        console.log(neCap.NECaptchaInfo)
                        neCap.NECaptchaInfo.validate = data.validate
                    }
                }
            })
        },
        error(){
            console.log("发生了错误")
        },
        isBefore:false,
        type: Type.defer
    })
})

btn_2.addEventListener("click",()=>{
    neCap.refresh()
})

export {
    LoadUrl,
    NECaptcha,
    Type
} 

