const yup = require("yup");

const userSchema = yup.object({
  fullName: yup.string()
    .required('Поле должно быть заполнено'),
  email: yup.string()
    .email().required('Неверный формат email'),
  password: yup.string()
    .required('Ошибка в password')
    .min(6),
  Dob: yup.date().required('Date of birth'),
});

export default userSchema;