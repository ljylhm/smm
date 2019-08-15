# LoadUrl
动态加载脚本 && 封装云盾常用方法

### npm i smmloadurl

### LoadUrl的用法
#### 简单使用
```javascript
   LoadUrl.loadurl("http://cstaticdun.126.net/load.min.js",()=>{
       // todo
   })
```
#### 常用配置使用
```javascript
    LoadUrl.loadurl("http://cstaticdun.126.net/load.min.js",{
        error(){} // 失败的时候走的回调 
        success(){} // 成功时候的回调
        type:string // 插入的script标签的类型 类型固定 只能从导出的type中取
        isBefore:boolean // 插入的位置 后面还是前面
    })
```

```javascript

import { LoadUrl,NECaptcha,Type } from "smmloadurl"
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

## 配置

```javascript

let neCap:NECaptcha
btn_1.addEventListener("click",()=>{
    LoadUrl.loadurl("http://cstaticdun.126.net/load.min.js",{
        success(){
            console.log(123)
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
        isBefore:true,
        type: Type.defer
    })
})

btn_2.addEventListener("click",()=>{
    neCap.refresh()
})

```