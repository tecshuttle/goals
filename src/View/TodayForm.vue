<template>
  <div>
    <div>
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
        <a-form-item ref="job_name" name="job_name" label="任务名称">
          <a-input v-model:value="formState.job_name" />
        </a-form-item>

        <a-form-item ref="desc" name="desc" label="任务说明">
          <a-textarea v-model:value="formState.job_desc" :rows="6" />
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
  id: number;
  job_name: string;
  job_desc: string;
}

export default defineComponent({
  setup() {
    onMounted(() => {
      if (route.params.id) {
        route.params.item ? updateFormState(JSON.parse(<string>route.params.item)) : getItem(route.params.id);
      }
    });

    const formRef = ref();
    let formState: UnwrapRef<FormState> = reactive({
      id: 0,
      job_name: '',
      job_desc: ''
    });

    const rules = {
      job_name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
        { min: 2, max: 50, message: '字符长度：2-50', trigger: 'blur' }
      ]
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          axios({
            url: '/api/items/' + (route.params.id || ''),
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

    const getItem = (id: any) => {
      axios
        .get('/api/items/' + id)
        .then((res) => {
          updateFormState(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const updateFormState = (item: FormState) => {
      formState.job_name = item.job_name;
      formState.job_desc = item.job_desc;
      formState.id = item.id;
    };

    const remove = () => {
      axios
        .delete('/api/items/' + route.params.id)
        .then((res) => {
          goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const goBack = () => {
      router.push({ name: 'Today' });
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

<style></style>
