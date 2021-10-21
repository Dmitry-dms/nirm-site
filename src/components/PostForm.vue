<template>
  <!-- убираем стандартное действие браузера по умолчанию-->
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
      v-model:value="post.title"
      v-focus
      type="text"
      placeholder="Название"
    />
    <my-input v-model:value="post.body" type="text" placeholder="Описание" />
    <my-button
      @click="createPost"
      style="align-self: flex-end; margin-top: 15px"
      >Add</my-button
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      // генерируем событие для изменения массива постов
      this.$emit("create", this.post);
      this.post = {};
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
</style>