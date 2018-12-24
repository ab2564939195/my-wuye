import { message} from 'antd';

import appConfig from '../appConfig';
import axios from 'axios';
let apiRootPath = appConfig.apiRootPath;

class Api {
    static api = new Api();
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
                console.log(res);
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
}

let ApiImp = new Api();
export default ApiImp;
