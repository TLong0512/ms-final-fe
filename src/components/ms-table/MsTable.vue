<template>
  <div class="ms-table" ref="wrapper">
    <table>
      <!-- Header -->
      <thead class="sticky top-0 z-20">
        <tr>
          <th class="p-3 sticky left-0">
            <ms-checkbox v-model="isCheckedAll" />
          </th>
          <th v-for="field in fields" :key="field.key">
            {{ field.label }}
          </th>
          <th class="sticky right-0 z-20 px-2">Chức năng</th>
        </tr>
      </thead>
      <!-- Body -->
      <tbody>
        <tr v-for="row in rows" :key="getRowId(row)" class="table-row">
          <td class="p-3 sticky left-0 bg-white">
            <ms-checkbox v-model="selectedMap[getRowId(row)]" />
          </td>
          <td v-for="field in fields" :key="field.key">
            <template v-if="field.type === 'custom'">
              <slot
                :name="field.key"
                :row="row"
                :field="field"
                :value="row[field.key]"
              >
                {{ handleFormat(row[field.key], "text") }}
              </slot>
            </template>
            <template v-else>
              {{ handleFormat(row[field.key], field.type || "text") }}
            </template>
          </td>
          <td class="sticky right-0 bg-white z-10 px-2">
            <div class="flex justify-center items-center gap-2">
              <span class="edit hover:underline" @click="handleEdit(row)">
                Sửa
              </span>
              <ms-dropdown
                :drop-down-items="functionItems"
                @select="(item) => handleSelect(item, row)"
              >
                <div class="w-5 h-5 flex items-center justify-center">
                  <div class="icon icon-more-action w-3 h-3"></div>
                </div>
              </ms-dropdown>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { handleFormat } from "@/utils/formatter";
import { ref, onMounted, watch, computed } from "vue";
import MsDropdown from "../ms-dropdown/MsDropdown.vue";
import MsCheckbox from "../ms-checkbox/MsCheckbox.vue";

/**
 * I. fields: Danh sách các cột, định nghĩa các thành phần cho field bao gồm:
 *    1. type - kiểu dữ liệu hiển thị: [text, number, date, custom]
 *    2. key - identify cho cột: [id, name, .....]
 *    3. label - dữ liệu hiển thị thực tế
 * II. rows: Danh sách các dòng, các cột ở từng dòng gồm:
 *    1. [giá trị key]
 *    2. [data trả về từ api]
 * III. rowKey: key identify cho từng dòng
 *
 */
const props = defineProps({
  fields: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((field) => {
        const validTypes = ["text", "number", "date", "custom"];
        return (
          field.key && field.label && validTypes.includes(field.type || "text")
        );
      });
    },
  },
  rows: {
    default: [],
  },
  rowKey: {
    type: String,
  },
});

/**
 * Các sự kiện emit lên cha:
 * 1. Sửa:
 * @param item: Object row
 * 2. Xóa:
 * @param item: Object row
 * 3. Nhân bản:
 * @param item: Object row
 */
const emit = defineEmits(["edit", "delete", "duplicate"]);

/**
 * Logic buộc scroll ngang bằng hover thanh scroll
 */
const wrapper = ref(null);
onMounted(() => {
  if (!wrapper.value) return;
  wrapper.value.addEventListener(
    "wheel",
    (e) => {
      if (e.shiftKey || e.deltaX !== 0) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
});

/**
 * Logic cho check box, check all
 */

/**
 * SelectedMap: lưu lại danh sách các id của từng dòng dạng Object
 */
const selectedMap = defineModel("selectedMap", {
  type: Object,
  default: () => ({}),
});
/**
 * Function lấy rowKey khi lựa chọn 1 row
 * @param row
 */
const getRowId = (row) => row[props.rowKey];
/**
 * watch cho các row, thêm các row được chọn vào selectedMap
 */
watch(
  () => props.rows,
  (rows) => {
    rows.forEach((row) => {
      const id = getRowId(row);
      if (!(id in selectedMap.value)) {
        selectedMap.value[id] = false;
      }
    });
  },
  { immediate: true }
);
/**
 * Compute cho logic check all
 *
 */
const isCheckedAll = computed({
  get() {
    if (!props.rows?.length) return false;
    return props.rows.every((row) => selectedMap.value[getRowId(row)]);
  },
  set(value) {
    props.rows.forEach((row) => {
      selectedMap.value[getRowId(row)] = value;
    });
  },
});

/**
 * Emit sự kiện sửa
 * @param row emit object row lên cho parent
 */
const handleEdit = (row) => {
  emit("edit", row);
};

/**
 * Các item chức năng hiển thị dưới dạng dropdown
 */
const functionItems = [
  {
    key: "duplicate",
    title: "Nhân bản",
    icon: "",
  },
  {
    key: "delete",
    title: "Xóa",
    icon: "",
  },
];

/**
 * Hàm emit chức năng trong dropdown được lựa chọn
 * @param item: chức năng được lựa chọn
 * @param row: emit object row
 */
const handleSelect = (item, row) => {
  if (item.key === "delete") {
    emit("delete", row);
  } else if (item.key === "duplicate") {
    emit("duplicate", row);
  }
};
</script>

<style scoped>
.ms-table {
  width: 100%;
  position: relative;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #edeef2;
  border-color: #ddd;
}
th,
td {
  white-space: nowrap;
  padding: 0.75rem;
  text-align: left;
  border-left: 1px dashed #ddd;
  border-right: 1px dashed #ddd;
}
td {
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}

.table-row:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}
.edit {
  color: var(--primary-btn-color);
}
</style>
