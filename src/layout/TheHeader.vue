<template>
  <div class="h-12 flex justify-between shadow-sm bg-white">
    <!-- header left -->
    <div class="header-left flex items-center px-2 gap-2">
      <!-- Company category -->
      <div class="icon icon-category ml-3"></div>
      <!-- Company name-->
      <router-link class="flex items-center home-navigator" to="#">
        <span class="ml-3 text-base font-bold flex items-center"
          >CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC</span
        >
        <div class="icon icon-down"></div>
      </router-link>
    </div>
    <!-- header right -->
    <div class="header-right flex flex-row-reverse items-center mr-6">
      <div class="h-8 w-8"><img :src="avatar" class="rounded-full" /></div>
      <div
        class="h-8 w-8 util-option rounded-full mr-2 flex items-center justify-center"
        v-for="(item, index) in headerUtils"
        :key="index"
      >
        <ms-dropdown :has-arrow="true" :drop-down-items="item.dropdownItems">
          <div :class="[item.icon]"></div>
        </ms-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
import MsDropdown from "@/components/ms-dropdown/MsDropdown.vue";
import avatar from "@/assets/images/default-avatar.png";
import { headerUtils } from "@/common/constant/header/headerUtils";
</script>

<style scoped>
.util-option:hover {
  background-color: var(--main-bg-color);
}
</style>
