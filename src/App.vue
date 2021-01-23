<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  font-family: "SF Pro SC, SF Pro Display, SF Pro Icons, PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F2F2F2;
}
</style>
