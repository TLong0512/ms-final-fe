import { reactive } from "vue";

export const employeeModel = () =>
  reactive({
    employeeCode: "",
    fullName: "",
    dateOfBirth: null,
    genderId: null,
    departmentId: null,
    nationalCardId: "",
    nationalCardProvidedDate: null,
    nationalCardProvidedPlace: null,
    position: "",
    address: "",
    phoneNumber: "",
    fixedPhoneNumber: "",
    email: "",
    bankNumber: "",
    bankName: "",
    bankBranch: "",
  });
