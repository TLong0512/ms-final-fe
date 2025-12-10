<!--
 * Component MsInput - Custom input wrapper
 * Wrapper component cho Ant Design input
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-input
    v-model:value="value"
    :placeholder="placeholder"
    ref="inputRef"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
    @enter="emit('enter', value)"
  />
</template>

<script setup>
import { ref } from "vue";

/**
 * Emits
 * - blur: Phát sinh khi input mất focus
 * - focus: Phát sinh khi input được focus
 * - enter: Phát sinh khi user nhấn Enter
 */
const emit = defineEmits(["blur", "focus", "enter"]);

/**
 * v-model binding cho giá trị input
 */
const value = defineModel();

/**
 * Props:
 * @property {String} placeholder - Text placeholder hiển thị trong input
 */
const props = defineProps({
  placeholder: { type: String, default: "Nhập giá trị" },
});

/**
 * Ref đến ant input instance
 */
const inputRef = ref(null);

/**
 * Expose các methods cho parent component
 * - focus(): Focus vào input
 * - blur(): Blur input
 */
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
});
</script>

<style>
.ant-input:hover,
.ant-input:focus {
  border-color: var(--primary-btn-color);
}

.ant-input:focus,
.ant-input-focused,
.ant-input:focus-within {
  box-shadow: none !important;
  outline: none !important;
}

.ant-form-item-has-error .ant-input,
.ant-form-item-has-error .ant-input:hover,
.ant-form-item-has-error .ant-input:focus {
  border-color: #ff4d4f !important;
  box-shadow: none !important;
}
</style>
