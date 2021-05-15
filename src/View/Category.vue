<template>
  <div>
    <div style="text-align: left" class="project-list">
      <a-row :gutter="[16, 8]">
        <template v-for="(p, index) in data" :key="index">
          <a-col :span="12">
            <a-button @click="edit(p)" block> {{ p.name }}</a-button>
          </a-col>
        </template>

        <a-col :span="12">
          <a-button type="primary" @click="add()" block> 新建分类 </a-button>
        </a-col>
      </a-row>
    </div>
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
      this.$router.push({ name: "CategoryForm" });
    },
    edit(item: any): void {
      this.$router.push({
        name: "CategoryFormEdit",
        params: { id: item.id, item: JSON.stringify(item) },
      });
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
