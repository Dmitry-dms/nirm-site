<template>
  <div class="home">
    <div class="hello" v-if="allHistory.length === 0">
      <h1>Список проверок пуст, запустите новую проверку</h1>
      <my-button @click="showDialog" class="hello__btn">Запустить</my-button>
    </div>
    <div class="hist__list" v-else>
      <h1>Список проведенных проверок</h1>
      <history-list :history="allHistory" />
      <div class="btn__container">
        <my-button  @click="openTab" style="width: 150px; margin-right:10px;"
          >Открыть в JSON</my-button
        >
        <my-button @click="showDialog">Добавить</my-button>
      </div>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <plan-form
        :perechenOptions="$store.state.perechenOptions"
        :sqlOptions="$store.state.sqlOptions"
        @create="addHistory"
      />
    </my-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import HistoryList from "@/components/HistoryList.vue";
import PlanForm from "../components/PlanForm.vue";
import MyButton from "../components/UI/MyButton.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    HistoryList,
    PlanForm,
    MyButton,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    addHistory(history) {
      this.history.push(history);
    },
    openTab() {
      let data = JSON.stringify(this.allHistory);
      var tab = window.open("about:blank", "_blank");
      tab.document.write(data);
      tab.document.close();
    },
  },
  computed: {
    ...mapState({
      history: (state) => state.history,
    }),
    ...mapGetters({
      allHistory: "getHistory",
    }),
  },
  mounted() {
    this.$store.commit("loadHistory");
    // this.history = this.$store.getters.getHistory;
  },
};
</script>

<style scoped>
.home {
  /* margin: 0 auto; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.hist__list {
  position: absolute;
  left: 25%;
  /* margin: 50vh auto; */
}
.hello {
  position: absolute;
  left: 5%;
  right: 5%;
  margin: 50vh auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
h1 {
  margin: 0;
}
.hello__btn {
  margin-left: 40px;
}
.btn__container {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  right: 0;
  position: absolute;
}
.add__btn {
  
  /* right: 0;
  position: absolute; */
}
</style>
