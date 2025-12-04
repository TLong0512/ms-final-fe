<template>
  <a-form-item :label="label" :name="name" :validate-trigger="validateTrigger">
    <slot />
  </a-form-item>
</template>

<script setup>
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
