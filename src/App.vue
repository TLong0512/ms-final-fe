<template>
  <!-- Container -->
  <div class="h-dvh w-dvw flex bg-main-color">
    <!-- Sidebar -->
    <the-sidebar></the-sidebar>
    <!-- Content -->
    <div class="content flex flex-col flex-1 min-w-0 min-h-0">
      <the-header></the-header>
      <!-- Main content -->
      <router-view class="flex-1 min-w-0 min-h-0 main-content" />
    </div>
  </div>
</template>

<script setup>
import TheHeader from "./layout/TheHeader.vue";
import TheSidebar from "./layout/TheSidebar.vue";
</script>
<style>
*,
body,
html {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: var(--text-primary-color);
  font-size: 14px;
  scroll-behavior: smooth;
}
body::-webkit-scrollbar {
  display: none;
}

.bg-main-color {
  background-color: var(--main-bg-color);
}
.main-content {
  background-color: var(--bg-primary-color);
}

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}
</style>
