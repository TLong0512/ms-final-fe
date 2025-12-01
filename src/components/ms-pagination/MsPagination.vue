<template>
  <a-pagination
    v-model:current="model"
    :total="totalItems"
    :page-size="pageSize"
    show-less-items
  />
</template>

<script setup>
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
});

const model = defineModel();
</script>

<style>
.ant-select-selector {
  display: none !important;
}
.ant-pagination-options {
  display: none !important;
}
.ant-pagination-item-link {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.ant-pagination .ant-pagination-item-active a,
.ant-pagination .ant-pagination-item-active:hover a {
  color: var(--text-secondary-color);
}
.ant-pagination .ant-pagination-item-active,
.ant-pagination .ant-pagination-item-active:hover {
  border-color: var(--primary-btn-color);
}
</style>
