import { reactive } from "vue";

export const employeeModel = () =>
  reactive({
    employeeCode: null,
    fullName: null,
    dateOfBirth: null,
    genderId: null,
    departmentId: null,
    nationalCardId: null,
    nationalCardProvidedDate: null,
    nationalCardProvidedPlace: null,
    position: null,
    address: null,
    phoneNumber: null,
    fixedPhoneNumber: null,
    email: null,
    bankNumber: null,
    bankName: null,
    bankBranch: null,
  });
