import { createStore } from 'vuex';

export default createStore({
  modules: {
    items: {
      state: {
        todayList: [],
        id: '',
      },
      mutations: {
        setInfo(state, data) {
          Object.assign(state, data);
        },
        setTodayList(state, todayList) {
          state.todayList = todayList;
        },
      },
    },
  },
});
