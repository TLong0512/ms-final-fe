<!--
 * Component MsCombobox - Custom combobox/autocomplete wrapper
 * Wrapper component cho Vuetify autocomplete
 * createdby: Nguyễn Thanh Long - 10.12.2025
 -->
<template>
  <v-autocomplete
    v-model="model"
    :items="options"
    :item-title="'label'"
    :item-value="'key'"
    density="compact"
  >
    <template #no-data>
      <div class="m-5 flex items-center justify-center">
        <strong>Không có dữ liệu</strong>
      </div>
    </template>
  </v-autocomplete>
</template>
<script setup>
/**
 * v-model binding cho giá trị selected
 */
const model = defineModel();

/**
 * Props:
 * @property {Array} options - Danh sách các options có cấu trúc {key, label}
 */
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});
</script>
<style>
#input-v-2-messages {
  display: none;
}
.v-input__details {
  display: none !important;
}

.v-autocomplete .v-field {
  height: 32px !important;
  min-height: 32px !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 6px !important;
  box-shadow: none !important;
  background-color: #fff !important;
  transition: all 0.2s ease !important;
}

.v-autocomplete .v-field__input {
  padding: 0 11px !important;
  font-size: 14px !important;
  line-height: 32px !important;
  min-height: 32px !important;
}

.v-autocomplete .v-field:hover {
  border-color: var(--primary-btn-color) !important;
}

.v-autocomplete .v-field.v-field--focused {
  border-color: --primary-btn-color !important;
}

.v-autocomplete input::placeholder {
  font-size: 14px !important;
}

.v-autocomplete .v-field__outline {
  display: none !important;
}

.v-autocomplete .v-field__append-inner {
  height: 32px !important;
}

.v-autocomplete .v-field__input,
.v-autocomplete .v-field,
.v-autocomplete input,
.v-field--variant-filled .v-field__overlay {
  background-color: transparent !important;
}

.combobox-error .v-input .v-field {
  border: 1px solid red !important;
}
</style>
