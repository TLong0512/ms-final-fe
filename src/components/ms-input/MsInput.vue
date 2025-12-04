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

const emit = defineEmits(["blur", "focus", "enter"]);

const value = defineModel();

const props = defineProps({
  placeholder: { type: String, default: "Nhập giá trị" },
});

/** Expose methods */
const inputRef = ref(null);
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
