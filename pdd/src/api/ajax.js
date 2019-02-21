//引入axios
import axios from 'axios'
//对axios的get和post请求进行组件封装
export default function ajax(url = '',params = {}, type = 'GET'){
   let promise ;
   return new Promise((resolve,reject)=>{
       if('GET'=== type){
         //如果是get请求，将会用axios.get('http://localhost:3000/?name=zl&age=18')的方式请求
             let paramsStr = '';
             Object.keys(params).forEach( key => {
                 paramsStr += key +'='+ params[key] + '&'
             });
             //过滤掉url最后面的&
             if(paramsStr !== ''){
                 paramsStr  = paramsStr.substr(0,paramsStr.lastIndexOf('&'))
             }
             url = url + '?' + paramsStr;
             //发起axios的get请求
             promise = axios.get(url)
       }else if ('POST' === type){
             //发起axios的post请求
             promise = axios.post(url,params)
       }
        //返回请求的结果
        promise.then(response =>{
            console.log(response);
            console.log(response.data);
            resolve(response.data)
        }).catch(error =>{
            reject(error)
        })
   })
}
