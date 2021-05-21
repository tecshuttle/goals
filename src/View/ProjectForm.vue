<template>
  <div>
    <div>
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
        <a-form-item ref="name" name="name" label="项目名称">
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item ref="desc" name="desc" label="项目说明">
          <a-input v-model:value="formState.desc" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            {{ route.params.id ? '保存' : '新建' }}
          </a-button>
          <a-button style="margin-left: 10px" @click="goBack">取消</a-button>
          <a-button type="danger" v-if="route.params.id" style="margin-left: 10px" @click="remove"> 删除 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { defineComponent, onMounted, ref, UnwrapRef, reactive, toRaw } from 'vue';

interface FormState {
  name: string;
  id: number;
  user_id: number;
  desc: string;
  is_done: number;
}

export default defineComponent({
  setup() {
    onMounted(() => {
      if (route.params.id) {
        route.params.item ? updateFormState(JSON.parse(<string>route.params.item)) : getProject(route.params.id);
      }
    });

    const formRef = ref();
    let formState: UnwrapRef<FormState> = reactive({
      name: '',
      id: 0,
      user_id: 0,
      desc: '',
      is_done: 0,
    });

    const rules = {
      name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
        { min: 2, max: 50, message: '字符长度：2-50', trigger: 'blur' },
      ],
    };

    const store = useStore();

    const isObjectValueEqual = (a, b) => {
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      if (aProps.length != bProps.length) {
        return false;
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        var propA = a[propName];
        var propB = b[propName];
        if (propA !== propB) {
          return false;
        }
      }
      return true;
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          // 如果数据没有更新，则不调用接口；
          if (route.params.id) {
            if (isObjectValueEqual(toRaw(formState), JSON.parse(<string>route.params.item))) {
              goBack();
              return;
            }
          }

          axios({
            url: '/api/projects/' + (route.params.id || ''),
            method: route.params.id ? 'put' : 'post',
            data: toRaw(formState),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (route.params.id) {
                // 更新 store 节点
                store.commit('setProject', toRaw(formState));
              } else {
                // 更新 store 列表
                store.commit('setProjectList', []);
              }
              goBack();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error);
        });
    };

    const router = useRouter();
    const route = useRoute();

    const getProject = (id: any) => {
      axios
        .get('/api/projects/' + id)
        .then((res) => {
          updateFormState(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const updateFormState = (item: FormState) => {
      formState.name = item.name;
      formState.user_id = item.user_id;
      formState.id = item.id;
      formState.desc = item.desc;
      formState.is_done = item.is_done;
    };

    const remove = () => {
      axios
        .delete('/api/projects/' + route.params.id)
        .then((res) => {
          store.commit('setProjectList', []);
          goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const goBack = () => {
      router.push({ name: 'Project' });
    };

    return {
      //data
      formRef,
      rules,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      router,
      route,
      formState,
      store,
      //function
      isObjectValueEqual,
      updateFormState,
      onSubmit,
      remove,
      goBack,
    };
  },
});
</script>

<style>
.project-list p {
  width: 50%;
  display: inline-block;
}
</style>
