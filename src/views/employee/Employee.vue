<template>
  <div class="p-4 flex flex-col">
    <!-- Title section -->
    <div class="title-section flex justify-between items-center h-8">
      <span class="text-lg font-bold">Nhân viên</span>
      <ms-button :btn-type="'primary'"
        ><template #content>Thêm mới nhân viên</template></ms-button
      >
    </div>
    <!-- Table section -->
    <div class="flex flex-1 flex-col min-w-0 min-h-0 bg-white rounded mt-3 p-2">
      <!-- Filter & search tool -->
      <div class="flex justify-end items-center gap-4">
        <!-- Input search -->
        <div class="relative flex h-8 items-center">
          <ms-input
            :placeholder="'Tìm kiếm nhân viên'"
            class="w-56 pr-6"
          ></ms-input>
          <div
            class="absolute right-3 top-1/2 -translate-y-1/2 icon icon-search"
          ></div>
        </div>
        <!-- Reset button -->
        <div class="icon icon-reset"></div>
      </div>
      <!-- Table container -->
      <div class="flex-1 min-h-0 min-w-0 overflow-x-auto mt-3">
        <ms-table
          :fields="fields"
          :rows="employees"
          @edit="handleEdit"
          @duplicate="handleDuplicate"
          @delete="handleDelete"
        >
        </ms-table>
      </div>
      <!-- Paging -->
      <div class="h-10 flex justify-between items-end mx-2">
        <span>
          Tổng <strong>{{ totalItems }}</strong> bản ghi
        </span>
        <div class="flex">
          <ms-dropdown
            :drop-down-items="pagingDropDownItems"
            class="flex relative"
            @select="handleSelect"
          >
            <ms-button class="pr-8">
              <template #content>{{ pageSize }} bản ghi/trang</template>
            </ms-button>
            <div
              class="icon icon-down absolute right-3 top-1/2 -translate-y-1/2"
            ></div>
          </ms-dropdown>
          <ms-pagination
            :total="totalItems"
            v-model:current="page"
          ></ms-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MsButton from "@/components/ms-button/MsButton.vue";
import MsInput from "@/components/ms-input/MsInput.vue";
import { onMounted, ref } from "vue";
import EmployeeAPI from "@/services/components/employee/EmployeeAPI";
import MsTable from "@/components/ms-table/MsTable.vue";
import MsDropdown from "@/components/ms-dropdown/MsDropdown.vue";
import MsPagination from "@/components/ms-pagination/MsPagination.vue";
const page = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const totalPages = ref(0);
const employees = ref();

onMounted(async () => {
  await EmployeeAPI.paging({
    page: page.value,
    pageSize: pageSize.value,
  }).then((res) => {
    const data = res.data;
    page.value = data.page;
    pageSize.value = data.pageSize;
    totalItems.value = data.totalItems;
    totalPages.value = data.totalPages;
    employees.value = data.items;
  });
});

const fields = [
  { key: "employeeCode", label: "Mã nhân viên", type: "text" },
  { key: "fullName", label: "Họ và tên", type: "text" },
  { key: "gender", label: "Giới tính", type: "text" },
  { key: "dateOfBirth", label: "Ngày sinh", type: "date" },
  { key: "nationalCardId", label: "CMND/CCCD", type: "text" },
  { key: "position", label: "Chức vụ", type: "text" },
  { key: "departmentName", label: "Phòng ban", type: "text" },
  { key: "bankNumber", label: "Số tài khoản", type: "text" },
  { key: "bankName", label: "Tên ngân hàng", type: "text" },
  { key: "bankBranch", label: "Chi nhánh ngân hàng", type: "text" },
];
const handleEdit = (row) => {};
const handleDuplicate = (row) => {};
const handleDelete = (row) => {};

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
const pagingDropDownItems = [
  {
    key: 10,
    title: "10 bản ghi",
    icon: "",
  },
  {
    key: 20,
    title: "20 bản ghi",
    icon: "",
  },
  {
    key: 30,
    title: "30 bản ghi",
    icon: "",
  },
  {
    key: 40,
    title: "40 bản ghi",
    icon: "",
  },
  {
    key: 50,
    title: "50 bản ghi",
    icon: "",
  },
  {
    key: 100,
    title: "100 bản ghi",
    icon: "",
  },
];
const handleSelect = async (item) => {
  await EmployeeAPI.paging({
    page: page.value,
    pageSize: item.key,
  }).then((res) => {
    const data = res.data;
    page.value = data.page;
    pageSize.value = data.pageSize;
    totalItems.value = data.totalItems;
    totalPages.value = data.totalPages;
    employees.value = data.items;
  });
};
</script>
<style scoped></style>
