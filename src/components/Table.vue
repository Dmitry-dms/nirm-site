<template>
  <div class="col-md-12 col" >
    <div class="table-responsive">
      <table class="table table-striped table-bordered" style="width: 100%">
        <thead width="100%">
          <th v-for="col in columns" :key="col.name">
            {{ col }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td
              v-for="(el, ind) in row"
              :key="ind"
              :class="{ selected: el.selected }"
            >
              {{ el.field }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  name: "my-table",
  props: {
    rows: { Array },
    columns: { Array },
  },
  methods: {
    // nextPage: function () {
    //   if (this.currentPage * this.pageSize < this.rows.length)
    //     this.currentPage++;
    // },
    // prevPage: function () {
    //   if (this.currentPage > 1) this.currentPage--;
    // },
  },
  mounted() {

  },
  computed: {
    
    // sortedList() {
    //   console.log(this.rows)
    //   return this.rows.filter((row, index)=>{
    //     let start = (this.currentPage-1)*this.pageSize;
    //     let end = this.currentPage*this.pageSize;
    //     if(index >= start && index < end) return true;
    //   })
    // }
  }
};
</script>

<style scoped>
td,
th {
  /* border: 1px solid red; */
  padding: 10px;
}
.col {
  padding-left: 0px;
  padding-right: 0px;
}

.selected {
  background-color: rgb(72, 207, 63);
}
</style>