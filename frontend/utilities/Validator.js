import * as yup from "yup";

const RowStatus = {
  ACTIVE: "1",
  INACTIVE: "0",
};

const MOBILE_NUMBER_REGEX = new RegExp("^(?:\\+88|88)?(01[3-9]\\d{8})$");

export default class Validator {
  static string(fieldName, min = 2, max = 255) {
    return yup
      .string()
      .trim()
      .min(min, `${fieldName} must be at least ${min} characters`)
      .max(max, `${fieldName} cannot exceed ${max} characters`)
      .required(`${fieldName} is required`);
  }

  static string_optional(fieldName, max = 255) {
    return yup
      .string()
      .trim()
      .max(max, `${fieldName} cannot exceed ${max} characters`)
      .optional()
      .nullable();
  }

  static text(fieldName, max = 5000) {
    return yup
      .string()
      .required(`${fieldName} is required`)
      .max(max, `${fieldName} cannot exceed ${max} characters`);
  }

  static text_optional(fieldName, max = 5000) {
    return yup
      .string()
      .max(max, `${fieldName} cannot exceed ${max} characters`)
      .optional()
      .nullable();
  }

  static number(fieldName, min = 1) {
    return yup
      .number()
      .required(`${fieldName} is required`)
      .min(min, `${fieldName} must be at least ${min}`);
  }

  static number_optional(fieldName, min = 1) {
    return yup
      .number()
      .min(min, `${fieldName} must be at least ${min}`)
      .optional()
      .nullable();
  }

  static phone(fieldName = "Phone number") {
    return yup
      .string()
      .trim()
      .max(30, `${fieldName} cannot exceed 30 characters`)
      .matches(MOBILE_NUMBER_REGEX, `${fieldName} must be a valid format`)
      .required(`${fieldName} is required`);
  }

  static phone_optional(fieldName = "Phone number") {
    return yup
      .string()
      .trim()
      .max(20, `${fieldName} cannot exceed 20 characters`)
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .optional()
      .matches(MOBILE_NUMBER_REGEX, `${fieldName} must be a valid format`);
  }

  static email(fieldName = "Email") {
    return yup
      .string()
      .trim()
      .max(255, `${fieldName} cannot exceed 255 characters`)
      .email(`Please enter a valid ${fieldName}`)
      .required(`${fieldName} is required`);
  }

  static email_optional(fieldName = "Email") {
    return yup
      .string()
      .trim()
      .max(255, `${fieldName} cannot exceed 255 characters`)
      .transform((value) => (value === "" ? null : value))
      .email(`Please enter a valid ${fieldName}`)
      .optional()
      .nullable();
  }

  static date(fieldName = "Date") {
    return yup.date().required(`${fieldName} is required`);
  }

  static date_optional(fieldName = "Date") {
    return yup.date().optional().nullable();
  }

  static row_status(fieldName = "Status") {
    return yup
      .string()
      .trim()
      .oneOf(
        [RowStatus.INACTIVE, RowStatus.ACTIVE],
        `${fieldName} must be either Active or Inactive`,
      )
      .required(`${fieldName} is required`);
  }

  static row_status_optional(fieldName = "Status") {
    return yup
      .string()
      .trim()
      .oneOf(
        [RowStatus.INACTIVE, RowStatus.ACTIVE],
        `${fieldName} must be either Active or Inactive`,
      )
      .optional()
      .nullable();
  }

  static password(fieldName = "Password") {
    return yup
      .string()
      .matches(
        /^(?=.*[a-z])/,
        `${fieldName} must contain at least one lowercase letter`,
      )
      .matches(
        /^(?=.*[A-Z])/,
        `${fieldName} must contain at least one uppercase letter`,
      )
      .matches(/^(?=.*\d)/, `${fieldName} must contain at least one number`)
      .matches(
        /^(?=.*[@$!%*?&])/,
        `${fieldName} must contain at least one special character`,
      )
      .min(8, `${fieldName} must be at least 8 characters long`)
      .required(`${fieldName} is required`);
  }
}
