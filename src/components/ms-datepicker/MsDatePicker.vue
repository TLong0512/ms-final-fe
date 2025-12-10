<!--
 * Component MsDatePicker - Custom date picker wrapper
 * Wrapper component cho Ant Design date picker
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-date-picker
    v-model:value="model"
    :placeholder="placeholder"
    :format="dateFormat"
  />
</template>
<script setup>
/**
 * v-model binding cho ngày được chọn
 */
const model = defineModel();

/**
 * Props:
 * @property {String} placeholder - Text placeholder hiển thị trong input
 * @property {String} dateFormat - Format của date (default: DD/MM/YYYY)
 */
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
/* Error state */
.ant-form-item-has-error .ant-picker,
.ant-form-item-has-error .ant-picker:hover,
.ant-form-item-has-error .ant-picker-focused {
  border-color: #ff4d4f !important;
}
</style>
