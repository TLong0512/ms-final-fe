<template>
  <a-checkbox :checked="model" @change="model = $event.target.checked">
    <slot name="content" />
  </a-checkbox>
</template>

<script setup>
const model = defineModel({
  type: Boolean,
  default: false,
});
</script>

<style scoped>
:deep(.ant-checkbox:hover .ant-checkbox-inner) {
  border-color: var(--primary-btn-color) !important;
}

:deep(
  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner
) {
  border-color: var(--primary-btn-color) !important;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: var(--primary-btn-color) !important;
  border-color: var(--primary-btn-color) !important;
}

:deep(.ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner) {
  background-color: var(--primary-btn-color) !important;
  border-color: var(--primary-btn-color) !important;
}

:deep(.ant-checkbox::after),
:deep(.ant-checkbox-checked::after),
:deep(.ant-checkbox:hover::after),
:deep(.ant-checkbox-checked:hover::after) {
  border-color: var(--primary-btn-color) !important;
}
</style>
