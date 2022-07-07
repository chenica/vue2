<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div 
      class="swiper-slide" 
      v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Car-sousel",
  props: ["list"],
  watch: {
    //为什么watch监听不到list。因为这个数据没有发生变化是父组件直接传过来的
    list: {
      //立即监听，不过数据有没有变化上来先监听一次
      immediate: true,
      handler() {
        //只能监听到数据已经有了。但是v-for渲染结构无法确定所以还是需要nextTick
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //可以点击小球切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>