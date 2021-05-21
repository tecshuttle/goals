import { createStore } from 'vuex';

export default createStore({
  modules: {
    items: {
      state: {
        categoryList: [],
        projectList: [],
        todayList: [],
      },
      mutations: {
        setCategoryList(state, list) {
          state.categoryList = list;
        },
        setProjectList(state, list) {
          state.projectList = list;
        },
        setProject(state, item) {
          for (const i in state.projectList) {
            if (state.projectList[i].id === item.id) {
              state.projectList[i] = item;
              break;
            }
          }
        },
        setTodayList(state, list) {
          state.todayList = list;
        },
      },
    },
  },
});
