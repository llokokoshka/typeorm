import * as yup from "yup";

const updateUserSchema = yup.object({
  body: yup.object({
    fullName: yup.string()
    .optional(),
    password: yup.string()
      .optional()
      .min(6, 'Минимальная длина пароля - 6 символов!'),
    Dob: yup.date()
      .optional()
      .typeError("Неверный формат даты!")
  }),
});

export default updateUserSchema;