<!--
 * Component MsConfirmation - Confirmation dialog
 * Modal xác nhận với icon, nội dung và các hành động
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-modal v-model:open="open" :title="title" centered destroy-on-close>
    <div class="flex items-center p-4">
      <slot name="icon"></slot>
      <div class="flex justify-center flex-1 min-w-0 min-h-0 text-base">
        <slot name="content"></slot>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between items-center">
        <a-button @click="handleCancel">Hủy</a-button>
        <div class="gap-3 flex">
          <slot name="functions"></slot>
        </div>
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
 * @property {String} title - Tiêu đề của confirmation dialog
 */
const props = defineProps({
  title: {
    type: String,
    default: "Thông báo",
  },
});

/**
 * Hàm xử lý cancel - đóng modal
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 10.12.2025
 */
const handleCancel = () => {
  open.value = false;
};
</script>
