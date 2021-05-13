<template>
  <div>
    <div>
      <a-button type="primary" @click="cancel"> 返回 </a-button>

      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
        <input v-model="name" />
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" @click="save"> 保存 </a-button>
        </a-form-item>
      </a-form>
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
      name: "",
      formVal: {
        name: "",
      },
      formLayout: "horizontal",
      form: "", //this.$form.createForm(this, { name: "coordinated" }),
      data: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("/api/projects")
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.return();
    },
    return() {
      this.$router.push({ name: "Project" });
    },
    save() {
      axios
        .post("/api/projects", { name: this.name })
        .then((res) => {
          this.return();
        })
        .catch((err) => {
          console.log(err);
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
