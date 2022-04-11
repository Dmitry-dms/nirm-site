<template>
  <div class="container">
    <h1>Информация о проведенной проверке</h1>
    <h3>База sql: {{ item.sqlName }}</h3>
    <h3>Перечень: {{ item.pName }}</h3>
    <h3>Дата проверки: {{ item.date }}</h3>

    <div class="table"  v-if="item.rows.length != 0">
      <my-button @click="openTab" style="width: 200px"
        >Открыть в JSON</my-button
      >
      <my-table
        :rows="item.rows"
        :columns="item.columns"
        style="margin-top: 10px"
       
      />
    </div>

    <h3 v-else><u>Совпадений не найдено</u></h3>
  </div>
</template>

<script>
import MyTable from "@/components/Table.vue";
export default {
  components: { MyTable },

  data() {
    return {
      item: {},
    };
  },
  methods: {
    openTab() {
      let data = JSON.stringify(this.item);
      var tab = window.open("about:blank", "_blank");
      tab.document.write(data); 
      tab.document.close(); 
    },
  },
  mounted() {
    let history = this.$store.getters.getHistory;
    let ind = history.findIndex((i) => i.id === this.$route.params.id);
    this.item = history[ind];
    console.log(this.item);
  },
};
</script>

<style>
.container {
  /* margin: auto; */
  display: flex;
  flex-direction: column;
}
.container h3 {
  /* margin: 5px; */
  /* border: 1px solid red; */
}
.table {
  margin-top: 20px;
}
.border_bottom_red {
  border-bottom: 1px solid #f00;
}
</style>