<template>
  <a-modal
    :open="visible"
    :title="title"
    :width="width"
    :mask-closable="false"
    :keyboard="false"
    destroy-on-close
    centered
    @cancel="$emit('requestClose')"
  >
    <slot name="content" />

    <template #footer>
      <div class="flex justify-between">
        <a-button @click="$emit('requestClose')">
          <slot name="cancel"></slot>
        </a-button>
        <div class="flex gap-3">
          <slot name="functions"></slot>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, required: true },
  width: { type: [String, Number], default: 900 },
  saving: { type: Boolean, default: false },
});

defineEmits(["requestClose"]);
</script>

<style>
.ant-modal .ant-modal-header {
  margin-bottom: 16px;
}
.ant-modal-close-x {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.ant-modal-title {
  font-size: x-large !important;
  font-weight: bolder !important;
}
.ant-modal-footer {
  margin-top: 25px !important;
}
</style>
