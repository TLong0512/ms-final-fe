<template>
  <a-date-picker
    v-model:value="model"
    :placeholder="placeholder"
    :format="dateFormat"
  />
</template>
<script setup>
const model = defineModel();
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  dateFormat: {
    type: String,
    default: "DD/MM/YYYY",
  },
});
</script>
<style>
.ant-picker:focus,
.ant-picker-focused,
.ant-picker:hover,
.ant-picker-active-bar {
  box-shadow: none !important;
}

.ant-picker:hover,
.ant-picker-focused {
  border-color: var(--primary-btn-color) !important;
}

.ant-picker-cell-selected .ant-picker-cell-inner,
.ant-picker-cell-range-start .ant-picker-cell-inner,
.ant-picker-cell-range-end .ant-picker-cell-inner {
  background-color: var(--primary-btn-color) !important;
  color: #fff !important;
}

.ant-picker-cell-today .ant-picker-cell-inner::before {
  border-color: var(--primary-btn-color) !important;
}
a.ant-picker-today-btn {
  color: var(--text-secondary-color) !important;
}
.ant-picker-dropdown .ant-picker-header-view button:hover {
  color: var(--text-secondary-color) !important;
}
</style>
