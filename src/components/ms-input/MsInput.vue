<template>
  <a-input
    v-model:value="value"
    :placeholder="placeholder"
    ref="inputRef"
    :class="{ 'input-error': !status }"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
    @enter="emit('enter', value)"
  />
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["blur", "focus", "enter"]);

const value = defineModel();

const status = defineModel("status", { default: true });

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

<style scoped>
.ant-input:hover,
.ant-input:focus {
  border-color: var(--primary-btn-color);
}

.input-error {
  border-color: #ff4d4f !important;
}

.ant-input:focus,
.ant-input-focused,
.ant-input:focus-within {
  box-shadow: none !important;
  outline: none !important;
}
</style>
