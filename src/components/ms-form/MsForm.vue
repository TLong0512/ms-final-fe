<!--
 * Component MsForm - Custom form wrapper
 * Wrapper component cho Ant Design form
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-form ref="formRef" :model="model" :rules="rules" layout="vertical">
    <slot />
  </a-form>
</template>

<script setup>
import { ref } from "vue";

/**
 * Props:
 * @property {Object} model - Data object của form (two-way binding)
 * @property {Object} rules - Validation rules cho form
 */
const props = defineProps({
  model: { type: Object, required: true },
  rules: { type: Object, default: () => ({}) },
});

/**
 * Ref đến ant form instance
 */
const formRef = ref(null);

/**
 * Expose các methods cho parent component
 * - validate(): Validate form
 * - resetFields(): Reset tất cả fields
 * - setFields(fields): Set giá trị cho fields
 */
defineExpose({
  validate: () => formRef.value?.validate(),
  resetFields: () => formRef.value?.resetFields(),
  setFields: (fields) => formRef.value?.setFields(fields),
});
</script>
