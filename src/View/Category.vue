<template>
  <div>
    <div>
      <a-button type="primary" @click="add"> 新建分类 </a-button>
    </div>
    <ul style="text-align: left" class="project-list">
      <p v-for="(p, index) in data" :key="index">
        {{ p.name }}
      </p>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  components: {},
  data() {
    return {
      data: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("/api/categories")
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add() {
      this.$router.push({ name: "ProjectForm" });
    },
  },
});
</script>

<style>
.project-list p {
  width: 50%;
  display: inline-block;
}
</style>
