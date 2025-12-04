<template>
  <ms-form ref="formRef" :model="localForm" :rules="rules">
    <ms-modal
      :visible="openEmployeeModal"
      title="Thêm nhân viên"
      @requestClose="requestClose"
    >
      <template #content>
        <!-- Form main content -->
        <div class="form-main-content flex flex-col gap-7">
          <!-- Persional information section -->
          <div class="flex gap-3 justify-between persional-information-section">
            <!-- Form content left -->
            <div class="form-content-left flex-1">
              <!-- Employee code + Fullname -->
              <div class="flex gap-2">
                <!-- Employee code -->
                <div class="max-w-40 flex flex-col">
                  <label>
                    <span><strong>Mã nhân viên</strong></span>
                    <span class="ml-3 text-red-500 font-bold">*</span>
                  </label>
                  <ms-form-item
                    label=""
                    name="employeeCode"
                    v-model:status="status.employeeCode"
                  >
                    <ms-input
                      ref="employeeCodeInput"
                      v-model="localForm.employeeCode"
                      placeholder="Nhập mã nhân viên"
                    />
                  </ms-form-item>
                </div>

                <!-- Fullname -->
                <div class="flex flex-col">
                  <label>
                    <span><strong>Tên nhân viên</strong></span>
                    <span class="ml-3 text-red-500 font-bold">*</span>
                  </label>

                  <ms-form-item
                    name="fullName"
                    v-model:status="status.fullName"
                  >
                    <ms-input
                      class="w-64"
                      v-model="localForm.fullName"
                      placeholder="Nhập tên nhân viên"
                    />
                  </ms-form-item>
                </div>
              </div>

              <!-- Department -->
              <div class="mt-3 flex flex-col">
                <label>
                  <span><strong>Tên đơn vị</strong></span>
                  <span class="ml-3 text-red-500 font-bold">*</span>
                </label>

                <ms-form-item
                  name="departmentId"
                  v-model:status="status.departmentId"
                >
                  <ms-combobox
                    :options="departmentOptions"
                    v-model="localForm.departmentId"
                  />
                </ms-form-item>
              </div>

              <!-- Position -->
              <div class="mt-3 flex flex-col">
                <span><strong>Chức danh</strong></span>
                <ms-form-item name="position" v-model:status="status.position">
                  <ms-input
                    class="w-full"
                    v-model="localForm.position"
                    placeholder="Nhập chức danh"
                  />
                </ms-form-item>
              </div>
            </div>

            <!-- Form content right -->
            <div class="form-content-right flex-1">
              <!-- Date of birth + gender -->
              <div class="flex gap-7">
                <!-- Date of birth -->
                <div class="flex flex-col">
                  <span><strong>Ngày sinh</strong></span>

                  <ms-date-picker
                    v-model="localForm.dateOfBirth"
                    placeholder="Chọn ngày sinh"
                  />
                </div>

                <!-- gender -->
                <div class="flex flex-col">
                  <span><strong>Giới tính</strong></span>

                  <ms-radio-button
                    v-model="localForm.genderId"
                    :options="genderOptions"
                    class="flex flex-1 items-center"
                  />
                </div>
              </div>

              <!-- National card -->
              <div class="flex mt-3 gap-2">
                <div class="flex flex-col">
                  <span><strong>Số CMND/CCCD</strong></span>
                  <ms-form-item
                    name="nationalCardId"
                    v-model:status="status.nationalCardId"
                  >
                    <ms-input
                      class="w-64"
                      v-model="localForm.nationalCardId"
                      placeholder="Nhập số CMND/CCCD"
                    />
                  </ms-form-item>
                </div>

                <!-- Provided date -->
                <div class="flex flex-col">
                  <span><strong>Ngày cấp</strong></span>
                  <ms-date-picker
                    class="w-full"
                    v-model="localForm.nationalCardProvidedDate"
                    placeholder="Chọn ngày cấp"
                  />
                </div>
              </div>

              <!-- Provided place -->
              <div class="mt-3 w-full">
                <span><strong>Nơi cấp</strong></span>
                <ms-form-item
                  name="nationalCardProvidedPlace"
                  v-model:status="status.nationalCardProvidedPlace"
                >
                  <ms-input
                    class="w-full"
                    v-model="localForm.nationalCardProvidedPlace"
                    placeholder="Nhập nơi cấp"
                /></ms-form-item>
              </div>
            </div>
          </div>

          <!-- Contact & bank section -->
          <div class="contact-and-bank-section">
            <!-- Address -->
            <div>
              <span><strong>Địa chỉ</strong></span>
              <ms-form-item name="address" v-model:status="status.address">
                <ms-input
                  class="w-full"
                  v-model="localForm.address"
                  placeholder="Nhập địa chỉ"
              /></ms-form-item>
            </div>

            <!-- Phone, fixed phone and email -->
            <div class="mt-3 flex gap-2">
              <div class="w-52">
                <span><strong>Số điện thoại</strong></span>
                <ms-form-item
                  name="phoneNumber"
                  v-model:status="status.phoneNumber"
                >
                  <ms-input
                    v-model="localForm.phoneNumber"
                    placeholder="Nhập số điện thoại"
                  />
                </ms-form-item>
              </div>

              <div class="w-52">
                <span><strong>Số điện thoại cố định</strong></span>
                <ms-form-item
                  name="fixedPhoneNumber"
                  v-model:status="status.fixedPhoneNumber"
                >
                  <ms-input
                    v-model="localForm.fixedPhoneNumber"
                    placeholder="Nhập số điện thoại cố định"
                  />
                </ms-form-item>
              </div>

              <div class="w-60">
                <span><strong>Email</strong></span>
                <ms-form-item name="email" v-model:status="status.email">
                  <ms-input
                    v-model="localForm.email"
                    placeholder="Nhập email"
                  />
                </ms-form-item>
              </div>
            </div>

            <!-- Bank account -->
            <div class="mt-3 flex gap-2">
              <div class="w-52">
                <span><strong>Tài khoản ngân hàng</strong></span>
                <ms-form-item
                  name="bankNumber"
                  v-model:status="status.bankNumber"
                >
                  <ms-input
                    v-model="localForm.bankNumber"
                    placeholder="Nhập số tài khoản ngân hàng"
                  />
                </ms-form-item>
              </div>

              <div class="w-52">
                <span><strong>Tên ngân hàng</strong></span>
                <ms-form-item name="bankName" v-model:status="status.bankName">
                  <ms-input
                    v-model="localForm.bankName"
                    placeholder="Nhập tên ngân hàng"
                  />
                </ms-form-item>
              </div>

              <div class="w-60">
                <span><strong>Chi nhánh</strong></span>
                <ms-form-item
                  name="bankBranch"
                  v-model:status="status.bankBranch"
                >
                  <ms-input
                    v-model="localForm.bankBranch"
                    placeholder="Nhập chi nhánh ngân hàng"
                  />
                </ms-form-item>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #cancel>Hủy</template>

      <template #functions>
        <template v-if="modalMode === 'add'">
          <a-button @click="handleSave">Lưu</a-button>
          <a-button type="primary" @click="handleSaveAndContinue">
            Lưu và tiếp tục
          </a-button>
        </template>

        <template v-else>
          <a-button @click="handleSave" type="primary">Lưu</a-button>
        </template>
      </template>
    </ms-modal>
  </ms-form>

  <!-- Quit confirmation -->
  <ms-confimation v-model="openConfirmQuitModal">
    <template #icon>
      <div class="icon icon-question"></div>
    </template>

    <template #content>
      Dữ liệu đã bị thay đổi. Bạn có muốn cất không?
    </template>

    <template #functions>
      <a-button @click="handleQuit">Không</a-button>
      <a-button type="primary" @click="handleSave">Có</a-button>
    </template>
  </ms-confimation>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import MsModal from "@/components/ms-modal/MsModal.vue";
import MsInput from "@/components/ms-input/MsInput.vue";
import GenderAPI from "@/services/components/gender/GenderAPI";
import DepartmentAPI from "@/services/components/department/DepartmentAPI";
import MsRadioButton from "@/components/ms-radio-button/MsRadioButton.vue";
import MsCombobox from "@/components/ms-combobox/MsCombobox.vue";
import MsDatePicker from "@/components/ms-datepicker/MsDatePicker.vue";
import MsConfimation from "@/components/ms-notification/MsConfimation.vue";
import MsForm from "@/components/ms-form/MsForm.vue";
import MsFormItem from "@/components/ms-form/MsFormItem.vue";
import {
  openEmployeeModal,
  openConfirmQuitModal,
} from "@/common/constant/modals";
import { cloneDeep } from "lodash";

/**
 * SECTION ĐỊNH NGHĨA DỮ LIỆU PROPS TỪ CHA, CÁC EMITS VÀ BIẾN CONTROL VALUE CHO FORM
 */

/**
 * 1. formValue: reactive từ parent
 * 2. mode: mode của modal
 */
const props = defineProps({
  formValue: Object,
  modalMode: String,
});
/**
 * emit sự kiện
 */
const emit = defineEmits(["save", "saveAndContinue"]);

const localForm = reactive({});

/**
 * Danh sách lựa chọn trong form
 * 1. danh sách gender
 * 2. danh sách department
 */
const genderOptions = ref([]);
const departmentOptions = ref([]);

/**
 * END SECTION ĐỊNH NGHĨA DỮ LIỆU PROPS TỪ CHA, CÁC EMITS VÀ BIẾN CONTROL VALUE CHO FORM
 */

/**
 * SECTION ĐỊNH NGHĨA CÁC THUỘC TÍNH CHO VALIDATE FORM
 */

/**
 * status: trạng thái mặc định cho các ô input
 */
const status = reactive({
  employeeCode: true,
  fullName: true,
  nationalCardId: true,
  phoneNumber: true,
  fixedPhoneNumber: true,
  bankNumber: true,
  email: true,
  departmentId: true,
  nationalCardProvidedPlace: true,
  bankBranch: true,
  bankName: true,
  address: true,
  position: true,
});

/**
 * validate form thông qua form ref
 */
const formRef = ref();

/**
 * watch errror trên field
 */
watch(
  () => formRef.value,
  () => {
    const validateInfos = formRef.value?.validateInfos;
    if (validateInfos) {
      Object.keys(status).forEach((key) => {
        status[key] = validateInfos[key]?.validateStatus !== "error";
      });
    }
  },
  { deep: true }
);

/**
 * Các rule cần validate
 */
const rules = {
  employeeCode: [
    { required: true, message: "Mã nhân viên không được để trống" },
    {
      pattern: /^NV\d+$/,
      message: "Mã nhân viên phải bắt đầu bằng NV, theo sau là số",
    },
    {
      pattern: /^.{1,25}$/,
      message: "Mã nhân viên tối đa 25 ký tự",
    },
  ],
  fullName: [
    { required: true, message: "Họ và tên không được để trống" },
    {
      pattern: /^[A-Za-zÀ-ỹ\s]+$/,
      message: "Họ và tên không được chứa số hoặc ký tự đặc biệt",
    },
    {
      pattern: /^.{1,100}$/,
      message: "Họ tên tối đa 100 ký tự",
    },
  ],
  email: [
    {
      type: "email",
      message: "Email không hợp lệ",
    },
    {
      pattern: /^.{1,100}$/,
      message: "Email tối đa 100 ký tự",
    },
  ],
  phoneNumber: [
    {
      pattern: /^[0-9]+$/,
      message: "Số điện thoại phải là số",
    },
    {
      pattern: /^.{1,25}$/,
      message: "Số điện thoại tối đa 25 ký tự",
    },
  ],
  fixedPhoneNumber: [
    {
      pattern: /^[0-9]+$/,
      message: "Số điện thoại cố định phải là số",
    },
    {
      pattern: /^.{1,25}$/,
      message: "Số điện thoại cố định tối đa 25 ký tự",
    },
  ],
  nationalCardId: [
    {
      pattern: /^[0-9]+$/,
      message: "Mã CMND/CCCD phải là số",
    },
    {
      pattern: /^.{1,25}$/,
      message: "Số CMND/CCCD tối đa 25 ký tự",
    },
  ],
  bankNumber: [
    {
      pattern: /^[0-9]+$/,
      message: "Số tài khoản ngân hàng phải là số",
    },
    {
      pattern: /^.{1,25}$/,
      message: "Số tài khoản ngân hàng tối đa 25 ký tự",
    },
  ],
  nationalCardProvidedPlace: [
    {
      pattern: /^.{1,255}$/,
      message: "Nơi cấp CCCD/CMND không vượt quá 255 ký tự",
    },
  ],
  bankBranch: [
    {
      pattern: /^.{1,255}$/,
      message: "Tên chi nhánh không vượt quá 255 ký tự",
    },
  ],
  bankName: [
    {
      pattern: /^.{1,255}$/,
      message: "Tên ngân hàng không vượt quá 255 ký tự",
    },
  ],
  address: [
    {
      pattern: /^.{1,255}$/,
      message: "Địa chỉ không vượt quá 255 ký tự",
    },
  ],
  position: [
    {
      pattern: /^.{1,100}$/,
      message: "Chức vị không vượt quá 100 ký tự",
    },
  ],
  departmentId: [
    {
      required: true,
      message: "Phòng ban không được để trống",
    },
  ],
};

/**
 * END SECTION ĐỊNH NGHĨA CÁC THUỘC TÍNH CHO VALIDATE FORM
 */

/**
 * END SECTION CHECK LƯU LẠI GIÁ TRỊ BAN ĐẦU CỦA FORM, CHECK DIRTY , LOGIC DIRTY
 */

/**
 * Biến kiểm tra logic dirty
 * 1. original: giữ dữ liệu init form
 * 2. dirty: kiểm tra thay đổi dữ liệu so với init
 */
const original = ref(null);
const dirty = ref(false);

/**
 * Kiểm tra dirty
 */

watch(
  () => localForm,
  () => {
    if (JSON.stringify(localForm) !== original.value) {
      dirty.value = true;
    }
  },
  { deep: true }
);

const requestClose = () => {
  if (!dirty.value) {
    openEmployeeModal.value = false;
  } else {
    openConfirmQuitModal.value = true;
  }
};

const handleQuit = () => {
  openEmployeeModal.value = false;
  openConfirmQuitModal.value = false;
  return;
};

/**
 * END SECTION CHECK LƯU LẠI GIÁ TRỊ BAN ĐẦU CỦA FORM, CHECK DIRTY , LOGIC DIRTY
 */

/**
 * SECTION LOGIC KHÁC
 */

/**
 * Biển hiện focus tại vị trí employee code
 */
const employeeCodeInput = ref(null);

/**
 * SECTION LOGIC KHÁC
 */

/**
 * Call APIS khi mounted component
 *
 */
onMounted(async () => {
  /**
   * Focus vào ô employee code khi mở trang
   */
  employeeCodeInput.value?.focus();
  /**
   * Call api get all gender và department
   */
  const [genderRes, departmentRes] = await Promise.all([
    GenderAPI.getAll(),
    DepartmentAPI.getAll(),
  ]);

  genderOptions.value = genderRes.data.map((data) => ({
    key: data.genderId,
    name: data.name,
  }));

  departmentOptions.value = departmentRes.data.map((data) => ({
    key: data.departmentId,
    label: data.name,
  }));
  /**
   * Lưu lại giá trị mặc định của form
   */
  original.value = JSON.stringify(props.formValue);
  dirty.value = false;

  const clone = cloneDeep(props.formValue);

  Object.assign(localForm, clone);
});

const handleSave = async () => {
  try {
    openConfirmQuitModal.value = false;
    await formRef.value.validate();
    emit("save", JSON.parse(JSON.stringify(localForm)));
  } catch (err) {}
};

const handleSaveAndContinue = async () => {
  try {
    await formRef.value.validate();
    emit("saveAndContinue", JSON.parse(JSON.stringify(localForm)));
  } catch (err) {}
};
</script>
