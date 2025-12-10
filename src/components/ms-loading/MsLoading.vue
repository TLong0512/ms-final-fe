<template>
  <transition name="fade">
    <div
      v-if="displayLoading"
      class="fixed inset-0 flex items-center justify-center z-50"
      style="background: rgba(0, 0, 0, 0.15); backdrop-filter: blur(2px)"
    >
      <div
        class="flex flex-col items-center gap-4 bg-white rounded-lg p-8 shadow-lg"
      >
        <!-- Custom Spinner -->
        <div class="loading-spinner"></div>
        <span class="text-gray-800 font-medium text-base">Đang tải...</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useLoading } from "@/utils/useLoading";

/**
 * Component hiển thị loading spinner toàn màn hình
 * Spinner được custom với màu chủ đạo #2ba11b
 * Có timeout để loading hiển thị rõ hơn
 * createdby: Nguyễn Thanh Long - 10.12.2025
 */

const { isLoading } = useLoading();

/**
 * State để control việc hiển thị loading
 * Sẽ delay loading OFF để users nhìn thấy rõ
 */
const displayLoading = ref(false);

/**
 * Timeout ID để clear timeout nếu cần
 */
let loadingTimeoutId = null;

/**
 * Minimum time để loading hiển thị (ms)
 * Giúp loading hiển thị rõ ràng thay vì flicker
 */
const MIN_LOADING_TIME = 0;

/**
 * Watch isLoading từ useLoading composable
 * Khi loading state thay đổi, update displayLoading với delay
 */
watch(isLoading, (newVal) => {
  // Clear timeout trước đó nếu có
  if (loadingTimeoutId) {
    clearTimeout(loadingTimeoutId);
  }

  if (newVal) {
    // Khi bắt đầu loading, hiển thị ngay
    displayLoading.value = true;
  } else {
    // Khi kết thúc loading, delay MIN_LOADING_TIME ms trước khi ẩn
    loadingTimeoutId = setTimeout(() => {
      displayLoading.value = false;
      loadingTimeoutId = null;
    }, MIN_LOADING_TIME);
  }
});
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Loading Spinner */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e5e5;
  border-top-color: #2ba11b;
  border-right-color: #2ba11b;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Optional: Add shadow to spinner */
@media (prefers-color-scheme: light) {
  .loading-spinner {
    box-shadow: 0 0 10px rgba(43, 161, 27, 0.2);
  }
}
</style>
