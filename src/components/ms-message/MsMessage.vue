<template></template>
<script setup>
import { onMounted, watch } from 'vue';
import { message } from 'ant-design-vue';

/**
 * truyền 2 chiều với cha....
 */
const showMessage = defineModel();

/**
 * Props:
 *  1. message type: loại message sẽ hiển thị: success, error
 *  2. message content: nội dung của message
 */
const props = defineProps({
  messageType: {
    type: String,
    required: true,
  },
  messageContent: {
    type: String,
  },
});

onMounted(() => {
  showMessageDialog();
});

// watch(showMessage, () => {
//   showMessageDialog();
//   showMessage.val = false;
// });

const showMessageDialog = () => {
  switch (props.messageType) {
    case 'success': {
      message.success(props.messageContent ? props.messageContent : 'Thêm thành công');
      break;
    }
    case 'error': {
      message.error(props.messageContent ? props.messageContent : 'Thêm thành công');
      break;
    }
  }
};
</script>
