
<template>
  <div>
    <transition-group name="post-list">
      <history-item v-for="item in history" :key="item.id" :item="item" />
    </transition-group>
  </div>
</template>

<script>
import HistoryItem from "@/components/HistoryItem";

export default {
  components: { HistoryItem },
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
  mounted() {
   
  },
};
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>