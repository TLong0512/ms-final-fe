import { notFutureDate } from "@/utils/validator";
/**
 * Các rule cần validate
 */
export const employeeRules = {
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
  dateOfBirth: [notFutureDate("Ngày sinh phải là một ngày trong quá khứ")],
  nationalCardProvidedDate: [
    notFutureDate("Ngày cấp phải là một ngày trong quá khứ"),
  ],
};

export const departmentRequireMessage =
  "Nhân viên bắt buộc phải thuộc về một phòng ban";
