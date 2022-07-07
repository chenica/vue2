<template>
  <div id="app">
  <Header></Header>
  <!--路由组件出口的地方!-->
  <router-view></router-view>
  <!-- 在Home、Search是显示的，在登陆、注册是隐藏 -->
  <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
      Header,
      Footer,
  },
  mounted(){
    //通知Vuex发请求，获取数据。存储于仓库当中
    //派发一个
    this.$store.dispatch("categoryList");
  },
};

</script>

<style>
    
</style>
