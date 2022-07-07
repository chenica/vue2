//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入总路由组件
import routes from './routes';
//y引入store
import store from '../store'
//先把Vue Router原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.Replace;
//重写push|replace 不重写多次点击会报错
//第一个参数：告诉原来的push方法。你往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    }
    else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.Replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    }
    else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

let router = new VueRouter({
    routes,
    //让滚动条位于浏览器最上方（y轴）
    scrollBehavior() {
        return { y: 0 };
    }


});
// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to 可以获得到你要跳转的那个路由信息
    //from 可以获取你到哪个路由而来的信息
    //next  放行函数  1.next（）都放行   2.next（'/home'）放行到home路由
    
    //用户已经登录了
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userIofo.name;
  
    if (token) {
        //用户已经登录了。不能再去登录页面
        if (to.path == '/login') {
            next('/home')
        } else {
            //已经登录了。去的不是login登录页面就放行
            if (name) {
                next();
            } else {
                //没有用户信息，派发action 让仓库存储用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效了，清楚token
                    await store.dispatch('userLogout')
                    next('/login')

                }
            }
        }
    } else {
       //未登录:不能去交易、支付、个人中心相关页面
       //未登录 跳转到登录页面
       let toPath =to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            console.log(to);
            next('/login')
        }
        next();
    }

});

export default router