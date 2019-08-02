# LoadUrl
动态加载脚本 && 封装云盾常用方法

```javascript

import { LoadUrl,NECaptcha } from "smmloadurl"
const btn_1 = document.querySelector("#btn-1") as HTMLDivElement
const btn_2 = document.querySelector("#btn-2") as HTMLDivElement

let neCap:NECaptcha
btn_1.addEventListener("click",()=>{
    // 先将云盾的js加载过来
    LoadUrl.loadurl("http://cstaticdun.126.net/load.min.js",(status)=>{
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
    })
})

btn_2.addEventListener("click",()=>{
    // 更新
    neCap.refresh()
})

```