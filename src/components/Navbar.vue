<template>
  <div class="nav" @click.self="toggleNavbar" :class="{ active: isActive }">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
import { mapState, mapMutations} from "vuex";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations({
      toggleNavbar: "changeIsActive",
     
    })
  },
  computed: {
    ...mapState({
      isActive: (state) => state.isActive,
    }),
  },
};
</script>

<style>
.nav {
  width: 10vh;
  height: 100vh;
  background-color: burlywood;
  transition-duration: 0.2s;
  transition-property: width;
}
.nav.active {
  width: 30vh;
}
</style>