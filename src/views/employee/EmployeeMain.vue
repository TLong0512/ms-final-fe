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
              @keyup.enter="handleSearchEmployee"
            ></ms-input>
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 icon icon-search"
              @click="handleSearchEmployee"
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
          <!-- export button -->
          <div
            class="icon-export-excel"
            @click="openExportColumnModal = true"
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
            @edit="enableEditModeModal"
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

    <!-- Thông báo dạng message -->
    <ms-message></ms-message>

    <!-- Cảnh báo xóa 1 nhân viên -->
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

    <!-- Modal lựa chọn các cột xuất excel -->
    <ms-export-column-modal
      :visible="openExportColumnModal"
      @close="openExportColumnModal = false"
      @confirm="handleChooseColumns"
    />

    <!-- Thông báo xuất dữ liệu -->
    <ms-confimation v-model="openConfirmExportExcelFile" :title="'Xác nhận'">
      <template #icon>
        <div class="icon icon-question"></div>
      </template>
      <template #content>
        Tiếp tục tải xuống toàn bộ thông tin nhân viên?
      </template>
      <template #functions>
        <ms-button :btn-type="'primary'" @click="handleExportExcel">
          <template #icon></template>
          <template #content>Tiếp tục tải xuống</template>
        </ms-button>
      </template>
    </ms-confimation>

    <!-- Thông báo lỗi -->
    <ms-error-notification v-model="openErrorModal">
      <template #icon>
        <div class="icon-error"></div>
      </template>
      <template #content>
        {{ errorNotificationContent }}
      </template>
      <template #confirm>
        <a-button
          type="primary"
          @click="
            openErrorModal = false;
            errorNotificationContent = '';
          "
        >
          Xác nhận
        </a-button>
      </template>
    </ms-error-notification>
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
  openErrorModal,
  openConfirmExportExcelFile,
  openExportColumnModal,
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
import MsErrorNotification from "@/components/ms-notification/MsErrorNotification.vue";
import { extractValidationError } from "@/utils/validator";
import { errorNotificationContent } from "@/common/constant/message";
import { departmentRequireMessage } from "@/common/constant/form/employeeForm";
import {
  openMessage,
  messageType,
  messageContent,
} from "@/common/constant/message";
import MsExportColumnModal from "@/components/ms-modal/ms-functional-modal/MsExportColumnModal.vue";

// #region State Data
/**
 * Dữ liệu cho form modal
 */
const formValue = employeeModel();

/**
 * ID của nhân viên đang được chỉnh sửa
 */
const edditedEmplId = ref(null);

/**
 * Chế độ modal: 'add', 'edit'
 */
const modalMode = ref(null);

/**
 * Mảng ID của nhân viên cần xóa
 */
const currentIdsToDelete = ref([]);

/**
 * Các cột được chọn để xuất excel
 */
const columnsToExport = ref([]);
// #endregion State Data

// #region Methods - Xử lý trang (Pagination & Search)
/**
 * Hàm lấy danh sách nhân viên từ API
 * @param {number} pageValue - Số trang
 * @param {number} pageSizeValue - Số bản ghi trên trang
 * @param {boolean} resetSelected - Có reset lựa chọn hay không
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
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
 * Hàm đặt lại trang về mặc định (trang 1, 10 bản ghi, xóa tìm kiếm)
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
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

/**
 * Hàm xử lý thay đổi số bản ghi trên trang
 * @param {Object} item - Item được chọn từ dropdown
 * @param {number} item.key - Số bản ghi được chọn
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handlePageSize = async (item) => {
  await fetchEmployees({
    pageValue: 1,
    pageSizeValue: item.key,
    resetSelected: true,
  });
};

/**
 * Hàm xử lý tìm kiếm nhân viên theo từ khóa
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handleSearchEmployee = async () => {
  await fetchEmployees({ resetSelected: true });
};
// #endregion Methods - Xử lý trang

// #region Methods - Xử lý form và modal
/**
 * Hàm xóa dữ liệu form về trạng thái ban đầu
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 09.12.2025
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
 * Hàm lấy thông tin nhân viên theo ID
 * @param {Object} row - Đối tượng hàng được chọn
 * @param {string} row.employeeId - ID của nhân viên
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
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

/**
 * Hàm hiển thị modal ở chế độ thêm mới
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
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
 * Hàm hiển thị modal ở chế độ chỉnh sửa
 * @param {Object} row - Đối tượng hàng được chọn
 * @param {string} row.employeeId - ID của nhân viên
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const enableEditModeModal = async (row) => {
  await handleGetEmplInforById(row);
  edditedEmplId.value = row.employeeId;
  modalMode.value = "edit";
  openEmployeeModal.value = true;
};

/**
 * Hàm hiển thị modal ở chế độ nhân bản
 * @param {Object} row - Đối tượng hàng được chọn
 * @param {string} row.employeeId - ID của nhân viên
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const enableDuplicateModeModal = async (row) => {
  await handleGetEmplInforById(row);
  const newEmplCode = (await EmployeeAPI.generateEmplCode()).data;
  formValue.employeeCode = newEmplCode;
  modalMode.value = "add";
  openEmployeeModal.value = true;
};
// #endregion Methods - Xử lý form và modal

// #region Methods - Xử lý thêm/sửa nhân viên
/**
 * Hàm thêm mới nhân viên vào hệ thống
 * @returns {Promise<void>}
 * @throws {Error} Lỗi từ API
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const addEmployee = async () => {
  try {
    const body = {
      ...formValue,
      nationalCardProvidedDate:
        formValue.nationalCardProvidedDate !== null
          ? convertToLocalDate(formValue.nationalCardProvidedDate)
          : null,
      dateOfBirth:
        formValue.dateOfBirth !== null
          ? convertToLocalDate(formValue.dateOfBirth)
          : null,
    };

    await EmployeeAPI.post(body);
  } catch (error) {
    throw error;
  }
};

/**
 * Hàm chỉnh sửa thông tin nhân viên trong hệ thống
 * @returns {Promise<void>}
 * @throws {Error} Lỗi từ API
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const editEmployee = async () => {
  try {
    const id = edditedEmplId.value;
    const payload = {
      ...formValue,
      nationalCardProvidedDate:
        formValue.nationalCardProvidedDate !== null
          ? convertToLocalDate(formValue.nationalCardProvidedDate)
          : null,
      dateOfBirth:
        formValue.dateOfBirth != null
          ? convertToLocalDate(formValue.dateOfBirth)
          : null,
    };
    await EmployeeAPI.update(id, payload);
  } catch (error) {
    throw error;
  }
};

/**
 * Hàm xử lý lưu thông tin nhân viên (thêm mới hoặc chỉnh sửa)
 * @param {Object} data - Dữ liệu form từ modal
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
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
        if (formValue.departmentId === null) {
          errorNotificationContent.value = departmentRequireMessage;
          openErrorModal.value = true;
        } else {
          const message = extractValidationError(error);
          if (message) {
            errorNotificationContent.value = message;
            openErrorModal.value = true;
          }
        }
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
        if (formValue.departmentId === null) {
          errorNotificationContent.value = departmentRequireMessage;
          openErrorModal.value = true;
        } else {
          const message = extractValidationError(error);
          if (message) {
            errorNotificationContent.value = message;
            openErrorModal.value = true;
          }
        }
      } finally {
        break;
      }
  }
};

/**
 * Hàm xử lý lưu và tiếp tục thêm mới nhân viên
 * @param {Object} data - Dữ liệu form từ modal
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handleSaveAndContinue = async (data) => {
  Object.assign(formValue, data);
  try {
    await addEmployee();
    showDefaultSuccessMessage();
    openEmployeeModal.value = false;
    await enableAddModeModal();
    await setDefaultPage();
  } catch (error) {
    if (formValue.departmentId === null) {
      errorNotificationContent.value = departmentRequireMessage;
      openErrorModal.value = true;
    } else {
      const message = extractValidationError(error);
      if (message) {
        errorNotificationContent.value = message;
        openErrorModal.value = true;
      }
    }
  }
};
// #endregion Methods - Xử lý thêm/sửa nhân viên

// #region Methods - Xử lý xóa nhân viên
/**
 * Hàm xác nhận xóa một hoặc nhiều nhân viên
 * @param {Object|Array} item - Dữ liệu nhân viên hoặc mảng ID
 * @param {string} item.employeeId - ID nhân viên (nếu là object)
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handleConfirmDelete = (item) => {
  if (Array.isArray(item)) {
    currentIdsToDelete.value = [...item];
  } else {
    currentIdsToDelete.value = [item.employeeId];
  }
  openConfirmDeleteModal.value = true;
};

/**
 * Hàm xử lý xóa bản ghi nhân viên (đơn hoặc hàng loạt)
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handleDelete = async () => {
  try {
    if (currentIdsToDelete.value.length === 0) return;
    else if (currentIdsToDelete.value.length === 1) {
      await EmployeeAPI.delete(currentIdsToDelete.value[0]);
      showDefaultSuccessMessage();
    } else {
      await EmployeeAPI.deleteBatch(currentIdsToDelete.value);
      showDefaultSuccessMessage();
    }
  } catch (error) {
  } finally {
    await setDefaultPage();
    openConfirmDeleteModal.value = false;
    currentIdsToDelete.value = [];
  }
};
// #endregion Methods - Xử lý xóa nhân viên

// #region Methods - Xử lý select/multi-select
/**
 * Hàm xử lý các chức năng dropdown khi chọn tất cả (ví dụ: xóa tất cả)
 * @param {Object} item - Item được chọn từ dropdown
 * @param {string} item.key - Khóa của action (ví dụ: 'deleteAll')
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handleSelectAllFunctions = async (item) => {
  switch (item.key) {
    case "deleteAll":
      handleConfirmDelete(selectedIds.value);
      break;
  }
};
// #endregion Methods - Xử lý select/multi-select

// #region Methods - Xử lý xuất dữ liệu
/**
 * Hàm xử lý chọn các cột để xuất dữ liệu ra Excel
 * @param {Array} cols - Danh sách các cột được chọn
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handleChooseColumns = (cols) => {
  columnsToExport.value = cols;
  openExportColumnModal.value = false;
  openConfirmExportExcelFile.value = true;
};

/**
 * Hàm xử lý xuất dữ liệu nhân viên ra file Excel
 * @returns {Promise<void>}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
const handleExportExcel = async () => {
  try {
    const res = await EmployeeAPI.exportData(columnsToExport.value);

    const blob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "misa-employee.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  } finally {
    openConfirmExportExcelFile.value = false;
  }
};
// #endregion Methods - Xử lý xuất dữ liệu

// #region Computed Properties
/**
 * Danh sách ID của các nhân viên được chọn từ bảng
 */
const selectedIds = computed(() =>
  Object.keys(selectedMap.value).filter((id) => selectedMap.value[id])
);
// #endregion Computed Properties

// #region Lifecycle Hooks
/**
 * Hook chạy khi component được mount - lấy dữ liệu ban đầu
 */
onMounted(async () => await fetchEmployees());

/**
 * Watch: Lấy lại dữ liệu khi người dùng chuyển trang
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
// #endregion Lifecycle Hooks
</script>
<style scoped></style>
