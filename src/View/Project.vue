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
          <a-button type="primary" @click="add()" block> 新建项目 </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
  components: {},
  data() {
    return {
      store: useStore(),
      data: '',
    };
  },
  mounted() {
    if (Array.from(this.store.state.items.projectList).length > 0) {
      this.data = this.store.state.items.projectList;
    } else {
      this.getData();
    }
  },
  methods: {
    getData() {
      axios
        .get('/api/projects')
        .then((res) => {
          this.store.commit('setProjectList', res.data.data);
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add() {
      this.$router.push({ name: 'ProjectForm' });
    },
    edit(item: any): void {
      this.$router.push({
        name: 'ProjectFormEdit',
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
