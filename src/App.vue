<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app, html, body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
li, ul{
  list-style: none;
}
/* .el-icon-close:before{
  color: #000!important;
} */
</style>
