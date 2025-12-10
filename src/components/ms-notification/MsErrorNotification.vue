<!--
 * Component MsErrorNotification - Error notification dialog
 * Modal hiển thị thông báo lỗi với icon, nội dung và nút xác nhận
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-modal v-model:open="open" :title="title" centered destroy-on-close>
    <div class="flex items-center p-4 gap-3">
      <slot name="icon"></slot>
      <div class="flex justify-center flex-1 min-w-0 min-h-0 text-base">
        <slot name="content"></slot>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-center items-center">
        <slot name="confirm"></slot>
      </div>
    </template>
  </a-modal>
</template>
<script setup>
/**
 * v-model binding cho trạng thái modal
 */
const open = defineModel();

/**
 * Props:
 * @property {String} title - Tiêu đề của error notification
 */
const props = defineProps({
  title: {
    type: String,
    default: "Thông báo",
  },
});
</script>
