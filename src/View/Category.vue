<template>
  <div>
    <div style="text-align: left" class="project-list">
      <a-row :gutter="[16, 8]" id="items" class="nested-sortable">
        <template v-for="(p, index) in data" :key="index">
          <a-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4" :xxl="3" class="item">
            <div class="container">
              <div @click="edit(p)">{{ p.name }}</div>
              <div class="container nested-sortable">
                <span v-for="(leaf, idx) in p.children" class="item" :key="idx" @click="edit(leaf)">
                  {{ leaf.name }}</span
                >
              </div>
            </div>
          </a-col>
        </template>

        <a-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4" :xxl="3">
          <a-button type="primary" @click="add()" block> 新建分类 </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import Sortable from 'sortablejs';

export default defineComponent({
  components: {},
  data() {
    return {
      store: useStore(),
      data: ''
    };
  },
  mounted() {
    if (Array.from(this.store.state.items.categoryList).length > 0) {
      this.data = this.store.state.items.categoryList;
      this.treeing();
    } else {
      this.getData();
    }
  },
  methods: {
    getData() {
      axios
        .get('/api/categories')
        .then((res) => {
          this.store.commit('setCategoryList', res.data.data);
          this.data = res.data.data;
          this.treeing();

          this.$nextTick(() => {
            // Nested demo
            var nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));

            for (var i = 0; i < nestedSortables.length; i++) {
              new Sortable(nestedSortables[i], {
                draggable: '.item',
                animation: 150,
                group: 'nested'
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    treeing() {
      let root = [];
      let rest = [];

      toRaw(this.store.state.items.categoryList).forEach((item) => {
        item = JSON.parse(JSON.stringify(item));
        if (item.parent === 0) {
          root.push(item);
        } else {
          rest.push(item);
        }
      });
      rest.forEach((item) => {
        let parent = root.find((o) => o.id === item.parent);
        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }
      });

      this.data = root;
    },
    add() {
      this.$router.push({ name: 'CategoryForm' });
    },
    edit(item: any): void {
      this.$router.push({
        name: 'CategoryFormEdit',
        params: { id: item.id, item: JSON.stringify(item) }
      });
    }
  }
});
</script>

<style>
.container {
  border: 1px solid #d9d9d9;
  padding: 5px;
  cursor: pointer;
}
.container span {
  padding: 0px 5px;
  display: inline-block;
  cursor: pointer;
}
.sortable-ghost {
  display: inline-block;
  height: 1.5em;
  border: dotted 2px #ddd;
  background: transparent;
  color: transparent;
}
.project-list p {
  width: 50%;
  display: inline-block;
}
</style>
