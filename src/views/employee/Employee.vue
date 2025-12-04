<template>
  <div class="p-4 flex flex-col">
    <!-- Title section -->
    <div class="title-section flex justify-between items-center h-8">
      <span class="text-lg font-bold">Nhân viên</span>
      <ms-button :btn-type="'primary'" @click="enableAddModeModal">
        <template #content>Thêm mới nhân viên</template>
      </ms-button>
    </div>
    <!-- Table section -->
    <div class="flex flex-1 flex-col min-w-0 min-h-0 bg-white rounded mt-3 p-2">
      <div class="flex items-center justify-between">
        <!-- Function tools left side -->
        <div>
          <ms-dropdown
            :class="selectedIds.length === 0 ? 'hidden' : 'block'"
            :drop-down-items="selectAllFunctionItems"
            @select="handleSelectAllFunctions"
          >
            <ms-button>
              <template #content>
                <div class="flex items-center justify-between gap-3">
                  <span>Thực hiện hàng loạt</span>
                  <div class="icon icon-down"></div>
                </div>
              </template>
            </ms-button>
          </ms-dropdown>
        </div>
        <!-- Function tools right side -->
        <div class="flex justify-end items-center gap-4">
          <!-- Input search -->
          <div class="relative flex h-8 items-center">
            <ms-input
              :placeholder="'Tìm kiếm nhân viên'"
              class="w-56 pr-6"
              v-model="searchValue"
              @keyup.enter="onSearchEmployee"
            ></ms-input>
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 icon icon-search"
            ></div>
          </div>
          <!-- Reset button -->
          <div
            class="icon icon-reset"
            @click="
              async () => {
                await setDefaultPage();
              }
            "
          ></div>
        </div>
      </div>
      <!-- Table container -->
      <div
        class="flex-1 flex flex-col min-h-0 min-w-0 overflow-x-auto mt-3 border"
      >
        <template v-if="rows.length > 0">
          <ms-table
            :fields="fields"
            :rows="rows"
            row-key="employeeId"
            @edit="handleEditModeModal"
            @duplicate="enableDuplicateModeModal"
            @delete="handleConfirmDelete"
            v-model:selectedMap="selectedMap"
          >
          </ms-table>
        </template>
        <template v-else>
          <ms-table :fields="fields"></ms-table>
          <div
            class="flex-1 flex items-center justify-center font-bold text-xl"
          >
            Không có dữ liệu
          </div>
        </template>
      </div>
      <!-- Paging -->
      <div class="h-10 flex justify-between items-center">
        <span>
          Tổng <strong>{{ totalItems }}</strong> bản ghi
        </span>
        <div class="flex">
          <ms-dropdown
            :drop-down-items="pagingDropDownItems"
            class="flex relative"
            @select="handlePageSize"
          >
            <ms-button class="pr-8">
              <template #content>{{ pageSize }} bản ghi/trang</template>
            </ms-button>
            <div
              class="icon icon-down absolute right-3 top-1/2 -translate-y-1/2"
            ></div>
          </ms-dropdown>
          <ms-pagination
            class="ml-3"
            v-model="page"
            :total-items="totalItems"
            :page-size="pageSize"
          />
        </div>
      </div>
    </div>
    <employee-modal
      v-if="openEmployeeModal"
      :form-value="formValue"
      :modal-mode="modalMode"
      @save="handleSave"
      @saveAndContinue="handleSaveAndContinue"
    ></employee-modal>
    <ms-message></ms-message>
    <ms-confimation v-model="openConfirmDeleteModal" :title="'Cảnh báo'">
      <template #icon>
        <div class="icon-warning"></div>
      </template>
      <template #content>Xác nhận xóa nhân viên này?</template>
      <template #functions>
        <ms-button :btn-type="'primary'" @click="handleDelete">
          <template #content>Xác nhận</template>
        </ms-button>
      </template>
    </ms-confimation>
  </div>
</template>

<script setup>
import MsButton from "@/components/ms-button/MsButton.vue";
import MsInput from "@/components/ms-input/MsInput.vue";
import { onMounted, ref } from "vue";
import { watch, computed } from "vue";
import EmployeeAPI from "@/services/components/employee/EmployeeAPI";
import MsTable from "@/components/ms-table/MsTable.vue";
import MsDropdown from "@/components/ms-dropdown/MsDropdown.vue";
import MsPagination from "@/components/ms-pagination/MsPagination.vue";
import EmployeeModal from "./EmployeeModal.vue";
import MsMessage from "@/components/ms-message/MsMessage.vue";
import { parseDateForDatePicker, convertToLocalDate } from "@/utils/utils";
import MsConfimation from "@/components/ms-notification/MsConfimation.vue";
import { pagingDropDownItems } from "@/common/constant/paging";
import { employeeFields as fields } from "@/common/constant/tables/employeeTable";
import {
  showDefaultErrorMessage,
  showDefaultSuccessMessage,
} from "@/utils/message";
import { selectAllFunctionItems } from "@/common/constant/combobox/select-all/selectAllItems";
import {
  openEmployeeModal,
  openConfirmDeleteModal,
} from "@/common/constant/modals";
import {
  rows,
  page,
  pageSize,
  totalItems,
  totalPages,
} from "@/common/constant/tables";
import { searchValue } from "@/common/constant/searchbox";
import { selectedMap } from "@/common/constant/tables";
import { employeeModel } from "@/common/model/employee";
import dayjs from "dayjs";

/**
 * Dữ liệu cho form
 */
const formValue = employeeModel();

const setDefaultPage = async () => {
  searchValue.value = "";
  page.value = 1;
  pageSize.value = 10;
  await fetchEmployees({
    pageValue: page.value,
    pageSizeValue: pageSize.value,
    resetSelected: true,
  });
};

const fetchEmployees = async ({
  pageValue = page.value,
  pageSizeValue = pageSize.value,
  resetSelected = false,
} = {}) => {
  try {
    const apiParams = {
      page: pageValue,
      pageSize: pageSizeValue,
    };

    const res = searchValue.value
      ? await EmployeeAPI.search({
          ...apiParams,
          data: searchValue.value,
        })
      : await EmployeeAPI.paging(apiParams);

    const data = res.data || {};

    page.value = data.page ?? 0;
    pageSize.value = data.pageSize ?? pageSizeValue;
    totalItems.value = data.totalItems ?? 0;
    totalPages.value = data.totalPages ?? 0;
    rows.value = data.items ?? [];

    if (resetSelected) {
      selectedMap.value = {};
    }
  } catch (error) {
    showDefaultErrorMessage();
    page.value = 0;
    pageSize.value = 0;
    totalItems.value = 0;
    totalPages.value = 0;
    rows.value = [];
  }
};

/**
 * Call api khi mount trang
 */
onMounted(async () => await fetchEmployees());

/**
 * Hàm call lại api get employee khi lựa chọn lại pageSize
 * @param item object item được chọn
 */
const handlePageSize = async (item) => {
  await fetchEmployees({
    pageValue: 1,
    pageSizeValue: item.key,
    resetSelected: true,
  });
};

const handleSelectAllFunctions = async (item) => {
  switch (item.key) {
    case "deleteAll":
      await handleDeleteAll(selectedIds);
  }
};

/**
 * Watch call lại api lấy dữ liệu khi chuyển trang
 */
watch(page, async (newPage, oldPage) => {
  try {
    if (newPage !== oldPage) {
      await fetchEmployees();
    }
  } catch {
    rows.value = [];
  }
});

const currentRowsToDelete = ref([]);

const handleConfirmDelete = (row) => {
  currentRowsToDelete.value.push(row);
  openConfirmDeleteModal.value = true;
};

const handleDelete = async () => {
  if (currentRowsToDelete.value.length === 0) return;

  try {
    await EmployeeAPI.delete(currentRowsToDelete.value[0].employeeId);
    showDefaultSuccessMessage();
    await setDefaultPage();
  } catch (error) {
    showDefaultErrorMessage();
  } finally {
    openConfirmDeleteModal.value = false;
    currentRowsToDelete.value = [];
  }
};

const handleDeleteAll = async (ids) => {};

/**
 * Call api search
 */
const onSearchEmployee = async () => {
  await fetchEmployees({ resetSelected: true });
};

/**
 * Section Xử lý logic select, select all
 */

const selectedIds = computed(() =>
  Object.keys(selectedMap.value).filter((id) => selectedMap.value[id])
);

/**
 * Section xử lý form ở các mode
 */

const modalMode = ref(null);

/**
 * function clear form ở mode add
 */
const resetForm = () => {
  formValue.employeeCode = "";
  formValue.fullName = "";
  formValue.dateOfBirth = null;
  formValue.genderId = null;
  formValue.departmentId = null;
  formValue.nationalCardId = "";
  formValue.nationalCardProvidedDate = null;
  formValue.nationalCardProvidedPlace = "";
  formValue.position = "";
  formValue.address = "";
  formValue.phoneNumber = "";
  formValue.fixedPhoneNumber = "";
  formValue.email = "";
  formValue.bankNumber = "";
  formValue.bankName = "";
  formValue.bankBranch = "";
};
/**
 * Hàm hiển thị modal add mode
 */
const enableAddModeModal = async () => {
  try {
    resetForm();
    const newEmplCode = await EmployeeAPI.generateEmplCode();

    formValue.employeeCode = newEmplCode.data;
    modalMode.value = "add";
    openEmployeeModal.value = true;
  } catch (error) {
    showDefaultErrorMessage();
  }
};
/**
 * Hàm hiển thị modal dưới edit mode
 * @param row
 */
const handleEditModeModal = async (row) => {
  await handleGetEmplInforById(row);
  edditedEmplId.value = row.employeeId;
  modalMode.value = "edit";
  openEmployeeModal.value = true;
};
/**
 * Hàm hiển thị modal dưới duplicate mode
 * @param row
 */
const enableDuplicateModeModal = async (row) => {
  await handleGetEmplInforById(row);
  const newEmplCode = (await EmployeeAPI.generateEmplCode()).data;
  formValue.employeeCode = newEmplCode;
  modalMode.value = "add";
  openEmployeeModal.value = true;
};

/**
 * Hàm lấy thông tin employee dựa vào dòng lựa chọn
 * @param row
 */
const handleGetEmplInforById = async (row) => {
  try {
    const response = await EmployeeAPI.getEmplById(row.employeeId);
    const result = response.data;
    Object.assign(formValue, {
      employeeCode: result.employeeCode || "",
      fullName: result.fullname || "",
      dateOfBirth: parseDateForDatePicker(result.dateOfBirth),
      genderId: result.genderId || null,
      departmentId: result.departmentId || null,
      nationalCardId: result.nationalCardId || "",
      nationalCardProvidedPlace: result.nationalCardProvidedPlace || "",
      nationalCardProvidedDate: parseDateForDatePicker(
        result.nationalCardProvidedDate
      ),
      position: result.position || "",
      address: result.address || "",
      phoneNumber: result.phoneNumber || "",
      fixedPhoneNumber: result.fixedPhoneNumber || "",
      email: result.email || "",
      bankNumber: result.bankNumber || "",
      bankName: result.bankName || "",
      bankBranch: result.bankBranch || "",
    });
  } catch (error) {
    showDefaultErrorMessage();
  }
};

const edditedEmplId = ref(null);

const addEmployee = async () => {
  try {
    const payload = JSON.stringify({
      ...formValue,
      nationalCardProvidedDate: convertToLocalDate(
        formValue.nationalCardProvidedDate
      ),
      dateOfBirth: convertToLocalDate(formValue.dateOfBirth),
    });
    await EmployeeAPI.post(payload);
  } catch (error) {
    throw error;
  }
};

const editEmployee = async () => {
  try {
    const id = edditedEmplId.value;
    const payload = JSON.stringify({
      ...formValue,
      nationalCardProvidedDate: convertToLocalDate(
        formValue.nationalCardProvidedDate
      ),
      dateOfBirth: convertToLocalDate(formValue.dateOfBirth),
    });
    await EmployeeAPI.update(id, payload);
  } catch (error) {
    throw error;
  }
};
const handleSave = async (data) => {
  Object.assign(formValue, data);
  switch (modalMode.value) {
    case "add":
      try {
        await addEmployee();
        await setDefaultPage();
        openEmployeeModal.value = false;
        showDefaultSuccessMessage();
      } catch (error) {
        showDefaultErrorMessage();
      } finally {
        break;
      }
    case "edit":
      try {
        await editEmployee();
        await fetchEmployees();
        edditedEmplId.value = null;
        openEmployeeModal.value = false;
        showDefaultSuccessMessage();
      } catch (error) {
        showDefaultErrorMessage();
      } finally {
        break;
      }
  }
};
const handleSaveAndContinue = async (data) => {
  Object.assign(formValue, data);
  try {
    await addEmployee();
    showDefaultSuccessMessage();
    await enableAddModeModal();
    await setDefaultPage();
  } catch (error) {
    showDefaultErrorMessage();
  }
};
</script>
<style scoped></style>
