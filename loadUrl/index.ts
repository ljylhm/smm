// import LoadUrl  from "./load"
// import NECaptcha  from "./net"
import { LoadUrl,NECaptcha } from "smmloadurl"
const btn_1 = document.querySelector("#btn-1") as HTMLDivElement
const btn_2 = document.querySelector("#btn-2") as HTMLDivElement

let neCap:NECaptcha
btn_1.addEventListener("click",()=>{
    LoadUrl.loadurl("http://cstaticdun.126.net/load.min.js",(status)=>{
         neCap = new NECaptcha({
            NECapOpt:{
                element:".container-box",
                onVerify(err,data){
                    console.log(neCap.NECaptchaInfo)
                    neCap.NECaptchaInfo.validate = data.validate
                }
            }
        })
    })
})

btn_2.addEventListener("click",()=>{
    neCap.refresh()
})



export {
    LoadUrl,
    NECaptcha
} 

