<template>
  <a-input v-model:value="value" :placeholder="placeholder" />
</template>
<script setup>
/**
 * Gía trị binding 2 chiều
 */
const value = defineModel();

/**
 * Prop:
 * 1. placeholder
 */
const props = defineProps({
  placeholder: {
    type: String,
    default: "Nhập giá trị",
  },
});
</script>

<style>
input {
  box-shadow: none;
}
.ant-input:hover,
.ant-input:focus {
  border-color: var(--primary-btn-color);
}
</style>
