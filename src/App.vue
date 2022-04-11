<template>
<div class="app">
  <router-view></router-view>
</div>
</template>


<script>


export default {
  mounted() {
    this.$store.commit('loadSettings')
  }
};
</script>

<style>
.app {
  display: flex;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,*::before,*::after {
  box-sizing: inherit;
}
</style>