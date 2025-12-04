<template></template>
<script setup>
import { message, notification } from "ant-design-vue";
import { watch, ref } from "vue";
import {
  openMessage,
  messageContent,
  messageType,
} from "@/common/constant/message";

const openNotification = () => {
  notification.open({
    message: () => messageContent.title,
    description: () => messageContent.description,
    class: getNotificationClass(),
    duration: 3,
    onClose: () => {
      openMessage.value = false;
      messageType.value = null;
      messageContent.title = "";
      message.description = "";
    },
    placement: "bottomRight",
  });
};
const getNotificationClass = () => {
  switch (messageType.value) {
    case "success":
      return "success-msg";
    case "warning":
      return "warning-msg";
    case "error":
      return "error-msg";
  }
};

watch(openMessage, (val) => {
  if (val) {
    openNotification();
  }
});
</script>
<style>
.notification-custom-class {
  background-color: red !important;
}
.ant-notification-notice .ant-notification-notice-close {
  display: none !important;
}

.success-msg {
  background-color: #22c55e !important;
}

.warning-msg {
  background-color: #eab308 !important;
}

.error-msg {
  background-color: #ef4444 !important;
}
.success-msg .ant-notification-notice-message,
.success-msg .ant-notification-notice-description,
.warning-msg .ant-notification-notice-message,
.warning-msg .ant-notification-notice-description,
.error-msg .ant-notification-notice-message,
.error-msg .ant-notification-notice-description {
  color: #fff !important;
}
</style>
