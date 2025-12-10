<!--
 * Component MsPagination - Custom pagination wrapper
 * Wrapper component cho Ant Design pagination
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-pagination
    v-model:current="model"
    :total="totalItems"
    :page-size="pageSize"
    show-less-items
  />
</template>

<script setup>
/**
 * Props:
 * @property {Number} totalItems - Tổng số items
 * @property {Number} pageSize - Số items trên mỗi trang
 */
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

/**
 * v-model binding cho trang hiện tại
 */
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
