<template>
  <div class="selector" v-for="val in mass" :key="val.name">
    <div class="name" :class="{ active: val.selected }" @click="$emit('upd',val)">{{ val.name }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props: {
      mass: [Array]
  },
  methods: {
     
  }
};
</script>

<style>
.selector {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  display: inline-flex;
}
.name {
  margin-top: 5px;
  margin-right: 5px;
  padding: 5px;
  border: 1px solid #000;
}
.name.active {
  background-color: green;
}
.name:hover {
  background-color: khaki;
}
</style>