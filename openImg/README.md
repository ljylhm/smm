# openImg
简化获得图片的方法 && 封装上传图片的方法

### npm i smmopenimg

### openImg的用法

```javascript
   
   let openFile = new OpenFile({
       multiple:true  // 是否多选
       limit:[]       // 允许接受的file类型 默认是全部 
   }) 

   openFile.getLocalImage(async (data)=>{
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

```

```javascript
    // 返回的数据类型
    // getlocalImg对应返回的字段 
    size:number    
    name:string
    type:string
    file:File
    base64Buffer:string
```