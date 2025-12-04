<template>
  <a-radio-group v-model:value="model" name="radioGroup">
    <a-radio v-for="item in options" :key="item.key" :value="item.key">
      {{ item.name }}
    </a-radio>
  </a-radio-group>
</template>
<script setup>
const props = defineProps({
  options: { type: Array, required: true },
});
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
