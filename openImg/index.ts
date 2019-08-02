import  OpenFile from "./openFile"
import UpLoadImg from './upLoadImg';

const clickme = document.querySelector("#clickme") as HTMLDivElement
const show_img_1 = document.querySelector("#show-img-1") as HTMLImageElement
const show_img_2 = document.querySelector("#show-img-2") as HTMLImageElement

const upload_img = "https://testuser.smm.cn/upload_img"
const upload_avatur = "https://testuser.smm.cn/upload_img"

// 上传头像的地址
const uploadAvatar = async (file:File)=>{
    const imgWrap = await UpLoadImg.upLoadImg("",{
        file:file,
        name:"c_img",
        cat:"c/image/"
    })
    if(!imgWrap.some()){
        console.log("判断发生一点意外")
    }else{
        console.log(imgWrap.getValue())
    }
}


clickme.addEventListener("click",()=>{
   let t = new OpenFile({
       multiple:true
   })

   t.getLocalImage(async (data)=>{
           data.forEach((item,index)=>{
                if(index == 1){
                    show_img_1.src = item.base64Buffer
                }else{
                    show_img_2.src = item.base64Buffer
                }
           })
   })

})







