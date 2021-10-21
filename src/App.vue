<template>
  <navbar></navbar>
  <router-view/>
</template>


<script>
import Navbar from "@/components/Navbar";
export default {
  components: {Navbar}
}
</script>

<style>
#app {
 display: flex;
 }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>