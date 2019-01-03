import { message} from 'antd';

import appConfig from '../appConfig';
import axios from 'axios';
import jsUtil from "../util/JsUtil";
let apiRootPath = appConfig.apiRootPath;

class Api {
    apiRootPath = appConfig.apiRootPath;
    constructor() {
        console.log('运行环境：', process.env.NODE_ENV, appConfig);
    }
    postWithAuth(uri, params) {
        let url = apiRootPath + uri;
         let fd = new FormData();
         fd.append("json",JSON.stringify(params));
        return new Promise((resolve, reject) => {
            axios.post(url,fd,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                resolve(res.data);
                console.log(res.data);
            }).catch(err => {
                reject(err.data);
                message.error('网络请求异常', 1);
                console.log(err);
            });
        });
    }
    getWithAuth(uri, params) {
        let url = apiRootPath + uri+"/"+JSON.stringify(params);
        console.log(url);
        return new Promise((resolve, reject) => {
            axios.get(url).then(res => {
                resolve(res.data);
                console.log(res);
                console.log(res.data);
            }).catch(err => {
                reject(err.data);
                message.error('网络请求异常',0.5);
                console.log(err);
            });
        });
    }

    /**
     * 判断是否登陆
     */
     isLoginState(){
        let userId = localStorage.getItem("userId");
        let loginTime = localStorage.getItem("loginTime");
        if (jsUtil.isEmpty(userId) || jsUtil.isEmpty(loginTime)) {
            return false;
        }
        let expirationTime = 9000000;
        let nweTime = new Date().getTime();
        if(nweTime - Number(loginTime) > expirationTime){
            console.log("登陆过程");
            localStorage.clear();
            return false;
        }
        return true;
    }
}

let ApiImp = new Api();
export default ApiImp;
