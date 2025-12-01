<template>
  <a-textarea v-model:value="value" :placeholder="placeholder" :rows="rows" />
</template>
<script setup>
import { ref, watch } from 'vue';
/**
 * model liên kết 2 chiều dữ liệu từ parent
 */
const value = defineModel();

/**
 * Prop:
 * 1. placeholder
 * 2. rows: số dòng
 */
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Nhập giá trị',
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
