<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/category">分类</router-link> |
    <router-link to="/project">项目</router-link> |
    <router-link to="/today">当日</router-link> |
    <router-link to="/the-week">本周</router-link> |
    <router-link to="/the-month">本月</router-link>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup: () => {
    const count = ref(0);
    return { count };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
#nav {
  margin-bottom: 1em;
  font-size: 1.3em; 
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
