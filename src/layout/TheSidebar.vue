<template>
  <div
    :class="[
      'sidebar flex flex-col',
      isOpened === true ? 'openSidebar' : 'closeSidebar',
    ]"
  >
    <!-- Logo  -->
    <div
      :class="[
        'main-logo flex items-center h-12',
        isOpened === true ? 'pl-2 pr-9' : 'px-3',
      ]"
    >
      <div class="icon icon-grid-active"></div>
      <span>
        <router-link class="flex items-center gap-2 ml-3" to="#">
          <div class="logo"></div>
          <strong class="text-white">KẾ TOÁN</strong>
        </router-link>
      </span>
    </div>
    <!-- Navigate sections -->
    <div
      :class="[
        'flex-1 min-h-0 overflow-auto hide-scrollbar',
        isOpened === true ? 'openSidebar' : 'closeSidebar',
      ]"
    >
      <router-link
        v-for="(item, index) in sidebarItems"
        :key="index"
        :to="item.path"
        :class="[
          'item-content h-10  flex items-center',
          isOpened === true ? 'pl-2 pr-9' : 'px-3',
          route.path === item.path ? 'active' : '',
        ]"
      >
        <div :class="['icon', item.icon]"></div>
        <span class="ml-3 sidebar-content">{{ item.content }}</span>
      </router-link>
      <!-- Utils button -->
      <div
        :class="[
          'item-content utils-btn h-10 flex items-center sticky bottom-0',
          isOpened === true ? 'pl-2 pr-9' : 'px-3',
        ]"
        @click="isOpened = !isOpened"
      >
        <div
          :class="['icon', isOpened === true ? 'icon-left' : 'icon-right']"
        ></div>
        <span class="ml-3 sidebar-content">Thu gọn</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { sidebarItems } from "@/common/constant/combobox/sidebar/sidebarItems";
import { ref } from "vue";
import { useRoute } from "vuetify/lib/composables/router";

const route = useRoute();
const isOpened = ref(true);
</script>
<style scoped>
.sidebar {
  background-color: #111;
}
.item-content {
  cursor: pointer;
}
.item-content span {
  color: var(--text-non-active-color);
}
.item-content:hover {
  background-color: #354445;
}
.active {
  background-color: #354445;
}
.utils-btn {
  background-color: #354445;
}
.active .icon {
  background-color: #fff !important;
}
.openSidebar span {
  display: inline;
}
.closeSidebar span {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
