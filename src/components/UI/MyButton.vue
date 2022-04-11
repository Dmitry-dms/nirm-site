<template>
  <button class="btn">
    <!-- все, что помещаем внутрь my-button уходит в slot -->
    <slot> </slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style>
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
.btn:hover {
  background-color: rgb(8, 133, 133);
  color: white;
}

</style>