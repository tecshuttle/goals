<template>
  <div>
    <div>
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
        <a-form-item ref="name" name="name" label="分类名称">
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">新建</a-button>
          <a-button style="margin-left: 10px" @click="goBack">取消</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { useRouter } from "vue-router"
import { defineComponent, ref, UnwrapRef, reactive, toRaw } from "vue";

interface FormState {
  name: string;
}

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: ''
    });

    const rules = {
      name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
        { min: 2, max: 50, message: '字符长度：2-50', trigger: 'blur' },
      ]
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          axios
            .post("/api/categories", toRaw(formState))
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

    const goBack = () => {
      router.push({ name: "Category" });
    };

    return {
      formRef,
      rules,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
      router,
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
