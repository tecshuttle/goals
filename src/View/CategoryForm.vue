<template>
  <div>
    <div>
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
        <a-form-item ref="name" name="name" label="分类名称">
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item ref="memo" name="memo" label="分类说明">
          <a-input v-model:value="formState.memo" />
        </a-form-item>

        <a-form-item ref="id" name="id" label="ID">
          <a-input v-model:value="formState.id" :disabled="true" />
        </a-form-item>

        <a-form-item ref="parent" name="parent" label="上级ID">
          <a-input v-model:value="formState.parent" />
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
import { defineComponent, onMounted, ref, UnwrapRef, reactive, toRaw } from 'vue';

interface FormState {
  name: string;
  id: number;
  parent: number;
  memo: string;
}

export default defineComponent({
  setup() {
    onMounted(() => {
      if (route.params.id) {
        route.params.item ? updateFormState(JSON.parse(<string>route.params.item)) : getCategory(route.params.id);
      }
    });

    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      id: 0,
      parent: 0,
      memo: ''
    });

    const rules = {
      name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
        { min: 2, max: 50, message: '字符长度：2-50', trigger: 'blur' }
      ]
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          axios({
            url: '/api/categories/' + (route.params.id || ''),
            method: route.params.id ? 'put' : 'post',
            data: toRaw(formState),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((res) => {
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

    const getCategory = (id: any) => {
      axios
        .get('/api/categories/' + id)
        .then((res) => {
          updateFormState(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const updateFormState = (item: FormState) => {
      formState.name = item.name;
      formState.id = item.id;
      formState.memo = item.memo;
      formState.parent = item.parent;
    };

    const remove = () => {
      axios
        .delete('/api/categories/' + route.params.id)
        .then((res) => {
          goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const goBack = () => {
      router.push({ name: 'Category' });
    };

    return {
      //data
      formRef,
      rules,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      router,
      route,
      formState,
      //function
      updateFormState,
      onSubmit,
      remove,
      goBack
    };
  }
});
</script>

<style>
.project-list p {
  width: 50%;
  display: inline-block;
}
</style>
