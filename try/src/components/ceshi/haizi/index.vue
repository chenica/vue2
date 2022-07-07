<template>
  <div style="background: #ccc; height: 50px">
    <span>小明每次花100元</span>
    <button @click="$emit('update:money',money-10)">花钱</button>
    爸爸还剩{{money}}
  </div>
</template>

<script>
export default {
    name:'haizi-',
    props:['money']
};
</script>

<style>
</style>