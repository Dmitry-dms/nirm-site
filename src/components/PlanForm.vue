<template>
  <!-- убираем стандартное действие браузера по умолчанию-->
  <form @submit.prevent>
    <h3>Планирование проверки</h3>
    <div class="selection">
      <div class="perechen__select">
        <h4>Выберите Перечень</h4>
        <my-select
          :options="perechenOptions"
          style="margin-left: 40px; width: 150px"
          :modelValue="selectedPerechen"
          @update:modelValue="choosePerechen"
        />
      </div>
      <div class="sql__select">
        <h4>Выберите базу данных</h4>
        <my-select
          :options="sqlOptions"
          style="margin-left: 70px; width: 150px"
          :modelValue="selectedSql"
          @update:modelValue="chooseSql"
        />
      </div>
    </div>

    <div class="table_names" v-if="showTables === true">
      <h4 style="margin-top: 20px">В какой таблице проводить проверку?</h4>

      <my-select
        :options="tables"
        style="margin-left: 200px; width: 150px; margin-top: 20px"
        :modelValue="selectedTable"
        @update:modelValue="chooseTable"
      />
    </div>

    <div class="column_names" v-if="showColumns === true">
      <h4 style="margin-top: 20px">По каким столбцам проводить проверку?</h4>
      <column-selector :mass="test" @upd="updateSelection" />
    </div>

    <div class="btn__holder">
      <my-button v-if="loading === false" @click="sendToBackend">
        Запустить
      </my-button>
      <div v-else class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </form>
</template>

<script>
import ColumnSelector from "./ColumnSelector.vue";
import MyButton from "./UI/MyButton.vue";
export default {
  components: { ColumnSelector, MyButton },
  data() {
    return {
      selectedSql: "",
      selectedSqlPath: "",
      selectedPerechen: "",
      selectedPerechenPath: "",
      selectedTable: "",
      showTables: false,
      showColumns: false,
      columnsSelected: false,
      tables: [],
      loading: false,
    };
  },
  props: {
    perechenOptions: [Array],
    sqlOptions: [Array],
  },
  methods: {
    chooseSql(name) {
      this.showColumns = false;
      this.clearSelection();
      this.selectedSql = name;
      let indSql = this.sqlOptions.findIndex(
        (i) => i.name === this.selectedSql
      );
      this.selectedSqlPath = this.sqlOptions[indSql].path;
      this.tables = this.sqlOptions[indSql].tables;
      this.showTables = true;
    },
    chooseTable(tableName) {
      this.clearSelection();
      this.selectedTable = tableName;

      let ind = this.tables.findIndex((i) => i.name === tableName);
      this.test = this.tables[ind].columns;
      this.showColumns = true;
    },
    choosePerechen(name) {
      this.selectedPerechen = name;
      let ind = this.perechenOptions.findIndex((i) => i.name === name);
      this.selectedPerechenPath = this.perechenOptions[ind].path;
    },
    createPost() {
      // this.post.id = Date.now();
      // // генерируем событие для изменения массива постов
      // this.$emit("create", this.post);
      // this.post = {};
    },
    updateSelection(val) {
      for (let i = 0; i < this.tables.length; i++) {
        for (let j = 0; j < this.tables[i].columns.length; j++) {
          if (this.tables[i].columns[j].name === val.name) {
            if (this.tables[i].columns[j].selected === true) {
              this.tables[i].columns[j].selected = false;
            } else {
              this.tables[i].columns[j].selected = true;
            }
          }
        }
      }
      this.columnsSelected = true;
    },
    clearSelection() {
      for (let i = 0; i < this.tables.length; i++) {
        for (let j = 0; j < this.tables[i].columns.length; j++) {
          this.tables[i].columns[j].selected = false;
        }
      }
      this.columnsSelected = false;
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    sendToBackend() {
      if (
        this.selectedSql === "" ||
        this.selectedPerechen === "" ||
        this.selectedTable === "" ||
        this.columnsSelected === false
      ) {
        alert("Заполните все поля!")
        return;
      }
      this.loading = true;
      let ind = this.tables.findIndex((i) => i.name === this.selectedTable);
      let colums = this.tables[ind].columns;
      let added = [];
      colums.forEach((val) => {
        if (val.selected === true) {
          added.push(val.name);
        }
      });
      let selected = {
        pPath: this.selectedPerechenPath,
        sqlPath: this.selectedSqlPath,
        table: this.selectedTable,
        uid: this.uuidv4(),
        columns: added,
      };
      console.log(JSON.stringify(selected));
      const options = {
        method: "POST",
        body: JSON.stringify(selected),
      };
      fetch(`http://localhost:${this.$store.state.port}/search`, options)
        .then((response) => response.json())
        .then((response) => {
          this.loading = false;
          this.$emit("create", response);
          this.$router.push(`/info/${response.id}`);
        });
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
.btn__holder {
  align-self: flex-end;
  margin-top: 15px;
}
.selection {
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
}
.perechen__select {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.sql__select {
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
}
.table_names {
  width: 100%;
}
.column_names {
  width: 100%;
}
h4 {
  margin: 0;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 10px;
}
.lds-ellipsis div {
  position: absolute;
  /* top: 5px; */
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: teal;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>