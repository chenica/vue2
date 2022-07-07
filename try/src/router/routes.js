//配置路由
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCarSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import myOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";
export default [{
    path: "/center",
    component: Center,
    name: "center",
    meta: { show: true },
    //二级路由组件
    children: [
        {
            path: 'myorder',
            name: "myorder",
            component: myOrder,
        },
        {
            path: 'grouporder',
            component: groupOrder,
        }, {
            path: '/center',
            redirect: '/center/myorder'//让组件跳转到center下自动展示myorder子路由
        }
    ]
},
{
    path: "/paysuccess",
    component: PaySuccess,
    name: "paysuccess",
    meta: { show: true }
},
{
    path: "/pay",
    component: Pay,
    name: "pay",
    meta: { show: true },
    beforeEnter:(to,from,next)=>{
        if(from.path=='/trade'){
            next()
        }else{
            next(false);
        }
    }
    

},
{
    path: "/trade",
    component: Trade,
    name: "trade",
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
        //去交易页，必须从购物车来
        if(from.path == '/shopcart'){
            next()
        }else{
            //其他的路由组件而来，停留在当前
            next(false)
        }
    }
},
{
    path: "/shopcart",
    component: ShopCart,
    // name: "shopcart",
    meta: { show: true }
},
{
    path: "/addcarsuccess:gg?",
    component: AddCarSuccess,
    name: "addcarsuccess",
    meta: { show: true }
},
{
    //meta属性是加到路由组件中 让路由判断自己显示还是隐藏
    path: "/detail/:id?",
    component: Detail,
    meta: { show: true }
},
{
    path: "/home",
    component: Home,
    meta: { show: true }
},
{

    //:keyword是params的占位符 
    //? 问号是没有参数的时候可以正常路径
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search"
},
{
    path: "/login",
    component: Login,
    meta: { show: false }
}, {
    path: "/register",
    component: Register,
    meta: { show: false }
},
// 重定向，在项目跑起来的时候，访问/,立马让他定向到首页
{
    path: '*',
    redirect: "/home"
}

]