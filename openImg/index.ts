import {OpenFile,UpLoadImg} from "smmopenimg"

const clickme = document.querySelector("#clickme") as HTMLDivElement
const show_img_1 = document.querySelector("#show-img-1") as HTMLImageElement
const show_img_2 = document.querySelector("#show-img-2") as HTMLImageElement

const upload_img = "https://testuser.smm.cn/upload_img"

// 上传头像的地址
const uploadAvatar = async (file:File)=>{
    const imgWrap = await UpLoadImg.upLoadImg(upload_img,{
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
    console.log(123321)
    
   let t = new OpenFile({
       multiple:true
   })

   t.getLocalImage(async (data)=>{
           data.forEach((item,index)=>{
                console.log("获得的信息",item)
                if(index == 0){
                    show_img_1.src = item.base64Buffer
                }else{
                    show_img_2.src = item.base64Buffer
                }
           })
           await uploadAvatar(data[0].file)
   })
})

export {
    UpLoadImg,
    OpenFile
}







