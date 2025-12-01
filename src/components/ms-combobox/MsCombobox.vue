<template>
  <a-select
    v-model="model"
    :options="options"
    show-search
    :placeholder="placeholder"
    :filter-option="filterOption"
    class="w-full cursor-pointer"
  />
</template>

<script setup>
/**
 * placeholder: gợi ý
 * option: danh sách các giá trị
 */
const props = defineProps({
  placeholder: { type: String, default: 'Chọn...' },
  options: { type: Array, default: () => [] },
});
/**
 * binding 2 chiều với dữ liệu được chọn
 */
const model = defineModel({ type: [String, Number, Object, Boolean, Array] });

const filterOption = (input, option) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
</script>
