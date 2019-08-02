import { Http,SUCCESS_CODE } from "@smm/http"
import { Options } from "@smm/result";

interface IPastData{
    file:File,
    name:string,
    cat?:string
}

interface IUploadResponse {
	code: number;
	fileurl: string;
	target: string;
}

const LOCAL_ADDRESS = ["test","127.0.0","local","172"]
const isTestEnv =  LOCAL_ADDRESS.some((item) => location.href.indexOf(item) > -1)     // 判断是否是测试环境

export default class UpLoadImg{ 
    static upLoadImg = async (url:string,pastData:IPastData)=>{        // 上传图片
        
        // 如果不指定名字 会使用默认名字
        const name = pastData.name 

        if(!url){
            console.error("至少需要一个参数值")
            return Options.None()
        }

        if(!name){
            console.error("名字是必须的")
        }

        if(pastData && pastData.file){
            const fd = new FormData();
            fd.append(name, pastData.file);
            fd.append("name", name);
            fd.append("cat", pastData.cat || "");

            const uploadWrap = await Http.post<IUploadResponse>(url,fd)
            return uploadWrap.map<string>(imgDetail=>{
                if(imgDetail.code == SUCCESS_CODE){
                    return Options.Some(imgDetail.fileurl)
                }else{
                    return Options.None()
                }
            })    
        }  

        return Options.None()
    }

}