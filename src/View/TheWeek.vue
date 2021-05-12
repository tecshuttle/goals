<template>
  <div>
    <h2>本周</h2>
    {{ start.format("YYYY-MM-DD H:m:s") }} - {{ start.unix() }} <br />
    {{ end.format("YYYY-MM-DD H:m:s") }} - {{ end.unix() }}

    <ul style="text-align: left">
      <p v-for="(p, index) in data" :key="index">{{ p.job_name }}</p>
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
      data: "",
      start: dayjs().startOf("week"),
      end: dayjs().endOf("week"),
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
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
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
