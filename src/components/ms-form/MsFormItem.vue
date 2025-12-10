<!--
 * Component MsFormItem - Custom form item wrapper
 * Wrapper component cho Ant Design form item
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-form-item :label="label" :name="name" :validate-trigger="validateTrigger">
    <slot />
  </a-form-item>
</template>

<script setup>
/**
 * Props:
 * @property {String} label - Label text của form item
 * @property {String} name - Tên field (binding với form model)
 * @property {String|Array} validateTrigger - Khi nào trigger validation (change, blur, ...)
 */
const props = defineProps({
  label: String,
  name: String,
  validateTrigger: {
    type: [String, Array],
    default: () => ["change", "blur"],
  },
});
</script>

<style>
.ant-form-item {
  margin-bottom: 0 !important;
}
</style>
