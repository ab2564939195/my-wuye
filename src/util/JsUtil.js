 class JsUtil {

    isEmpty(obj){
        if(obj === undefined || obj === null || obj === '' || obj === ""){
            return true;
        }
        return false;
    }
}
let jsUtil = new JsUtil();
export default jsUtil;
