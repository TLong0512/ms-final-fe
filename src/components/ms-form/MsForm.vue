<template>
  <a-form ref="formRef" :model="model" :rules="rules" layout="vertical">
    <slot />
  </a-form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  model: { type: Object, required: true },
  rules: { type: Object, default: () => ({}) },
});

const formRef = ref(null);

defineExpose({
  validate: () => formRef.value?.validate(),
  resetFields: () => formRef.value?.resetFields(),
  setFields: (fields) => formRef.value?.setFields(fields),
});
</script>
