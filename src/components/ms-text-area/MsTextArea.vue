<!--
 * Component MsTextArea - Custom textarea wrapper
 * Wrapper component cho Ant Design textarea
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-textarea v-model:value="value" :placeholder="placeholder" :rows="rows" />
</template>
<script setup>
import { ref, watch } from "vue";

/**
 * v-model binding cho giá trị textarea
 */
const value = defineModel();

/**
 * Props:
 * @property {String} placeholder - Text placeholder hiển thị trong textarea
 * @property {Number} rows - Số dòng mặc định (default: 4)
 * @property {Number} maxlength - Độ dài tối đa (default: 6)
 */
const props = defineProps({
  placeholder: {
    type: String,
    default: "Nhập giá trị",
  },
  rows: {
    type: Number,
    default: 4,
  },
  maxlength: {
    type: Number,
    default: 6,
  },
});
</script>
