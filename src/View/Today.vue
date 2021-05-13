<template>
  <div>
    查询：<input @keyup="keyup" /> <span v-if="keyword!==''">{{searchResultTotal}}</span>

    <ul style="text-align: left">
      <p v-for="(p, index) in data" :key="index">
        <span v-if="keyword!==''">{{dayjs(p.start_time*1000).format('YYYY-MM-DD')}}</span>
        {{ p.job_name }}
      </p>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import dayjs from "dayjs";

export default defineComponent({
  components: {},
  data() {
    return {
      dayjs: dayjs,
      data: "",
      keyword: '',
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
      this.getTodayItems();
    },
    getTodayItems() {
      axios
        //params:可传递多个参数,固定写法,不能改,否则参数传递失败
        .get("/api/items", {
          params: { start: this.start.unix(), end: this.end.unix() },
        })
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    keyup(e) {
      this.keyword = e.target.value.trim();
      if (this.keyword === '') {
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
    }
  },
});
</script>

<style>

</style>
