<template>
  <a-modal v-model:open="open" :title="title" centered>
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
const open = defineModel();

const props = defineProps({
  title: {
    type: String,
    default: "Thông báo",
  },
});

const handleCancel = () => {
  open.value = false;
};
</script>
