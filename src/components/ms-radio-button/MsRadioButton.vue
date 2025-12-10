<!--
 * Component MsRadioButton - Custom radio button group wrapper
 * Wrapper component cho Ant Design radio group
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-radio-group v-model:value="model" name="radioGroup">
    <a-radio v-for="item in options" :key="item.key" :value="item.key">
      {{ item.name }}
    </a-radio>
  </a-radio-group>
</template>
<script setup>
/**
 * Props:
 * @property {Array} options - Danh sách các radio options (key, name)
 */
const props = defineProps({
  options: { type: Array, required: true },
});

/**
 * v-model binding cho giá trị radio selected
 */
const model = defineModel();
</script>

<style>
.ant-radio-wrapper:hover .ant-radio-inner {
  border-color: var(--primary-btn-color);
}

.ant-radio-checked + span {
  color: var(--text-secondary-color);
}

.ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
  border-color: var(--primary-btn-color);
  background-color: var(--primary-btn-color);
}
</style>
