<template>
  <ms-form ref="formRef" :model="localForm" :rules="employeeRules">
    <ms-modal
      :visible="openEmployeeModal"
      :title="
        modalMode === 'add' ? 'Thêm nhân viên' : 'Chỉnh sửa thông tin nhân viên'
      "
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
                <div class="flex basis-1/3 flex-col">
                  <label>
                    <span><strong>Mã nhân viên</strong></span>
                    <span class="ml-3 text-red-500 font-bold">*</span>
                  </label>
                  <ms-form-item label="" name="employeeCode">
                    <ms-input
                      ref="employeeCodeInput"
                      v-model="localForm.employeeCode"
                      placeholder="Nhập mã nhân viên"
                    />
                  </ms-form-item>
                </div>
                <!-- Fullname -->
                <div class="flex basis-2/3 flex-1 flex-col">
                  <label>
                    <span><strong>Tên nhân viên</strong></span>
                    <span class="ml-3 text-red-500 font-bold">*</span>
                  </label>

                  <ms-form-item name="fullName">
                    <ms-input
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

                <ms-combobox
                  :options="departmentOptions"
                  v-model="localForm.departmentId"
                />
              </div>

              <!-- Position -->
              <div class="mt-3 flex flex-col">
                <span><strong>Chức danh</strong></span>
                <ms-form-item name="position">
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
                  <ms-form-item name="dateOfBirth">
                    <ms-date-picker
                      v-model="localForm.dateOfBirth"
                      placeholder="Chọn ngày sinh"
                    />
                  </ms-form-item>
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

              <!-- National card + Provided date -->
              <div class="flex mt-3 gap-2">
                <!-- National card id -->
                <div class="flex basis-2/3 flex-col">
                  <span><strong>Số CMND/CCCD</strong></span>
                  <ms-form-item name="nationalCardId">
                    <ms-input
                      v-model="localForm.nationalCardId"
                      placeholder="Nhập số CMND/CCCD"
                    />
                  </ms-form-item>
                </div>
                <!-- Provided date -->
                <div class="flex basis-1/3 flex-col">
                  <span><strong>Ngày cấp</strong></span>
                  <ms-form-item name="nationalCardProvidedDate">
                    <ms-date-picker
                      class="w-full"
                      v-model="localForm.nationalCardProvidedDate"
                      placeholder="Chọn ngày cấp"
                    />
                  </ms-form-item>
                </div>
              </div>

              <!-- Provided place -->
              <div class="mt-3 w-full">
                <span><strong>Nơi cấp</strong></span>
                <ms-form-item name="nationalCardProvidedPlace">
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
              <ms-form-item name="address">
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
                <ms-form-item name="phoneNumber">
                  <ms-input
                    v-model="localForm.phoneNumber"
                    placeholder="Nhập số điện thoại"
                  />
                </ms-form-item>
              </div>

              <div class="w-52">
                <span><strong>Số điện thoại cố định</strong></span>
                <ms-form-item name="fixedPhoneNumber">
                  <ms-input
                    v-model="localForm.fixedPhoneNumber"
                    placeholder="Nhập số điện thoại cố định"
                  />
                </ms-form-item>
              </div>

              <div class="w-60">
                <span><strong>Email</strong></span>
                <ms-form-item name="email">
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
                <ms-form-item name="bankNumber">
                  <ms-input
                    v-model="localForm.bankNumber"
                    placeholder="Nhập số tài khoản ngân hàng"
                  />
                </ms-form-item>
              </div>

              <div class="w-52">
                <span><strong>Tên ngân hàng</strong></span>
                <ms-form-item name="bankName">
                  <ms-input
                    v-model="localForm.bankName"
                    placeholder="Nhập tên ngân hàng"
                  />
                </ms-form-item>
              </div>

              <div class="w-60">
                <span><strong>Chi nhánh</strong></span>
                <ms-form-item name="bankBranch">
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
          <a-button @click="handleSave">Cất</a-button>
          <a-button type="primary" @click="handleSaveAndContinue">
            Cất và tiếp tục
          </a-button>
        </template>

        <template v-else>
          <a-button @click="handleSave" type="primary">Cất</a-button>
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
  openErrorModal,
} from "@/common/constant/modals";
import { cloneDeep } from "lodash";
import { employeeRules } from "@/common/constant/form/employeeForm";

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
 * validate form thông qua form ref
 */
const formRef = ref();

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

  const clone = cloneDeep(props.formValue);
  Object.assign(localForm, clone);
  localForm.genderId = genderOptions.value[0]?.key;

  /**
   * Lưu lại giá trị mặc định của form
   */
  original.value = JSON.stringify(localForm);
  dirty.value = false;
});

const handleSave = async () => {
  openConfirmQuitModal.value = false;
  await formRef.value.validate();
  emit("save", cloneDeep(localForm));
};

const handleSaveAndContinue = async () => {
  await formRef.value.validate();
  emit("saveAndContinue", cloneDeep(localForm));
};
</script>
