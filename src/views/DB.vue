<template>
  <div class="home">{{ data }}</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  components: {
    //HelloWorld,
  },
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
        //params:可传递多个参数,固定写法,不能改,否则参数传递失败
        .get("/api")
        .then((res) => {
          console.log(res);
          this.data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
