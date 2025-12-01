<template>
  <a-button
    :type="btnType"
    :danger="isDanger"
    class="flex items-center justify-center"
  >
    <template #icon>
      <slot name="icon"></slot>
    </template>
    <slot name="content"></slot>
  </a-button>
</template>
<script setup>
/**
 * Prop:
 *  1. type: background color + border color
 *  2. isDanger: background color đỏ + border
 *
 */
const props = defineProps({
  btnType: {
    type: String,
    default: "default",
  },
  isDanger: {
    type: Boolean,
    default: false,
  },
});
</script>
<style>
.ant-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.ant-btn-primary {
  background-color: var(--primary-btn-color);
}
.ant-btn-primary span {
  color: #fff;
}

.ant-btn-primary:not(:disabled):hover {
  background-color: var(--primary-btn-color);
}

.ant-btn-default:not(:disabled):hover {
  border-color: var(--primary-btn-color);
}
</style>
