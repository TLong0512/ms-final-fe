<template>
  <a-form-item
    :label="label"
    :name="name"
    :help="!status ? errorMessage : undefined"
    :validate-status="!status ? 'error' : undefined"
  >
    <slot />
  </a-form-item>
</template>

<script setup>
const status = defineModel("status", {
  type: Boolean,
  default: true,
});

const props = defineProps({
  label: String,
  name: String,
  errorMessage: { type: String, default: "Giá trị không hợp lệ" },
});
</script>
<style>
.ant-form-item {
  margin-bottom: 0 !important;
}
</style>
