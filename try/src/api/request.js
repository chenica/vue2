// 对于 axios进行二次封装
import axios from "axios";
//引入nprogress 进度条
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//在当前模块中引入store
import store from "@/store";


//start 进度条开始 done 进度条结束
//1：利用axios对象的方法create，去创建一个axios实例
//2：request 就是axios 只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候。路径当前会出现api
    baseURL: '/api',
    //代表请求超时时间5秒
    timeouts: 5000,
});
//请求拦截器：在发请求之前。请求拦截器可以检测到。可以在请求发出去前做一些事情
requests.interceptors.request.use((config) => {
    nprogress.start();//进度条开始动
    
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段userTempId。和后台商量好。
        config.headers.userTempId =store.state.detail.uuid_token;
    }
    //需要携带token给服务器
    if (store.state.user.token){
        config.headers.token = store.state.user.token
        
    }
    return config;//config:配置对象。对象里面有一个属性很重要，headers请求头 
})
//响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done();//进度条结束
    return res.data;//成功的回调函数：服务器相应数据回来以后，响应式拦截器可以检测到，可以做一些事情
}), (error) => {
    //响应失败的回调函数
    return Promise.reject(new error('faile'));
};
//对外暴露
export default requests;