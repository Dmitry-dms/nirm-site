<template>
  <div class="item">
    <div>
      <div><strong>Дата:</strong> {{ item.date }}</div>
    </div>
    <div class="item__btns">
      <my-button @click="pushItem">Открыть</my-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pushItem() {
      this.$router.push(`/info/${this.item.id}`);
    },
  },
};
</script>

<style scoped>
.item {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item__btns {
  display: flex;
}
</style>