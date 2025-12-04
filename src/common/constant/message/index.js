import { ref, reactive } from "vue";
/**
 *Các biến kiểm soát nội dung message
 */
export const openMessage = ref(false);
export const messageType = ref(null);
export const messageContent = reactive({
  title: "",
  description: "",
});
