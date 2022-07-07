<template>
  <div>
    小明的爸爸有{{ money }}元
    <haizi :money="money" @update:money="money=$event"></haizi>
  </div>
</template>

<script>
import haizi from "./haizi/index.vue";
export default {
  name: "fa-ther",
  components: {
    haizi,
  },
  data() {
    return {
      money: 10000,
    };
  },
  mounted(){
    console.log();
    
  }
  
};
</script>

<style>
</style>