export enum Type {
    normal = "normal", 
    async = "async",
    defer = "defer"
}

interface IOptions{
    success?:ICallback
    error?:ICallback
    type?:Type
    isBefore?:boolean
}

interface ICallback{
    ():void
}

interface ICallbackParam{
    (status:boolean):void
}

class LoadUrl{

    // 判断是否浏览器环境
    static inWin = ()=> !!typeof window

    static loadurl(url:string,opts:IOptions | ICallbackParam){

        if(this.inWin()){

            const scriptTag : HTMLScriptElement = document.createElement("script")
            const firstScpt : HTMLScriptElement = document.getElementsByTagName("script")[0]
            const bodyNode: HTMLBodyElement = document.getElementsByTagName("body")[0]

            const DEFAULT_FN:ICallback = ()=>{}  // 默认的函数 什么都不执行
            const TYPE:Type = Type.normal
            const SITE:boolean = true

            // 插入的方法
            const insert:(node:HTMLScriptElement | undefined,site:boolean)=>void = (node,site)=>{
                const _parent_node = (node && node.parentNode) || bodyNode 
                if(site && node && node.parentNode){
                    _parent_node.insertBefore(scriptTag,firstScpt)              
                } else{
                    _parent_node.appendChild(scriptTag)
                }
            }

            scriptTag.src = url
           
            if(typeof opts === "function"){
                // 1. 注册加载成功的事件
                scriptTag.addEventListener("load",()=>{
                    opts && opts(true)
                })
                scriptTag.addEventListener("error",()=>{
                    opts && opts(false)
                })
                insert(firstScpt,true)

            }else{

                scriptTag.addEventListener("load",opts.success || DEFAULT_FN)
                // 2. 注册加载失败的事件
                scriptTag.addEventListener("error",opts.error || DEFAULT_FN)
                const _type = opts.type || TYPE
                const _site = opts.isBefore || SITE

                // about 类型
                if(_type == Type.async){
                    scriptTag.async = true
                }else if(_type == Type.defer){
                    scriptTag.defer = true
                }

                // about 位置
                insert(firstScpt,_site)
            }

        }    
    }

}

export default LoadUrl