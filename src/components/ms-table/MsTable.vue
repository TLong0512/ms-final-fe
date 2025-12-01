<template>
  <div class="ms-table" ref="wrapper">
    <table>
      <!-- Header -->
      <thead class="sticky top-0 z-10">
        <tr>
          <th v-for="field in fields" :key="field.key">
            {{ field.label }}
          </th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <!-- Body -->
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="table-row">
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
          <td>
            <div class="flex items-center gap-2">
              <span class="edit hover:underline" @click="handleEdit(row)"
                >Sửa</span
              >
              <ms-dropdown
                :drop-down-items="dropDownItems"
                @select="handleSelect"
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
import { formatNumber, formatDate, formatText } from "@/utils/formatter";
import { ref, onMounted } from "vue";
import MsDropdown from "../ms-dropdown/MsDropdown.vue";

/**
 * Mounted: chỉ được tương tác với scrollbar để scroll ngang
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
 * I. fields: Danh sách các cột, định nghĩa các thành phần cho field bao gồm:
 *    1. type - kiểu dữ liệu hiển thị: [text, number, date, custom]
 *    2. key - identify cho cột: [id, name, .....]
 *    3. label - dữ liệu hiển thị thực tế
 * II. rows: Danh sách các dòng, các cột ở từng dòng gồm:
 *    1. [giá trị key]
 *    2. [data trả về từ api]
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
    required: true,
  },
});

/**
 * biến emit cho task sửa và xóa
 */
const emit = defineEmits(["edit", "delete", "duplicate"]);

/**
 * format dữ liệu cho từng kiểu
 */
const handleFormat = (value, type) => {
  switch (type) {
    case "number":
      return formatNumber(value);
    case "date":
      return formatDate(value);
    case "text":
      return formatText(value);
    default:
      return formatText(value);
  }
};

/**
 *
 * Emit sự kiện sửa
 */
const handleEdit = (row) => {
  emit("edit", row);
};
const dropDownItems = [
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
 * emit sự kiện thêm theo duplicate, xóa
 * @param item được chọn trong dropdown item
 */
const handleSelect = (item) => {
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
