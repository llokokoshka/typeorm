const yup = require("yup");

const userSchema = yup.object({
  body: yup.object({
    fullName: yup.string()
      .required('Введите ваше имя!'),
    email: yup.string().nullable().email().required('Введите email!'),
    password: yup.string()
      .required('Введите пароль!')
      .min(6, 'Минимальная длина пароля - 6 символов!'),
    Dob: yup.date().nullable().typeError("please enter a valid date").required('Введите дату рождения!').min(new Date(1900, 0, 1)),
  }),
  // params: yup.object({
  //   id: yup.number().required(),
  // }),
});

export default userSchema;