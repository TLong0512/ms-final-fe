<!--
 * Component MsDropdown - Custom dropdown menu wrapper
 * Wrapper component cho Ant Design dropdown
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <a-dropdown
    class="cursor-pointer"
    :arrow="isBubble ? { pointAtCenter: true } : false"
    :trigger="['click']"
  >
    <!-- Nội dung từ của cha -->
    <a class="ant-dropdown-link" @click.prevent>
      <slot></slot>
    </a>
    <!-- Nội dung các thẻ drop down -->
    <template #overlay>
      <a-menu>
        <div v-for="(item, index) in dropDownItems" :key="index">
          <a-menu-item @click="onSelect(item)">
            <div v-if="item.icon?.trim()" :class="['icon', item.icon]" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </div>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
/**
 * Props:
 * @property {Array} dropDownItems - Danh sách items có cấu trúc {title, icon?, ...}
 * @property {Boolean} isBubble - Hình dạng dropdown (bubble style)
 */
const props = defineProps({
  dropDownItems: Array,
  isBubble: { type: Boolean, default: false },
});

/**
 * Emits
 * - select: Phát sinh khi user chọn một item từ dropdown
 */
const emit = defineEmits(["select"]);

/**
 * Hàm xử lý khi user chọn item
 * @param {Object} item - Item được chọn
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 10.12.2025
 */
const onSelect = (item) => {
  emit("select", item);
};
</script>

<style>
.ant-dropdown-menu-title-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.ant-dropdown .ant-dropdown-menu {
  border-radius: 4px;
}
.ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover span {
  color: var(--text-secondary-color);
}
</style>
