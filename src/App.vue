<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0px;
  list-style: none;
  text-decoration: none;
  outline: none;
  border: none;
}
html,body{
  height: 100vh;
}
#app {
  min-width: 375px;
  max-width: 750px;
  margin: auto;
  height: 100%;
  overflow: hidden;
}
.active{
  background-color: #ccc;
  color: #3878ff!important;
}
</style>
