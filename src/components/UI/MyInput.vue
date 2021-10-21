<template>
  <input :value="value" @input="updateInput" class="input" type="text" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    value : [String, Number],
  },
  methods: {
    updateInput(event) {
      // value, т.к. в [PostForm] v-model:value
      this.$emit("update:value", event.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px;
  margin-top: 15px;
}
</style>