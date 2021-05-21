<template>
  <div>
    <div>
      <a-row :gutter="[16, 8]">
        <a-col :span="6">
          <a-form-item>
            <a-input @keyup="keyup" placeholder="搜索" block />
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item>
            <span v-if="keyword !== ''">{{ searchResultTotal }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="4" v-if="keyword == ''">
          <a-form-item>
            <a-checkbox v-model:checked="isDone" @change="getItems">未完成</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="11" v-if="keyword == ''" style="display: flex; justify-content: space-between">
          <a-form-item>
            <a-button @click="yestoday">前一天</a-button>
          </a-form-item>

          <a-form-item>
            <span>{{ start.format("MM-DD dd") }}</span>
          </a-form-item>

          <a-form-item>
            <a-button @click="tomorrow">后一天</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </div>

    <ul style="text-align: left">
      <p v-for="(p, index) in data" :key="index">
        <span :class="{ 'job-done': p.status }" v-if="keyword !== ''">
          {{ dayjs(p.start_time * 1000).format("YYYY-MM-DD") }} &nbsp;
        </span>

        <span :class="{'job-item': true, 'job-done': p.status }" @click="edit(p)">{{ p.job_name }}</span>
      </p>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

export default defineComponent({
  components: {},
  data() {
    return {
      store: useStore(),
      dayjs: dayjs,
      data: [],
      keyword: "",
      isDone: false,
      searchResultTotal: 0,
      start: dayjs().startOf("day"),
      end: dayjs().endOf("day"),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log(Array.from(this.store.state.items.todayList));
      if (Array.from(this.store.state.items.todayList).length > 0) {
        this.data = this.store.state.items.todayList
      } else {
        this.getTodayItems();
      }
    },
    getTodayItems() {
      this.getItems();
    },
    getItems() {
      let params = {
        start: this.start.unix(),
        end: this.end.unix(),
      };

      if (this.isDone) {
        params.status = 0;
      }

      axios
        //params:可传递多个参数,固定写法,不能改,否则参数传递失败
        .get("/api/items", {
          params,
        })
        .then((res) => {
          this.store.commit('setTodayList', res.data.data);
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    keyup(e: any) {
      this.keyword = e.target.value.trim();
      if (this.keyword === "") {
        this.searchResultTotal = 0;
        this.getTodayItems();
        return;
      }

      axios
        //params:可传递多个参数,固定写法,不能改,否则参数传递失败
        .get("/api/items/search", {
          params: { keyword: this.keyword },
        })
        .then((res) => {
          this.data = res.data.data;
          this.searchResultTotal = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    yestoday() {
      this.start = this.start.subtract(1, "day");
      this.end = this.end.subtract(1, "day");
      this.getItems();
    },
    tomorrow() {
      this.start = this.start.add(1, "day");
      this.end = this.end.add(1, "day");
      this.getItems();
    },
    edit(item: any): void {
      this.$router.push({
        name: "TodayFormEdit",
        params: { id: item.id, item: JSON.stringify(item) },
      });
    },
  },
});
</script>

<style>
.job-item {
  cursor: pointer;
}
.job-done {
  color: #bbbbbb;
}
</style>
