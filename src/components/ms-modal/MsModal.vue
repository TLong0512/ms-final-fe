<template>
  <div>
    <a-modal v-model:open="showModal" :title="title" @cancel="handleCancel" destroy-on-close>
      <slot name="content"></slot>
      <template #footer>
        <a-button @click="handleCancel"><slot name="cancel"></slot></a-button>
        <a-button type="primary" @click="handleSave"><slot name="save"></slot></a-button>
      </template>
    </a-modal>
  </div>
</template>
<script setup>
import { showModal } from '@/common/constant/component-variables';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['save', 'cancel']);

const handleSave = () => {
  emit('save');
};
const handleCancel = () => {
  emit('cancel');
};
</script>
<style>
.ant-modal-close-x {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
