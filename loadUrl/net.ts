import { Http } from "@smm/http"
import { Options } from "@smm/result";
declare let initNECaptcha:(data:ICaptchaOpt,onload?:(instance:any)=>void)=>void

interface IProtocol<T>{
    code:number,
    msg:string,
    data:T
}

interface ICaptcha{
    captcha:string
}

interface ICaptchaOpt{
    captchaId?:string
    mode?:string
    element:string | HTMLElement
    protocol?:string
    width?:number | string
    lang?:string
    appendTo?:string | HTMLElement
    onReady?:()=>void
    onVerify?:(err:any,data:{validate:string})=>void
    onClose?:()=>void
    enableClose?:boolean
    extraData?: string | ((data:any) => void)
}

interface IOptions{
    url?:string
    device_type?:string
    NECapOpt:ICaptchaOpt
}

interface INECaptchaInfo{
    validate:string
    instance:any
    captchaId:string
}

const LOCAL_ADDRESS = ["test","127.0.0","local","172"]
const SUCCESS_CODE = 0

let CAPTCHA_TOKEN = ""

// /v2/get_captcha?device_type
class NECaptcha {
               
    public Options:IOptions = {
        NECapOpt:{
            element:""
        }
    } 

    public isWin:boolean = !!typeof window

    public NECaptchaInfo:INECaptchaInfo = {
        validate:"",
        instance:"",
        captchaId:""
    }

    constructor(options?:IOptions) {
        
        if(options){
            this.Options = options

            // 初始化
            this.init()

            this.initNECaptchaSelf(options.NECapOpt,(instance)=>{
                this.NECaptchaInfo.instance = instance
            },options.device_type)

        }else{
            console.warn(`请填写初始配置`)
        }

    }

    // 初始化的工作
    init = ()=>{

        if(!this.isWin) {
            console.warn(`需要在浏览器环境下使用`)
            return
        }

        const isTestEnv:boolean = LOCAL_ADDRESS.some((item) => location.href.indexOf(item) > -1)

        if(!this.Options.url){
            this.Options.url = isTestEnv ? "https://testplatform.smm.cn" : "https://platform.smm.cn"
            this.Options.url = this.Options.url + "/vcodecenter/v2/get_captcha"
        }   

    }

    // 获得captcha
    getNECaptchaID = async (device_type:string = "web") =>{
        let _token:string = ""
        let _captchaWrap = await Http.get<IProtocol<ICaptcha>>(`${this.Options.url}?device_type=${device_type}`)
        let _captcha =  _captchaWrap.map(captchaInfo => { 
            // 如果code返回正确 选择trust
            if(captchaInfo.code == SUCCESS_CODE){
                return Options.Some(captchaInfo.data.captcha)
            }else{
                return Options.None() 
            }
         })
        if(_captcha.some()){
            _token = _captcha.getValue()
        } 
        return _token
    }

    // 初始化Captcha
    // width建议由外部样式控制
    initNECaptchaSelf = async (element:ICaptchaOpt | string | HTMLElement,onload?:(instance:any)=>void,device_type="web") =>{
        
        let _token:string = ""
        if(CAPTCHA_TOKEN){   // 如果令牌存在的话 不需要再请求一次
            _token = CAPTCHA_TOKEN
        }else{
            _token = await this.getNECaptchaID(device_type)
            CAPTCHA_TOKEN = _token
        }

        this.NECaptchaInfo.captchaId = _token
 
        if(!_token){
            console.warn("并未获取到captcha")
        }else{
        
             if(typeof element == "string" || element instanceof HTMLElement){
               
                initNECaptcha({
                    element,
                    captchaId:_token,
                },onload)
             }else{
                let _Object = Object.assign({},element,{captchaId:_token})
                initNECaptcha(_Object,onload)
             }
            
        }  
    }

    // 易盾刷新
    refresh() {
        this.NECaptchaInfo.validate = '';
        this.NECaptchaInfo.instance && this.NECaptchaInfo.instance.refresh();
    }

}

export default NECaptcha