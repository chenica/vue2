import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carsousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
//关闭生产提示
Vue.config.productionTip = false
//引入路由
import router from '@/router';
//引入vue-x仓库
import store from '@/store';
//引入MockSever。js--mock数据 让数据至少执行一次
import '@/mock/mockServe';
// 引入swiper轮播图样式
import 'swiper/css/swiper.css';
//统一引入api文件夹的接口
import *as API from '@/api';

import { Button, MessageBox } from 'element-ui';
//注册全局element组件
Vue.component(Button.name, Button);
//element还有一种写法挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

//引入图片懒加载
import VueLazyload from 'vue-lazyload'
//引入懒加载预设图片
import tupian from '@/assets/1.jpg'
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: tupian,
})
new Vue({
  render: h => h(App),
  //注册路由：底下的写法KV一致省略V【router小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route，$router属性
  router,
  //注册vue-x仓库：组件实例身上会多一个属性$store属性
  store,
  beforeCreate() {
    //全局事件总线$bus配置
    Vue.prototype.$bus = this;
    //绑定全部接口
    Vue.prototype.$API = API
  },
}).$mount('#app')
