<template>
  <ms-modal
    :visible="visible"
    :width="400"
    title="Chọn các cột cần xuất"
    @requestClose="handleCancel"
  >
    <template #content>
      <div class="flex flex-col gap-2">
        <ms-checkbox v-model="selectAll"
          ><template #content>Chọn tất cả</template></ms-checkbox
        >
        <ms-checkbox
          v-for="field in fields"
          :key="field.key"
          v-model="selected[field.key]"
        >
          <template #content>{{ field.label }}</template>
        </ms-checkbox>
      </div>
    </template>
    <template #cancel>Hủy</template>

    <template #functions>
      <ms-button btn-type="primary" @click="confirm">
        <template #content>Xác nhận</template>
      </ms-button>
    </template>
  </ms-modal>
</template>

<script setup>
import { reactive } from "vue";
import MsCheckbox from "@/components/ms-checkbox/MsCheckbox.vue";
import MsModal from "../MsModal.vue";
import { computed } from "vue";

const selectAll = computed({
  get() {
    return props.fields.every((f) => selected[f.key] === true);
  },
  set(value) {
    props.fields.forEach((f) => {
      selected[f.key] = value;
    });
  },
});

const props = defineProps({
  visible: {},
  fields: {},
});

const emit = defineEmits(["close", "confirm"]);

const selected = reactive({});

/**
 * Hàm xử lý cancel - bỏ chọn tất cả các nội dung đã chọn
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 10.12.2025
 */
const handleCancel = () => {
  // Reset tất cả các selection về false
  props.fields.forEach((f) => {
    selected[f.key] = false;
  });
  // Emit close event
  emit("close");
};

const confirm = () => {
  const columns = props.fields
    .filter((f) => selected[f.key])
    .map((f) => ({
      key: f.key,
      label: f.label,
    }));

  emit("confirm", columns);
};
</script>
