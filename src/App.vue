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
}
li, ul{
  list-style: none;
}
</style>
